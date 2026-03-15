import { getFromSnapshot } from '@/sanity/snapshot'

export async function GET() {
  const updatedAt = getFromSnapshot<string>('_updatedAt')
  const tandemPricing = getFromSnapshot<Record<string, unknown>>('tandemPricing')
  const faqsHome = getFromSnapshot<unknown[]>('faqs.home')
  const faqsAll = getFromSnapshot<unknown[]>('faqs.all')

  const status = {
    snapshotUpdatedAt: updatedAt ?? 'NOT POPULATED — run npm run sanity:snapshot',
    hasData: {
      tandemPricing: !!tandemPricing,
      kursPricing: !!getFromSnapshot('kursPricing'),
      forHopperePricing: !!getFromSnapshot('forHopperePricing'),
      courseInfo: !!getFromSnapshot('courseInfo'),
      tandemInfo: !!getFromSnapshot('tandemInfo'),
      forHoppereInfo: !!getFromSnapshot('forHoppereInfo'),
      landingPage: !!getFromSnapshot('landingPage'),
      generalContent: !!getFromSnapshot('generalContent'),
      faqCounts: {
        home: faqsHome?.length ?? 0,
        all: faqsAll?.length ?? 0,
      },
    },
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'NOT SET',
    sanityTokenPresent: !!process.env.SANITY_API_READ_TOKEN,
  }

  return Response.json(status)
}
