import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { Badge } from '@/components/ui/badge'
import { getCurrentHuddleHome } from '@/lib/data/huddles'

export default async function HuddlePreviewPage() {
  const huddleHome = await getCurrentHuddleHome()

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
              <p className="text-xs text-white/75">Preview mode</p>
            </div>
          </div>

          <Badge className="hidden bg-white/15 text-white md:inline-flex">No sign-in required</Badge>
        </div>
      </header>

      <HuddleHomeContent model={huddleHome} preview />
    </div>
  )
}
