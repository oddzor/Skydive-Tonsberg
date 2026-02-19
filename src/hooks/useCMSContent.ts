import { useState, useEffect } from 'react';
interface FAQ {
  question: string;
  answer: string;
}
interface CourseModule {
  title: string;
  description: string;
  duration: string;
}
interface CMSPricing {
  tandem: {
    weekday: number;
    weekend: number;
    video: number;
    videoPhotos: number;
    fullPackage: number;
  };
  kurs: {
    affCourse: number;
  };
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
    tandemPrices: {
      weekday: number;
      weekend: number;
      video: number;
      videoPhotos: number;
      fullPackage: number;
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
  };
}
export interface CMSContent {
  faqs: {
    home: FAQ[];
    tandem: FAQ[];
    kurs: FAQ[];
    forHoppere: FAQ[];
  };
  home?: {
    images?: {
      aboutGrid1?: string;
      aboutGrid2?: string;
      aboutGrid3?: string;
      aboutGrid4?: string;
      serviceTandem?: string;
      serviceAff?: string;
      serviceExperienced?: string;
    };
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
    videoUrl?: string;
    images?: {
      classroom: string;
      studentInAction: string;
      soloStudent: string;
      instructorCoaching: string;
      packingCourse: string;
      licenseCelebration: string;
      groupPhoto1: string;
      groupPhoto2: string;
      groupPhoto3: string;
    };
  };
  tandem: {
    requirements: string[];
    videoUrl?: string;
    images?: {
      galleryWide1: string;
      galleryRect1: string;
      galleryRect2: string;
      gallerySquare1: string;
      gallerySquare2: string;
      gallerySquare3: string;
    };
  };
  pricing: CMSPricing;
}
export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms-content?t=${Date.now()}`);
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Failed to load CMS content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);
  return { content, loading };
};
