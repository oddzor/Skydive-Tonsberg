import { groq } from 'next-sanity'

export const TANDEM_PRICING_QUERY = groq`*[_type == "tandemPricing"][0]`
export const KURS_PRICING_QUERY = groq`*[_type == "kursPricing"][0]`
export const FOR_HOPPERE_PRICING_QUERY = groq`*[_type == "forHopperePricing"][0]`
export const PAGE_FAQS_QUERY = groq`*[_type == "faq" && page == $page] | order(order asc)`
export const ALL_FAQS_QUERY = groq`*[_type == "faq"] | order(page asc, order asc)`
export const COURSE_INFO_QUERY = groq`*[_type == "courseInfo"][0]{
  ...,
  "images": {
    "classroom": classroom.asset->url,
    "classroomAltNo": classroom.altNo,
    "classroomAltEn": classroom.altEn,
    "studentInAction": studentInAction.asset->url,
    "studentInActionAltNo": studentInAction.altNo,
    "studentInActionAltEn": studentInAction.altEn,
    "soloStudent": soloStudent.asset->url,
    "soloStudentAltNo": soloStudent.altNo,
    "soloStudentAltEn": soloStudent.altEn,
    "instructorCoaching": instructorCoaching.asset->url,
    "instructorCoachingAltNo": instructorCoaching.altNo,
    "instructorCoachingAltEn": instructorCoaching.altEn,
    "packingCourse": packingCourse.asset->url,
    "packingCourseAltNo": packingCourse.altNo,
    "packingCourseAltEn": packingCourse.altEn,
    "licenseCelebration": licenseCelebration.asset->url,
    "licenseCelebrationAltNo": licenseCelebration.altNo,
    "licenseCelebrationAltEn": licenseCelebration.altEn,
    "groupPhoto1": groupPhoto1.asset->url,
    "groupPhoto1AltNo": groupPhoto1.altNo,
    "groupPhoto1AltEn": groupPhoto1.altEn,
    "groupPhoto2": groupPhoto2.asset->url,
    "groupPhoto2AltNo": groupPhoto2.altNo,
    "groupPhoto2AltEn": groupPhoto2.altEn,
    "groupPhoto3": groupPhoto3.asset->url,
    "groupPhoto3AltNo": groupPhoto3.altNo,
    "groupPhoto3AltEn": groupPhoto3.altEn
  }
}`
export const TANDEM_INFO_QUERY = groq`*[_type == "tandemInfo"][0]{
  ...,
  "images": {
    "galleryWide1": galleryWide1.asset->url,
    "galleryWide1AltNo": galleryWide1.altNo,
    "galleryWide1AltEn": galleryWide1.altEn,
    "galleryRect1": galleryRect1.asset->url,
    "galleryRect1AltNo": galleryRect1.altNo,
    "galleryRect1AltEn": galleryRect1.altEn,
    "galleryRect2": galleryRect2.asset->url,
    "galleryRect2AltNo": galleryRect2.altNo,
    "galleryRect2AltEn": galleryRect2.altEn,
    "gallerySquare1": gallerySquare1.asset->url,
    "gallerySquare1AltNo": gallerySquare1.altNo,
    "gallerySquare1AltEn": gallerySquare1.altEn,
    "gallerySquare2": gallerySquare2.asset->url,
    "gallerySquare2AltNo": gallerySquare2.altNo,
    "gallerySquare2AltEn": gallerySquare2.altEn,
    "gallerySquare3": gallerySquare3.asset->url,
    "gallerySquare3AltNo": gallerySquare3.altNo,
    "gallerySquare3AltEn": gallerySquare3.altEn
  }
}`
export const GENERAL_CONTENT_QUERY = groq`*[_type == "generalContent"][0]`
export const LANDING_PAGE_QUERY = groq`*[_type == "landingPage"][0]{
  ...,
  "introImages": {
    "aboutGrid1": aboutGrid1.asset->url,
    "aboutGrid1AltNo": aboutGrid1.altNo,
    "aboutGrid1AltEn": aboutGrid1.altEn,
    "aboutGrid2": aboutGrid2.asset->url,
    "aboutGrid2AltNo": aboutGrid2.altNo,
    "aboutGrid2AltEn": aboutGrid2.altEn,
    "aboutGrid3": aboutGrid3.asset->url,
    "aboutGrid3AltNo": aboutGrid3.altNo,
    "aboutGrid3AltEn": aboutGrid3.altEn,
    "aboutGrid4": aboutGrid4.asset->url,
    "aboutGrid4AltNo": aboutGrid4.altNo,
    "aboutGrid4AltEn": aboutGrid4.altEn
  },
  "serviceImages": {
    "serviceTandem": serviceTandem.asset->url,
    "serviceTandemAltNo": serviceTandem.altNo,
    "serviceTandemAltEn": serviceTandem.altEn,
    "serviceAff": serviceAff.asset->url,
    "serviceAffAltNo": serviceAff.altNo,
    "serviceAffAltEn": serviceAff.altEn,
    "serviceExperienced": serviceExperienced.asset->url,
    "serviceExperiencedAltNo": serviceExperienced.altNo,
    "serviceExperiencedAltEn": serviceExperienced.altEn
  }
}`
export const FOR_HOPPERE_INFO_QUERY = groq`*[_type == "forHoppereInfo"][0]`
