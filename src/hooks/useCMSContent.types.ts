export interface FAQ {
  question: string;
  answer: string;
}

export interface CourseModule {
  title: string;
  description: string;
  duration: string;
}

export interface ProgressionLevel {
  levelNumber: number;
  title: string;
  goal: string;
  desc?: string;
  requirements?: string[];
  nextSteps?: string[];
}

export interface CMSContent {
  home?: {
    images?: {
      aboutGrid1?: string | null;
      aboutGrid1AltNo?: string | null;
      aboutGrid1AltEn?: string | null;
      aboutGrid2?: string | null;
      aboutGrid2AltNo?: string | null;
      aboutGrid2AltEn?: string | null;
      aboutGrid3?: string | null;
      aboutGrid3AltNo?: string | null;
      aboutGrid3AltEn?: string | null;
      aboutGrid4?: string | null;
      aboutGrid4AltNo?: string | null;
      aboutGrid4AltEn?: string | null;
      serviceTandem?: string | null;
      serviceTandemAltNo?: string | null;
      serviceTandemAltEn?: string | null;
      serviceAff?: string | null;
      serviceAffAltNo?: string | null;
      serviceAffAltEn?: string | null;
      serviceExperienced?: string | null;
      serviceExperiencedAltNo?: string | null;
      serviceExperiencedAltEn?: string | null;
    };
    video?: {
      heroVideoDesktop?: string;
      heroVideoMobile?: string;
      heroPoster?: string;
    };
    aboutDescription1?: string;
    aboutDescription2?: string;
    statsMembersCount?: string;
    statsJumpsCount?: string;
    serviceCards?: {
      tandemTitle?: string;
      tandemDesc?: string;
      affTitle?: string;
      affDesc?: string;
      experiencedTitle?: string;
      experiencedDesc?: string;
    };
  } | null;
  faqs?: {
    home?: FAQ[];
    tandem?: FAQ[];
    kurs?: FAQ[];
    forHoppere?: FAQ[];
  };
  course: {
    modules: {
      groundSchool: CourseModule;
      windTunnel: CourseModule;
      level13: CourseModule;
      level47: CourseModule;
    };
    included: string[];
    requirements: string[];
    progressionLevels?: ProgressionLevel[];
    videoUrl?: string;
    heroCard?: {
      title?: string;
      infoItems?: string[];
      closingText?: string;
    };
    pricingIncluded?: string[];
    aLicense?: {
      progressionItems?: Array<{ title: string; description: string }>;
      tempoDesc?: string;
      beforeItems?: Array<{ title: string; description: string }>;
      congratsDesc?: string;
      totalJumps?: string;
    };
    payment?: {
      bookingDesc?: string;
      startDesc?: string;
      vippsDesc?: string;
      rejumpDesc1?: string;
      rejumpDesc2?: string;
      membershipDesc?: string;
      cancellationDesc?: string;
    };
    declaration?: string;
    support?: {
      facebook?: string;
      mentor?: string;
    };
    images?: {
      classroom?: string | null;
      classroomAltNo?: string | null;
      classroomAltEn?: string | null;
      studentInAction?: string | null;
      studentInActionAltNo?: string | null;
      studentInActionAltEn?: string | null;
      soloStudent?: string | null;
      soloStudentAltNo?: string | null;
      soloStudentAltEn?: string | null;
      packingCourse?: string | null;
      packingCourseAltNo?: string | null;
      packingCourseAltEn?: string | null;
      licenseCelebration?: string | null;
      licenseCelebrationAltNo?: string | null;
      licenseCelebrationAltEn?: string | null;
      groupPhoto1?: string | null;
      groupPhoto1AltNo?: string | null;
      groupPhoto1AltEn?: string | null;
      groupPhoto2?: string | null;
      groupPhoto2AltNo?: string | null;
      groupPhoto2AltEn?: string | null;
      groupPhoto3?: string | null;
      groupPhoto3AltNo?: string | null;
      groupPhoto3AltEn?: string | null;
      [key: string]: string | null | undefined;
    } | null;
  } | null;
  tandem: {
    pricingIncluded?: string[];
    heroCard?: {
      title?: string;
      infoItems?: string[];
      closingText?: string;
    };
    requirements: string[];
    highlights?: Array<{ title: string; description: string }>;
    jumpDaySteps?: Array<{ title: string; description: string }>;
    videoUrl?: string;
    images?: {
      galleryWide1?: string | null;
      galleryWide1AltNo?: string | null;
      galleryWide1AltEn?: string | null;
      galleryRect1?: string | null;
      galleryRect1AltNo?: string | null;
      galleryRect1AltEn?: string | null;
      galleryRect2?: string | null;
      galleryRect2AltNo?: string | null;
      galleryRect2AltEn?: string | null;
      gallerySquare1?: string | null;
      gallerySquare1AltNo?: string | null;
      gallerySquare1AltEn?: string | null;
      gallerySquare2?: string | null;
      gallerySquare2AltNo?: string | null;
      gallerySquare2AltEn?: string | null;
      gallerySquare3?: string | null;
      gallerySquare3AltNo?: string | null;
      gallerySquare3AltEn?: string | null;
    } | null;
  } | null;
  pricing: {
    tandem: {
      weekday: number;
      weekend: number;
      video: number;
      videoPhotos: number;
      fullPackage: number;
    } | null;
    forHoppere: {
      jumps: {
        normal: number;
        deal: number;
        dealDeposit: number;
        bigDeal: number;
        bigDealDeposit: number;
        highAltitude: number;
      };
      registration: {
        annual: number;
        annualVeteran: number;
        day: number;
        weekend: number;
        week: number;
      };
      equipment: {
        rentalRig: number;
        studentRig: number;
        altimeter: number;
        packing: number;
      };
      courses: {
        affCourse: number;
        rejump13: number;
        rejump47: number;
        level8: number;
        checkoutJump: number;
      };
      misc: {
        tofskMembership: number;
        burbleWithdrawal: number;
        recruiterReward: string;
        familyDiscount: number;
      };
      bunkhouse: {
        threeMan: number;
        doubleSingle: number;
        doubleTwo: number;
        bedding: number;
        rvPower: number;
        rvPowerWeek: number;
        tentNoPower: number;
      };
    } | null;
  } | null;
}
