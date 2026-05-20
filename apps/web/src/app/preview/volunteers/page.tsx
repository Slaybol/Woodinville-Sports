import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { Badge } from '@/components/ui/badge'
import { getVolunteerCenterResult } from '@/lib/data/volunteers'

export default async function VolunteerPreviewPage() {
  const volunteerCenter = await getVolunteerCenterResult()

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-lg font-bold text-white">
              W
            </div>
            <div>
              <p className="text-base font-bold leading-5">Gridiron Connect</p>
              <p className="text-xs text-white/75">Volunteer preview</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Badge className="bg-white/15 text-white">No sign-in required</Badge>
            <Badge className={volunteerCenter.source === 'supabase' ? 'bg-falcon-100 text-falcon-900' : 'bg-gold-100 text-amber-950'}>
              {volunteerCenter.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
            </Badge>
          </div>
        </div>
      </header>

      {volunteerCenter.reason && volunteerCenter.source === 'demo' && (
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
            Preview is showing demo data. Reason: {volunteerCenter.reason}
          </div>
        </div>
      )}

      <VolunteerContent model={volunteerCenter.model} publishedSection={volunteerCenter.publishedSection} preview />
    </div>
  )
}
