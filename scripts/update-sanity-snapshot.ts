import { createClient } from 'next-sanity'
import { writeFileSync } from 'fs'
import { join } from 'path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_READ_TOKEN

if (!projectId || projectId === 'your-project-id') {
  console.warn('⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not set — skipping snapshot update')
  process.exit(0)
}
if (!token) {
  console.warn('⚠️  SANITY_API_READ_TOKEN not set — skipping snapshot update')
  process.exit(0)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })
const TANDEM_PRICING_QUERY = `*[_type == "tandemPricing"][0]`
const KURS_PRICING_QUERY = `*[_type == "kursPricing"][0]`
const FOR_HOPPERE_PRICING_QUERY = `*[_type == "forHopperePricing"][0]`
const PAGE_FAQS_QUERY = `*[_type == "faq" && page == $page] | order(order asc)`
const ALL_FAQS_QUERY = `*[_type == "faq"] | order(page asc, order asc)`
const GENERAL_CONTENT_QUERY = `*[_type == "generalContent"][0]`
const FOR_HOPPERE_INFO_QUERY = `*[_type == "forHoppereInfo"][0]`

const COURSE_INFO_QUERY = `*[_type == "courseInfo"][0]{
  ...,
  "images": {
    "classroom": classroom.asset->url,
    "classroomAltNo": classroom.altNo, "classroomAltEn": classroom.altEn,
    "studentInAction": studentInAction.asset->url,
    "studentInActionAltNo": studentInAction.altNo, "studentInActionAltEn": studentInAction.altEn,
    "soloStudent": soloStudent.asset->url,
    "soloStudentAltNo": soloStudent.altNo, "soloStudentAltEn": soloStudent.altEn,
    "packingCourse": packingCourse.asset->url,
    "packingCourseAltNo": packingCourse.altNo, "packingCourseAltEn": packingCourse.altEn,
    "licenseCelebration": licenseCelebration.asset->url,
    "licenseCelebrationAltNo": licenseCelebration.altNo, "licenseCelebrationAltEn": licenseCelebration.altEn,
    "groupPhoto1": groupPhoto1.asset->url,
    "groupPhoto1AltNo": groupPhoto1.altNo, "groupPhoto1AltEn": groupPhoto1.altEn,
    "groupPhoto2": groupPhoto2.asset->url,
    "groupPhoto2AltNo": groupPhoto2.altNo, "groupPhoto2AltEn": groupPhoto2.altEn,
    "groupPhoto3": groupPhoto3.asset->url,
    "groupPhoto3AltNo": groupPhoto3.altNo, "groupPhoto3AltEn": groupPhoto3.altEn
  }
}`

const TANDEM_INFO_QUERY = `*[_type == "tandemInfo"][0]{
  ...,
  "images": {
    "galleryWide1": galleryWide1.asset->url,
    "galleryWide1AltNo": galleryWide1.altNo, "galleryWide1AltEn": galleryWide1.altEn,
    "galleryRect1": galleryRect1.asset->url,
    "galleryRect1AltNo": galleryRect1.altNo, "galleryRect1AltEn": galleryRect1.altEn,
    "galleryRect2": galleryRect2.asset->url,
    "galleryRect2AltNo": galleryRect2.altNo, "galleryRect2AltEn": galleryRect2.altEn,
    "gallerySquare1": gallerySquare1.asset->url,
    "gallerySquare1AltNo": gallerySquare1.altNo, "gallerySquare1AltEn": gallerySquare1.altEn,
    "gallerySquare2": gallerySquare2.asset->url,
    "gallerySquare2AltNo": gallerySquare2.altNo, "gallerySquare2AltEn": gallerySquare2.altEn,
    "gallerySquare3": gallerySquare3.asset->url,
    "gallerySquare3AltNo": gallerySquare3.altNo, "gallerySquare3AltEn": gallerySquare3.altEn
  }
}`

