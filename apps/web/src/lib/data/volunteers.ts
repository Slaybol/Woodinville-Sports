import type {
  ClaimedVolunteerShift,
  Family,
  VolunteerCenterModel,
  VolunteerSignup,
  VolunteerSlot,
  VolunteerSlotWithSignupSummary,
} from '@gridiron/shared'
import { volunteerCenterDemo } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'

export interface VolunteerCenterDataResult {
  model: VolunteerCenterModel
  source: 'supabase' | 'demo'
  reason?: string
}

function toDateLabel(slot: VolunteerSlot) {
  return slot.display_date || 'Date TBD'
}

export async function getVolunteerCenterResult(): Promise<VolunteerCenterDataResult> {
  try {
    const supabase = await createClient()

    const [
      { data: slots, error: slotsError },
      { data: family, error: familyError },
    ] = await Promise.all([
      supabase
        .from('volunteer_slots')
        .select('*')
        .order('starts_at', { ascending: true, nullsFirst: false }),
      supabase
        .from('families')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle(),
    ])

    if (slotsError || !slots || slots.length === 0) {
      return {
        model: volunteerCenterDemo,
        source: 'demo',
        reason: slotsError?.message || 'No volunteer slots were readable.',
      }
    }

    if (familyError || !family) {
      return {
        model: volunteerCenterDemo,
        source: 'demo',
        reason: familyError?.message || 'No readable family row was available.',
      }
    }

    const slotIds = slots.map((slot) => slot.id)
    const { data: signups, error: signupsError } = await supabase
      .from('volunteer_signups')
      .select('*')
      .in('slot_id', slotIds)
      .eq('status', 'confirmed')

    if (signupsError) {
      return {
        model: volunteerCenterDemo,
        source: 'demo',
        reason: signupsError.message,
      }
    }

    const typedFamily = family as Family
    const typedSignups = (signups || []) as VolunteerSignup[]

    const slotsWithSummary: VolunteerSlotWithSignupSummary[] = (slots as VolunteerSlot[]).map((slot) => {
      const slotSignups = (signups || []).filter((signup) => signup.slot_id === slot.id)

      return {
        ...slot,
        slots_filled: slotSignups.length,
        signed_up_family_ids: slotSignups.map((signup) => signup.family_id),
      } as VolunteerSlotWithSignupSummary
    })

    const claimedShifts: ClaimedVolunteerShift[] = typedSignups
      .filter((signup) => signup.family_id === typedFamily.id && (signup.hours_credited || 0) > 0)
      .map((signup) => {
        const slot = (slots as VolunteerSlot[]).find((candidate) => candidate.id === signup.slot_id)

        return {
          id: signup.id,
          title: slot?.title || 'Volunteer shift',
          date_label: slot ? toDateLabel(slot) : 'Date TBD',
          hours_credited: Number(signup.hours_credited || 0),
        }
      })

    const volunteerHoursComplete = claimedShifts.reduce((total, shift) => total + shift.hours_credited, 0)

    return {
      source: 'supabase',
      model: {
        slots: slotsWithSummary,
        claimed_shifts: claimedShifts.length > 0 ? claimedShifts : volunteerCenterDemo.claimed_shifts,
        volunteer_hours_complete:
          claimedShifts.length > 0 ? volunteerHoursComplete : volunteerCenterDemo.volunteer_hours_complete,
        volunteer_hours_goal: volunteerCenterDemo.volunteer_hours_goal,
      },
    }
  } catch {
    return {
      model: volunteerCenterDemo,
      source: 'demo',
      reason: 'Supabase query failed before volunteer data could be loaded.',
    }
  }
}

export async function getVolunteerCenter(): Promise<VolunteerCenterModel> {
  const result = await getVolunteerCenterResult()
  return result.model
}
