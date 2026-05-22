import { redirect } from 'next/navigation'
import { Bell, CheckCircle2, Phone, Shield, User, Users } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFamilyProfileData } from '@/lib/data/profile'
import { saveFamilyProfile, saveNotificationSettings } from './actions'

function statusBanner(status?: string, message?: string) {
  if (status === 'saved') return 'Family profile saved.'
  if (status === 'notifications_saved') return 'Notification preferences updated.'
  if (status === 'validation_error') return 'Please complete the required family setup fields.'
  if (status === 'save_failed') return message || 'We could not save those changes.'
  if (status === 'setup') return 'Finish your family setup so action tracking and volunteer signups use your real household context.'
  return null
}

export default async function FamilyProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; message?: string; setup?: string }>
}) {
  const params = (await searchParams) || {}
  const profileData = await getFamilyProfileData()

  if (!profileData) {
    redirect('/auth')
  }

  const bannerText = statusBanner(params.status || (params.setup ? 'setup' : undefined), params.message)
  const primaryGuardian = profileData.guardians.find((guardian) => guardian.is_primary)
  const leadPlayer = profileData.players[0]
  const familyIsSaved = profileData.hasFamilyContext
  const setupLabel = profileData.setupComplete
    ? 'Family setup complete'
    : familyIsSaved
      ? 'Family saved, add player'
      : 'Finish family setup'
  const savedBannerText =
    params.status === 'saved'
      ? profileData.setupComplete
        ? 'Family profile saved.'
        : 'Family profile saved. Add your player details next to complete setup.'
      : bannerText
  const checklistItems = [
    {
      label: 'Family created',
      complete: Boolean(profileData.family),
      detail: profileData.family ? profileData.family.name : 'Create your family record',
    },
    {
      label: 'Guardian contact',
      complete: Boolean(profileData.profile.phone),
      detail: profileData.profile.phone || 'Add a phone number for urgent updates',
    },
    {
      label: 'Player linked',
      complete: profileData.players.length > 0,
      detail: profileData.players.length > 0 ? `${profileData.players.length} player linked` : 'Add your player and team',
    },
    {
      label: 'Notifications ready',
      complete: Boolean(profileData.preferences),
      detail: 'Review alert categories below',
    },
  ]

  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: setupLabel, tone: profileData.setupComplete || familyIsSaved ? 'live' : 'fallback' }}
      banner={savedBannerText ? { text: savedBannerText, tone: 'warning' } : null}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={profileData.setupComplete ? 'success' : 'warning'}>
                {setupLabel}
              </Badge>
              <Badge variant="outline">{profileData.players.length} linked player{profileData.players.length === 1 ? '' : 's'}</Badge>
            </div>
            <p className="brand-kicker">Family Profile</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">
              {profileData.family?.name || 'Set up your family'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
              Keep your household, player, and notification details current so Weekly Huddle updates and volunteer tracking stay accurate.
            </p>
          </div>

          <form action={saveFamilyProfile} className="space-y-6">
            <input type="hidden" name="family_id" value={profileData.family?.id || ''} />
            <input type="hidden" name="player_id" value={leadPlayer?.id || ''} />

            <Card>
              <CardHeader>
                <CardTitle>Family setup</CardTitle>
                <p className="text-sm text-ink-600">This becomes the household context used by Actions, Calendar targeting, and volunteer signups.</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Your full name</span>
                  <input
                    name="full_name"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={profileData.profile.full_name}
                    required
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Phone number</span>
                  <input
                    name="phone"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={profileData.profile.phone || ''}
                    placeholder="(425) 555-0100"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Family name</span>
                  <input
                    name="family_name"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={profileData.family?.name || ''}
                    placeholder="Sabol family"
                    required
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Notes</span>
                  <input
                    name="family_notes"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={profileData.family?.notes || ''}
                    placeholder="Anything admins should know"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Player name</span>
                  <input
                    name="player_name"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={leadPlayer?.full_name || ''}
                    placeholder="Player full name"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Team</span>
                  <select
                    name="team_id"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={leadPlayer?.team_id || ''}
                  >
                    <option value="">Select team</option>
                    {profileData.teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.season})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Graduation year</span>
                  <input
                    name="graduation_year"
                    type="number"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={leadPlayer?.graduation_year || ''}
                    placeholder="2027"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Jersey number</span>
                  <input
                    name="jersey_number"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={leadPlayer?.jersey_number || ''}
                    placeholder="44"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-bold text-ink-700">Position</span>
                  <input
                    name="position"
                    className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                    defaultValue={leadPlayer?.position || ''}
                    placeholder="WR / DB"
                  />
                </label>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">Save family profile</Button>
            </div>
          </form>

          <Card>
            <CardHeader>
              <CardTitle>Linked contacts and players</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-ink-200 p-4">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <User size={16} />
                  {primaryGuardian?.full_name || profileData.profile.full_name}
                  <Badge variant="success">Primary guardian</Badge>
                </div>
                <p className="text-sm text-ink-600">{profileData.profile.email}</p>
                <p className="mt-1 text-sm text-ink-600">{primaryGuardian?.phone || profileData.profile.phone || 'Phone not added yet'}</p>
              </div>

              {profileData.players.length > 0 ? (
                profileData.players.map((player) => (
                  <div key={player.id} className="rounded-lg border border-ink-200 p-4">
                    <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                      <Users size={16} />
                      {player.full_name}
                      {player.team && <Badge variant="outline">{player.team.name}</Badge>}
                    </div>
                    <p className="text-sm text-ink-600">
                      {player.graduation_year ? `Class of ${player.graduation_year}` : 'Graduation year not set'}
                      {player.position ? ` | ${player.position}` : ''}
                      {player.jersey_number ? ` | #${player.jersey_number}` : ''}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                  Add your player above to connect your household to the right team and schedule.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setup checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklistItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-lg border border-ink-200 p-3">
                  <CheckCircle2 size={18} className={item.complete ? 'mt-0.5 text-falcon-700' : 'mt-0.5 text-ink-300'} />
                  <div>
                    <p className="font-bold text-ink-950">{item.label}</p>
                    <p className="mt-1 text-sm leading-5 text-ink-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <form action={saveNotificationSettings}>
            <Card>
              <CardHeader>
                <CardTitle>Notification preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: 'urgent_alerts', label: 'Urgent alerts' },
                  { key: 'huddle_published', label: 'Weekly Huddle published' },
                  { key: 'action_due_soon', label: 'Action item due soon' },
                  { key: 'event_updates', label: 'Event updates' },
                  { key: 'volunteer_reminders', label: 'Volunteer reminders' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 p-3">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-falcon-700" />
                      <span className="text-sm font-bold text-ink-950">{item.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      name={item.key}
                      defaultChecked={Boolean(profileData.preferences?.[item.key as keyof typeof profileData.preferences])}
                      className="h-4 w-4 accent-falcon-700"
                    />
                  </label>
                ))}
                <Button type="submit" className="w-full">Save notification settings</Button>
              </CardContent>
            </Card>
          </form>

          <Card>
            <CardHeader>
              <CardTitle>Family progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-ink-600">
              <div className="rounded-lg bg-falcon-50 p-3">
                <p className="font-bold text-falcon-950">
                  {profileData.progress.action_items_complete} of {profileData.progress.action_items_total} action items complete
                </p>
              </div>
              <div className="rounded-lg bg-gold-100 p-3 text-amber-950">
                <p className="font-bold">
                  {profileData.progress.volunteer_hours_complete} of {profileData.progress.volunteer_hours_goal} volunteer hours credited
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-statusRed-100 p-3">
                <div className="mb-1 flex items-center gap-2 font-bold text-statusRed-600">
                  <Shield size={16} />
                  Team-related urgent matters
                </div>
                <p className="text-sm leading-6 text-red-900">
                  For life-threatening emergencies, call 911 first. Keep your guardian phone current so team leads can reach you quickly.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-ink-600">
                <Phone size={15} />
                {primaryGuardian?.phone || profileData.profile.phone || 'Phone number still missing'}
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </ParentShell>
  )
}
