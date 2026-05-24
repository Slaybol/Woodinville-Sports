import { notFound } from 'next/navigation'
import { ResourceHubPage } from '@/components/resources/resource-hub-page'
import { getSiteResourceHub, siteResourceHubs } from '@/lib/site-extension-data'

export function generateStaticParams() {
  return siteResourceHubs.map((hub) => ({ slug: hub.slug }))
}

export default async function ResourceHubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const hub = getSiteResourceHub(slug)

  if (!hub) {
    notFound()
  }

  return <ResourceHubPage hub={hub} />
}
