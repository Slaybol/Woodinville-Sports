export type ISODateString = string
export type ISODateTimeString = string
export type UUID = string

export type ProfileRole = 'parent' | 'player' | 'coach' | 'team_parent' | 'fgic_admin'
export type FamilyMemberRole = 'guardian' | 'player'
export type TeamLevel = 'varsity' | 'jv' | 'c_team' | 'all_program'
export type HuddleStatus = 'draft' | 'scheduled' | 'published' | 'archived'
export type HuddleSectionType =
  | 'playbook'
  | 'urgent'
  | 'actions'
  | 'calendar'
  | 'volunteer'
  | 'highlights'
  | 'links'
  | 'custom'
export type ActionStatus = 'not_started' | 'in_progress' | 'complete' | 'waived' | 'not_applicable'
export type ActionImportance = 'required' | 'optional' | 'family' | 'info'
export type CalendarEventType =
  | 'practice'
  | 'game'
  | 'meeting'
  | 'camp'
  | 'travel'
  | 'deadline'
  | 'fundraiser'
  | 'social'
  | 'other'
export type VolunteerCategory = 'game_day' | 'meals' | 'camp' | 'travel' | 'fundraising' | 'events' | 'other'
export type VolunteerSignupStatus = 'confirmed' | 'canceled' | 'waitlist'

export interface Profile {
  id: UUID
  email: string
  full_name: string
  role: ProfileRole
  phone?: string | null
  avatar_url?: string | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface Family {
  id: UUID
  name: string
  primary_contact_id?: UUID | null
  notes?: string | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface FamilyMember {
  id: UUID
  family_id: UUID
  profile_id?: UUID | null
  role: FamilyMemberRole
  display_name?: string | null
  is_primary: boolean
  created_at: ISODateTimeString
}

export interface Team {
  id: UUID
  name: string
  level: TeamLevel
  sport: string
  season: string
  school_name: string
  created_at: ISODateTimeString
}

export interface Player {
  id: UUID
  family_id?: UUID | null
  profile_id?: UUID | null
  team_id?: UUID | null
  full_name: string
  graduation_year?: number | null
  jersey_number?: string | null
  position?: string | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface TeamMember {
  id: UUID
  team_id: UUID
  profile_id?: UUID | null
  player_id?: UUID | null
  role: ProfileRole
  created_at: ISODateTimeString
}

export interface Huddle {
  id: UUID
  title: string
  date_range: string
  starts_on?: ISODateString | null
  ends_on?: ISODateString | null
  summary?: string | null
  status: HuddleStatus
  target_team_id?: UUID | null
  created_by?: UUID | null
  published_by?: UUID | null
  published_at?: ISODateTimeString | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface HuddleSection {
  id: UUID
  huddle_id: UUID
  section_type: HuddleSectionType
  title: string
  body?: string | null
  sort_order: number
  metadata: Record<string, unknown>
  created_at: ISODateTimeString
}

export interface ActionItem {
  id: UUID
  huddle_id?: UUID | null
  title: string
  description?: string | null
  importance: ActionImportance
  default_status: ActionStatus
  due_at?: ISODateTimeString | null
  due_label?: string | null
  audience_label: string
  target_team_id?: UUID | null
  external_url?: string | null
  created_by?: UUID | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface FamilyActionStatus {
  id: UUID
  family_id: UUID
  action_item_id: UUID
  status: ActionStatus
  completed_by?: UUID | null
  completed_at?: ISODateTimeString | null
  admin_note?: string | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface CalendarEvent {
  id: UUID
  title: string
  event_type: CalendarEventType
  team_id?: UUID | null
  audience_label: string
  starts_at?: ISODateTimeString | null
  ends_at?: ISODateTimeString | null
  display_date?: string | null
  display_time?: string | null
  location?: string | null
  address?: string | null
  arrival_time?: string | null
  bus_time?: string | null
  uniform_note?: string | null
  equipment_note?: string | null
  notes?: string | null
  external_url?: string | null
  is_canceled: boolean
  created_by?: UUID | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface VolunteerSlot {
  id: UUID
  title: string
  description?: string | null
  category: VolunteerCategory
  team_id?: UUID | null
  event_id?: UUID | null
  starts_at?: ISODateTimeString | null
  ends_at?: ISODateTimeString | null
  display_date?: string | null
  display_time?: string | null
  location?: string | null
  slots_needed: number
  hour_credit: number
  coordinator_profile_id?: UUID | null
  created_by?: UUID | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface VolunteerSignup {
  id: UUID
  slot_id: UUID
  family_id: UUID
  profile_id?: UUID | null
  status: VolunteerSignupStatus
  hours_credited?: number | null
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface DocumentResource {
  id: UUID
  title: string
  description?: string | null
  category: string
  file_url?: string | null
  external_url?: string | null
  target_team_id?: UUID | null
  uploaded_by?: UUID | null
  created_at: ISODateTimeString
}

export interface NotificationPreferences {
  id: UUID
  profile_id: UUID
  urgent_alerts: boolean
  huddle_published: boolean
  action_due_soon: boolean
  event_updates: boolean
  volunteer_reminders: boolean
  created_at: ISODateTimeString
  updated_at: ISODateTimeString
}

export interface InAppNotification {
  id: UUID
  profile_id?: UUID | null
  family_id?: UUID | null
  title: string
  body?: string | null
  href?: string | null
  read_at?: ISODateTimeString | null
  created_at: ISODateTimeString
}

export interface HuddleHomeModel {
  huddle: Huddle
  sections: HuddleSection[]
  urgent_actions: ActionItem[]
  due_soon_actions: ActionItem[]
  upcoming_events: CalendarEvent[]
  volunteer_needs: VolunteerSlot[]
  family_progress?: FamilyProgressSummary
}

export interface FamilyProgressSummary {
  action_items_complete: number
  action_items_total: number
  volunteer_hours_complete: number
  volunteer_hours_goal: number
}

export interface ActionCenterModel {
  family: Family
  items: Array<{
    action: ActionItem
    status: FamilyActionStatus
  }>
  progress: FamilyProgressSummary
}

export interface VolunteerSlotWithSignupSummary extends VolunteerSlot {
  slots_filled: number
  signed_up_family_ids: UUID[]
}

export interface ClaimedVolunteerShift {
  id: UUID
  title: string
  date_label: string
  hours_credited: number
}

export interface VolunteerCenterModel {
  slots: VolunteerSlotWithSignupSummary[]
  claimed_shifts: ClaimedVolunteerShift[]
  volunteer_hours_complete: number
  volunteer_hours_goal: number
}
