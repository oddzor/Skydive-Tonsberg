export interface SanityFAQ {
  _id: string
  _type: 'faq'
  page: 'home' | 'tandem' | 'kurs' | 'forHoppere'
  order: number
  questionNo: string
  questionEn: string
  answerNo: string
  answerEn: string
}

export interface SanityTandemPricing {
  _id: string
  _type: 'tandemPricing'
  weekday: number
  weekend: number
  video: number
  videoPhotos: number
  fullPackage: number
}

export interface SanityKursPricing {
  _id: string
  _type: 'kursPricing'
  affCourse: number
}

export interface SanityForHopperePricing {
  _id: string
  _type: 'forHopperePricing'
  jumps: {
    normal: number
    deal: number
    dealDeposit: number
    bigDeal: number
    bigDealDeposit: number
    highAltitude: number
  }
  registration: {
    annual: number
    annualVeteran: number
    day: number
    weekend: number
    week: number
  }
  equipment: {
    rentalRig: number
    studentRig: number
    altimeter: number
    packing: number
  }
  courses: {
    affCourse: number
    rejump13: number
    rejump47: number
    level8: number
    checkoutJump: number
  }
  tandemPrices: {
    weekday: number
    weekend: number
    video: number
    videoPhotos: number
    fullPackage: number
  }
  misc: {
    tofskMembership: number
    burbleWithdrawal: number
    recruiterReward: string
    familyDiscount: number
  }
  bunkhouse: {
    threeMan: number
    doubleSingle: number
    doubleTwo: number
    bedding: number
    rvPower: number
    rvPowerWeek: number
    tentNoPower: number
  }
}

export interface SanityGeneralContent {
  _id: string
  _type: 'generalContent'
  bookingUrl?: string
  shopUrl?: string
  jumpCalendarUrl?: string
}

export interface SanityLandingPage {
  _id: string
  _type: 'landingPage'
  introImages?: {
    aboutGrid1?: string | null
    aboutGrid1AltNo?: string | null
    aboutGrid1AltEn?: string | null
    aboutGrid2?: string | null
    aboutGrid2AltNo?: string | null
    aboutGrid2AltEn?: string | null
    aboutGrid3?: string | null
    aboutGrid3AltNo?: string | null
    aboutGrid3AltEn?: string | null
    aboutGrid4?: string | null
    aboutGrid4AltNo?: string | null
    aboutGrid4AltEn?: string | null
  }
  introContent?: {
    aboutDescription1No?: string
    aboutDescription1En?: string
    aboutDescription2No?: string
    aboutDescription2En?: string
    statsMembersCount?: string
    statsJumpsCount?: string
  }
  servicesContent?: {
    tandemTitleNo?: string
    tandemTitleEn?: string
    tandemDescNo?: string
    tandemDescEn?: string
    affTitleNo?: string
    affTitleEn?: string
    affDescNo?: string
    affDescEn?: string
    experiencedTitleNo?: string
    experiencedTitleEn?: string
    experiencedDescNo?: string
    experiencedDescEn?: string
  }
  serviceImages?: {
    serviceTandem?: string | null
    serviceTandemAltNo?: string | null
    serviceTandemAltEn?: string | null
    serviceAff?: string | null
    serviceAffAltNo?: string | null
    serviceAffAltEn?: string | null
    serviceExperienced?: string | null
    serviceExperiencedAltNo?: string | null
    serviceExperiencedAltEn?: string | null
  }
  video?: {
    heroVideoDesktop?: string
    heroVideoMobile?: string
    heroPoster?: string
  }
}

export interface BilingualItem {
  no: string
  en: string
}

export interface CourseModule {
  titleNo: string
  titleEn: string
  descNo: string
  descEn: string
  duration: string
}

export interface SanityCourseInfo {
  _id: string
  _type: 'courseInfo'
  videoUrl: string
  modules: {
    groundSchool: CourseModule
    windTunnel: CourseModule
    level13: CourseModule
    level47: CourseModule
  }
  included: BilingualItem[]
  requirements: BilingualItem[]
  progressionLevels?: Array<{
    levelNumber: number
    titleNo: string
    titleEn: string
    goalNo: string
    goalEn: string
    descNo?: string
    descEn?: string
    requirements?: BilingualItem[]
    nextSteps?: BilingualItem[]
  }>
  heroCard?: {
    titleNo?: string
    titleEn?: string
    infoItems?: BilingualItem[]
    closingTextNo?: string
    closingTextEn?: string
  }
  pricingIncluded?: BilingualItem[]
  aLicenseProgressionItems?: Array<{
    titleNo: string
    titleEn: string
    descriptionNo: string
    descriptionEn: string
  }>
  aLicenseTempoDescNo?: string
  aLicenseTempoDescEn?: string
  aLicenseBeforeItems?: Array<{
    titleNo: string
    titleEn: string
    descriptionNo: string
    descriptionEn: string
  }>
  aLicenseCongratsDescNo?: string
  aLicenseCongratsDescEn?: string
  aLicenseTotalJumpsNo?: string
  aLicenseTotalJumpsEn?: string
  paymentBookingDescNo?: string
  paymentBookingDescEn?: string
  paymentStartDescNo?: string
  paymentStartDescEn?: string
  paymentVippsDescNo?: string
  paymentVippsDescEn?: string
  paymentRejumpDesc1No?: string
  paymentRejumpDesc1En?: string
  paymentRejumpDesc2No?: string
  paymentRejumpDesc2En?: string
  paymentMembershipDescNo?: string
  paymentMembershipDescEn?: string
  paymentCancellationDescNo?: string
  paymentCancellationDescEn?: string
  declarationTextNo?: string
  declarationTextEn?: string
  supportFacebookNo?: string
  supportFacebookEn?: string
  supportMentorNo?: string
  supportMentorEn?: string
  images: {
    classroom: string | null
    classroomAltNo?: string | null
    classroomAltEn?: string | null
    studentInAction: string | null
    studentInActionAltNo?: string | null
    studentInActionAltEn?: string | null
    soloStudent: string | null
    soloStudentAltNo?: string | null
    soloStudentAltEn?: string | null
    packingCourse?: string | null
    packingCourseAltNo?: string | null
    packingCourseAltEn?: string | null
    licenseCelebration?: string | null
    licenseCelebrationAltNo?: string | null
    licenseCelebrationAltEn?: string | null
    groupPhoto1: string | null
    groupPhoto1AltNo?: string | null
    groupPhoto1AltEn?: string | null
    groupPhoto2: string | null
    groupPhoto2AltNo?: string | null
    groupPhoto2AltEn?: string | null
    groupPhoto3: string | null
    groupPhoto3AltNo?: string | null
    groupPhoto3AltEn?: string | null
    [key: string]: string | null | undefined
  }
}

