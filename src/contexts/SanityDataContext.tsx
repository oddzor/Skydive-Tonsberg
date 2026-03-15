'use client'

import { createContext, useContext } from 'react'
import type {
  SanityFAQ,
  SanityTandemPricing,
  SanityKursPricing,
  SanityForHopperePricing,
  SanityCourseInfo,
  SanityTandemInfo,
  SanityGeneralContent,
  SanityLandingPage,
  SanityForHoppereInfo,
} from '@/sanity/types'
import { useLanguage } from './LanguageContext'

export interface SanityData {
  faqs: SanityFAQ[]
  tandemPricing: SanityTandemPricing | null
  kursPricing: SanityKursPricing | null
  forHopperePricing: SanityForHopperePricing | null
  courseInfo: SanityCourseInfo | null
  tandemInfo: SanityTandemInfo | null
  generalContent: SanityGeneralContent | null
  landingPage: SanityLandingPage | null
  forHoppereInfo: SanityForHoppereInfo | null
}

const SanityDataContext = createContext<SanityData>({
  faqs: [],
  tandemPricing: null,
  kursPricing: null,
  forHopperePricing: null,
  courseInfo: null,
  tandemInfo: null,
  generalContent: null,
  landingPage: null,
  forHoppereInfo: null,
})

export function SanityDataProvider({
  children,
  data,
}: {
  children: React.ReactNode
  data: SanityData
}) {
  return <SanityDataContext.Provider value={data}>{children}</SanityDataContext.Provider>
}

export function useSanityFAQs(page: SanityFAQ['page']) {
  const { faqs } = useContext(SanityDataContext)
  const { language } = useLanguage()
  return faqs
    .filter((f) => f.page === page)
    .sort((a, b) => a.order - b.order)
    .map((f) => ({
      question: language === 'en' ? f.questionEn : f.questionNo,
      answer: language === 'en' ? f.answerEn : f.answerNo,
    }))
}

export function useGeneralContent() {
  const { generalContent } = useContext(SanityDataContext)
  return generalContent
}

export function useForHoppereInfo() {
  const { forHoppereInfo } = useContext(SanityDataContext)
  return forHoppereInfo
}

