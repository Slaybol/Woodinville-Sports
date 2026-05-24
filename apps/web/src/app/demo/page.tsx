import { DemoPublishedHuddle } from '@/components/demo/demo-published-huddle'
import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { DemoShell } from '@/components/layout/demo-shell'
import { huddleHomeDemo } from '@/lib/demo-data'

export default function DemoHomePage() {
  return (
    <DemoShell activeNav="huddle">
      <DemoPublishedHuddle />
      <HuddleHomeContent model={huddleHomeDemo} preview routePrefix="/demo" />
    </DemoShell>
  )
}