export interface SanityTandemInfo {
  _id: string
  _type: 'tandemInfo'
  videoUrl: string
  requirements: BilingualItem[]
  pricingIncluded?: BilingualItem[]
  highlights?: Array<{
    titleNo: string
    titleEn: string
    descriptionNo: string
    descriptionEn: string
  }>
  jumpDaySteps?: Array<{
    titleNo: string
    titleEn: string
    descriptionNo: string
    descriptionEn: string
  }>
  heroCard?: {
    titleNo?: string
    titleEn?: string
    infoItems?: BilingualItem[]
    closingTextNo?: string
    closingTextEn?: string
  }
  images: {
    galleryWide1: string | null
    galleryWide1AltNo?: string | null
    galleryWide1AltEn?: string | null
    galleryRect1: string | null
    galleryRect1AltNo?: string | null
    galleryRect1AltEn?: string | null
    galleryRect2: string | null
    galleryRect2AltNo?: string | null
    galleryRect2AltEn?: string | null
    gallerySquare1: string | null
    gallerySquare1AltNo?: string | null
    gallerySquare1AltEn?: string | null
    gallerySquare2: string | null
    gallerySquare2AltNo?: string | null
    gallerySquare2AltEn?: string | null
    gallerySquare3: string | null
    gallerySquare3AltNo?: string | null
    gallerySquare3AltEn?: string | null
  }
}

export interface SanityForHoppereInfo {
  _id: string
  _type: 'forHoppereInfo'
  videoUrl?: string
  heroDescriptionNo?: string
  heroDescriptionEn?: string
  heroSubDescriptionNo?: string
  heroSubDescriptionEn?: string
  seasonStartNo?: string
  seasonStartEn?: string
  seasonEndNo?: string
  seasonEndEn?: string
  openDaysNo?: string
  openDaysEn?: string
  renewalDescriptionNo?: string
  renewalDescriptionEn?: string
  bunkhouseDescriptionNo?: string
  bunkhouseDescriptionEn?: string
  bunkhouseRules?: BilingualItem[]
  burbleMeDescriptionNo?: string
  burbleMeDescriptionEn?: string
  burbleMePersonalDetailsDescNo?: string
  burbleMePersonalDetailsDescEn?: string
  burbleMeProfileNoteNo?: string
  burbleMeProfileNoteEn?: string
  burbleMeCheckInDropzoneDescNo?: string
  burbleMeCheckInDropzoneDescEn?: string
  burbleMeCheckInFormationDescNo?: string
  burbleMeCheckInFormationDescEn?: string
  burbleMeCheckInRules?: BilingualItem[]
  burbleMeLoadTimeDescNo?: string
  burbleMeLoadTimeDescEn?: string
  burbleMeOutlandingDescNo?: string
  burbleMeOutlandingDescEn?: string
  burbleMeLocationDescNo?: string
  burbleMeLocationDescEn?: string
  exitOrder?: BilingualItem[]
  boardingRules?: BilingualItem[]
  inAircraftRules?: BilingualItem[]
  landingPatternRules?: BilingualItem[]
  outlandingRules?: BilingualItem[]
  rentalDescriptionNo?: string
  rentalDescriptionEn?: string
  rentalAvailableNo?: string
  rentalAvailableEn?: string
  rentalFeatures?: BilingualItem[]
  rentalRequirements?: BilingualItem[]
  rentalContactTextNo?: string
  rentalContactTextEn?: string
  insuranceNorwegianTextNo?: string
  insuranceNorwegianTextEn?: string
  insuranceForeignIntroNo?: string
  insuranceForeignIntroEn?: string
  insuranceForeignBuyNo?: string
  insuranceForeignBuyEn?: string
  insuranceForeignWarningNo?: string
  insuranceForeignWarningEn?: string
  reportingIntroNo?: string
  reportingIntroEn?: string
  reportingPolicyNo?: string
  reportingPolicyEn?: string
  reportingSystemDescNo?: string
  reportingSystemDescEn?: string
  reportingSystemPathNo?: string
  reportingSystemPathEn?: string
  reportingGroupNo?: string
  reportingGroupEn?: string
  aircraftIntroNo?: string
  aircraftIntroEn?: string
  aircraftHistoryNo?: string
  aircraftHistoryEn?: string
  aircraftRenovationNo?: string
  aircraftRenovationEn?: string
}