const LANDING_PAGE_QUERY = `*[_type == "landingPage"][0]{
  ...,
  "introImages": {
    "aboutGrid1": aboutGrid1.asset->url,
    "aboutGrid1AltNo": aboutGrid1.altNo, "aboutGrid1AltEn": aboutGrid1.altEn,
    "aboutGrid2": aboutGrid2.asset->url,
    "aboutGrid2AltNo": aboutGrid2.altNo, "aboutGrid2AltEn": aboutGrid2.altEn,
    "aboutGrid3": aboutGrid3.asset->url,
    "aboutGrid3AltNo": aboutGrid3.altNo, "aboutGrid3AltEn": aboutGrid3.altEn,
    "aboutGrid4": aboutGrid4.asset->url,
    "aboutGrid4AltNo": aboutGrid4.altNo, "aboutGrid4AltEn": aboutGrid4.altEn
  },
  "serviceImages": {
    "serviceTandem": serviceTandem.asset->url,
    "serviceTandemAltNo": serviceTandem.altNo, "serviceTandemAltEn": serviceTandem.altEn,
    "serviceAff": serviceAff.asset->url,
    "serviceAffAltNo": serviceAff.altNo, "serviceAffAltEn": serviceAff.altEn,
    "serviceExperienced": serviceExperienced.asset->url,
    "serviceExperiencedAltNo": serviceExperienced.altNo, "serviceExperiencedAltEn": serviceExperienced.altEn
  }
}`

async function main() {
  console.log('📡 Fetching all Sanity content...')

  const [
    tandemPricing, kursPricing, forHopperePricing,
    generalContent, landingPage, courseInfo, tandemInfo, forHoppereInfo,
    faqsHome, faqsKurs, faqsTandem, faqsForHoppere, faqsAll,
  ] = await Promise.all([
    client.fetch(TANDEM_PRICING_QUERY),
    client.fetch(KURS_PRICING_QUERY),
    client.fetch(FOR_HOPPERE_PRICING_QUERY),
    client.fetch(GENERAL_CONTENT_QUERY),
    client.fetch(LANDING_PAGE_QUERY),
    client.fetch(COURSE_INFO_QUERY),
    client.fetch(TANDEM_INFO_QUERY),
    client.fetch(FOR_HOPPERE_INFO_QUERY),
    client.fetch(PAGE_FAQS_QUERY, { page: 'home' }),
    client.fetch(PAGE_FAQS_QUERY, { page: 'kurs' }),
    client.fetch(PAGE_FAQS_QUERY, { page: 'tandem' }),
    client.fetch(PAGE_FAQS_QUERY, { page: 'forHoppere' }),
    client.fetch(ALL_FAQS_QUERY),
  ])

  const snapshot = {
    _updatedAt: new Date().toISOString(),
    _note: 'Generated by: npm run sanity:snapshot. Commit this file after running.',
    tandemPricing,
    kursPricing,
    forHopperePricing,
    generalContent,
    landingPage,
    courseInfo,
    tandemInfo,
    forHoppereInfo,
    faqs: {
      home: faqsHome,
      kurs: faqsKurs,
      tandem: faqsTandem,
      forHoppere: faqsForHoppere,
      all: faqsAll,
    },
  }

  const outPath = join(process.cwd(), 'src/sanity/snapshot.json')
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + '\n')

  console.log(`✅ Snapshot saved to src/sanity/snapshot.json`)
  console.log(`   Updated at: ${snapshot._updatedAt}`)
  console.log(`   FAQs: home=${faqsHome?.length ?? 0}, kurs=${faqsKurs?.length ?? 0}, tandem=${faqsTandem?.length ?? 0}, forHoppere=${faqsForHoppere?.length ?? 0}, all=${faqsAll?.length ?? 0}`)
}

main().catch((err) => {
  console.warn('⚠️  Snapshot update failed (existing snapshot will be used as fallback):', err.message)
  process.exit(0)
})