export function useCMSDataFromSanity() {
  const { tandemPricing, kursPricing, forHopperePricing, courseInfo, tandemInfo, landingPage } =
    useContext(SanityDataContext)
  const { language } = useLanguage()

  const pick = (no: string | undefined, en: string | undefined) =>
    language === 'en' ? (en ?? no ?? '') : (no ?? '')

  const hasPricing = tandemPricing || kursPricing || forHopperePricing

  const home = landingPage
    ? {
        images: (landingPage.introImages || landingPage.serviceImages)
          ? {
              aboutGrid1: landingPage.introImages?.aboutGrid1 ?? undefined,
              aboutGrid1AltNo: landingPage.introImages?.aboutGrid1AltNo ?? undefined,
              aboutGrid1AltEn: landingPage.introImages?.aboutGrid1AltEn ?? undefined,
              aboutGrid2: landingPage.introImages?.aboutGrid2 ?? undefined,
              aboutGrid2AltNo: landingPage.introImages?.aboutGrid2AltNo ?? undefined,
              aboutGrid2AltEn: landingPage.introImages?.aboutGrid2AltEn ?? undefined,
              aboutGrid3: landingPage.introImages?.aboutGrid3 ?? undefined,
              aboutGrid3AltNo: landingPage.introImages?.aboutGrid3AltNo ?? undefined,
              aboutGrid3AltEn: landingPage.introImages?.aboutGrid3AltEn ?? undefined,
              aboutGrid4: landingPage.introImages?.aboutGrid4 ?? undefined,
              aboutGrid4AltNo: landingPage.introImages?.aboutGrid4AltNo ?? undefined,
              aboutGrid4AltEn: landingPage.introImages?.aboutGrid4AltEn ?? undefined,
              serviceTandem: landingPage.serviceImages?.serviceTandem ?? undefined,
              serviceTandemAltNo: landingPage.serviceImages?.serviceTandemAltNo ?? undefined,
              serviceTandemAltEn: landingPage.serviceImages?.serviceTandemAltEn ?? undefined,
              serviceAff: landingPage.serviceImages?.serviceAff ?? undefined,
              serviceAffAltNo: landingPage.serviceImages?.serviceAffAltNo ?? undefined,
              serviceAffAltEn: landingPage.serviceImages?.serviceAffAltEn ?? undefined,
              serviceExperienced: landingPage.serviceImages?.serviceExperienced ?? undefined,
              serviceExperiencedAltNo: landingPage.serviceImages?.serviceExperiencedAltNo ?? undefined,
              serviceExperiencedAltEn: landingPage.serviceImages?.serviceExperiencedAltEn ?? undefined,
            }
          : undefined,
        video: landingPage.video
          ? {
              heroVideoDesktop: landingPage.video.heroVideoDesktop,
              heroVideoMobile: landingPage.video.heroVideoMobile,
              heroPoster: landingPage.video.heroPoster,
            }
          : undefined,
        aboutDescription1: pick(
          landingPage.introContent?.aboutDescription1No,
          landingPage.introContent?.aboutDescription1En
        ) || undefined,
        aboutDescription2: pick(
          landingPage.introContent?.aboutDescription2No,
          landingPage.introContent?.aboutDescription2En
        ) || undefined,
        statsMembersCount: landingPage.introContent?.statsMembersCount,
        statsJumpsCount: landingPage.introContent?.statsJumpsCount,
        serviceCards: landingPage.servicesContent
          ? {
              tandemTitle: pick(landingPage.servicesContent.tandemTitleNo, landingPage.servicesContent.tandemTitleEn) || undefined,
              tandemDesc: pick(landingPage.servicesContent.tandemDescNo, landingPage.servicesContent.tandemDescEn) || undefined,
              affTitle: pick(landingPage.servicesContent.affTitleNo, landingPage.servicesContent.affTitleEn) || undefined,
              affDesc: pick(landingPage.servicesContent.affDescNo, landingPage.servicesContent.affDescEn) || undefined,
              experiencedTitle: pick(landingPage.servicesContent.experiencedTitleNo, landingPage.servicesContent.experiencedTitleEn) || undefined,
              experiencedDesc: pick(landingPage.servicesContent.experiencedDescNo, landingPage.servicesContent.experiencedDescEn) || undefined,
            }
          : undefined,
      }
    : null

  return {
    pricing: hasPricing
      ? {
          tandem: tandemPricing ?? {
            weekday: 0, weekend: 0, video: 0, videoPhotos: 0, fullPackage: 0,
          },
          kurs: kursPricing ?? { affCourse: 0 },
          forHoppere: forHopperePricing ?? null,
        }
      : null,
    home,
    course: courseInfo
      ? {
          videoUrl: courseInfo.videoUrl,
          modules: {
            groundSchool: {
              title: pick(courseInfo.modules?.groundSchool?.titleNo, courseInfo.modules?.groundSchool?.titleEn),
              description: pick(courseInfo.modules?.groundSchool?.descNo, courseInfo.modules?.groundSchool?.descEn),
              duration: courseInfo.modules?.groundSchool?.duration ?? '',
            },
            windTunnel: {
              title: pick(courseInfo.modules?.windTunnel?.titleNo, courseInfo.modules?.windTunnel?.titleEn),
              description: pick(courseInfo.modules?.windTunnel?.descNo, courseInfo.modules?.windTunnel?.descEn),
              duration: courseInfo.modules?.windTunnel?.duration ?? '',
            },
            level13: {
              title: pick(courseInfo.modules?.level13?.titleNo, courseInfo.modules?.level13?.titleEn),
              description: pick(courseInfo.modules?.level13?.descNo, courseInfo.modules?.level13?.descEn),
              duration: courseInfo.modules?.level13?.duration ?? '',
            },
            level47: {
              title: pick(courseInfo.modules?.level47?.titleNo, courseInfo.modules?.level47?.titleEn),
              description: pick(courseInfo.modules?.level47?.descNo, courseInfo.modules?.level47?.descEn),
              duration: courseInfo.modules?.level47?.duration ?? '',
            },
          },
          included: courseInfo.included?.map((i) => pick(i.no, i.en)) ?? [],
          requirements: courseInfo.requirements?.map((r) => pick(r.no, r.en)) ?? [],
          progressionLevels: courseInfo.progressionLevels?.map((l) => ({
            levelNumber: l.levelNumber,
            title: pick(l.titleNo, l.titleEn),
            goal: pick(l.goalNo, l.goalEn),
            desc: pick(l.descNo, l.descEn) || undefined,
            requirements: l.requirements?.map((r) => pick(r.no, r.en)),
            nextSteps: l.nextSteps?.map((n) => pick(n.no, n.en)),
          })),
          images: courseInfo.images ?? null,
          heroCard: courseInfo.heroCard
            ? {
                title: pick(courseInfo.heroCard.titleNo, courseInfo.heroCard.titleEn) || undefined,
                infoItems: courseInfo.heroCard.infoItems?.map((i) => pick(i.no, i.en)),
                closingText: pick(courseInfo.heroCard.closingTextNo, courseInfo.heroCard.closingTextEn) || undefined,
              }
            : undefined,
          pricingIncluded: courseInfo.pricingIncluded?.length
            ? courseInfo.pricingIncluded.map((i) => pick(i.no, i.en))
            : undefined,
          aLicense: (courseInfo.aLicenseProgressionItems?.length || courseInfo.aLicenseBeforeItems?.length)
            ? {
                progressionItems: courseInfo.aLicenseProgressionItems?.map((i) => ({
                  title: pick(i.titleNo, i.titleEn),
                  description: pick(i.descriptionNo, i.descriptionEn),
                })),
                tempoDesc: pick(courseInfo.aLicenseTempoDescNo, courseInfo.aLicenseTempoDescEn) || undefined,
                beforeItems: courseInfo.aLicenseBeforeItems?.map((i) => ({
                  title: pick(i.titleNo, i.titleEn),
                  description: pick(i.descriptionNo, i.descriptionEn),
                })),
                congratsDesc: pick(courseInfo.aLicenseCongratsDescNo, courseInfo.aLicenseCongratsDescEn) || undefined,
                totalJumps: pick(courseInfo.aLicenseTotalJumpsNo, courseInfo.aLicenseTotalJumpsEn) || undefined,
              }
            : undefined,
          payment: (courseInfo.paymentBookingDescNo || courseInfo.paymentStartDescNo)
            ? {
                bookingDesc: pick(courseInfo.paymentBookingDescNo, courseInfo.paymentBookingDescEn) || undefined,
                startDesc: pick(courseInfo.paymentStartDescNo, courseInfo.paymentStartDescEn) || undefined,
                vippsDesc: pick(courseInfo.paymentVippsDescNo, courseInfo.paymentVippsDescEn) || undefined,
                rejumpDesc1: pick(courseInfo.paymentRejumpDesc1No, courseInfo.paymentRejumpDesc1En) || undefined,
                rejumpDesc2: pick(courseInfo.paymentRejumpDesc2No, courseInfo.paymentRejumpDesc2En) || undefined,
                membershipDesc: pick(courseInfo.paymentMembershipDescNo, courseInfo.paymentMembershipDescEn) || undefined,
                cancellationDesc: pick(courseInfo.paymentCancellationDescNo, courseInfo.paymentCancellationDescEn) || undefined,
              }
            : undefined,
          declaration: pick(courseInfo.declarationTextNo, courseInfo.declarationTextEn) || undefined,
          support: (courseInfo.supportFacebookNo || courseInfo.supportMentorNo)
            ? {
                facebook: pick(courseInfo.supportFacebookNo, courseInfo.supportFacebookEn) || undefined,
                mentor: pick(courseInfo.supportMentorNo, courseInfo.supportMentorEn) || undefined,
              }
            : undefined,
        }
      : null,
    tandem: tandemInfo
      ? {
          videoUrl: tandemInfo.videoUrl,
          pricingIncluded: tandemInfo.pricingIncluded?.length
            ? tandemInfo.pricingIncluded.map((i) => pick(i.no, i.en))
            : undefined,
          heroCard: tandemInfo.heroCard
            ? {
                title: pick(tandemInfo.heroCard.titleNo, tandemInfo.heroCard.titleEn) || undefined,
                infoItems: tandemInfo.heroCard.infoItems?.map((i) => pick(i.no, i.en)),
                closingText: pick(tandemInfo.heroCard.closingTextNo, tandemInfo.heroCard.closingTextEn) || undefined,
              }
            : undefined,
          requirements: tandemInfo.requirements?.map((r) => pick(r.no, r.en)) ?? [],
          highlights: tandemInfo.highlights?.map((h) => ({
            title: pick(h.titleNo, h.titleEn),
            description: pick(h.descriptionNo, h.descriptionEn),
          })),
          jumpDaySteps: tandemInfo.jumpDaySteps?.map((s) => ({
            title: pick(s.titleNo, s.titleEn),
            description: pick(s.descriptionNo, s.descriptionEn),
          })),
          images: tandemInfo.images ?? null,
        }
      : null,
  }
}
