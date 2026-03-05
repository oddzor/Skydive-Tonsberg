import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from './useCMSContent';
import { useSanityFAQs } from '@/contexts/SanityDataContext';
import { BookOpen, Wind, Users2, User } from 'lucide-react';

export const useKursData = () => {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const sanityFAQs = useSanityFAQs('kurs');

  const modules = [
    {
      icon: BookOpen,
      title: content?.course?.modules?.groundSchool?.title || t('kurs.modules.groundSchool.title'),
      description: content?.course?.modules?.groundSchool?.description || t('kurs.modules.groundSchool.description'),
      duration: content?.course?.modules?.groundSchool?.duration || t('kurs.modules.groundSchool.duration'),
    },
    {
      icon: Wind,
      title: content?.course?.modules?.windTunnel?.title || t('kurs.modules.windTunnel.title'),
      description: content?.course?.modules?.windTunnel?.description || t('kurs.modules.windTunnel.description'),
      duration: content?.course?.modules?.windTunnel?.duration || t('kurs.modules.windTunnel.duration'),
    },
    {
      icon: Users2,
      title: content?.course?.modules?.level13?.title || t('kurs.modules.level13.title'),
      description: content?.course?.modules?.level13?.description || t('kurs.modules.level13.description'),
      duration: content?.course?.modules?.level13?.duration || t('kurs.modules.level13.duration'),
    },
    {
      icon: User,
      title: content?.course?.modules?.level47?.title || t('kurs.modules.level47.title'),
      description: content?.course?.modules?.level47?.description || t('kurs.modules.level47.description'),
      duration: content?.course?.modules?.level47?.duration || t('kurs.modules.level47.duration'),
    },
  ];

  const included = content?.course?.included?.length
    ? content.course.included
    : [
        t('kurs.included.groundSchool'),
        t('kurs.included.windTunnel'),
        t('kurs.included.equipment'),
        t('kurs.included.gear'),
        t('kurs.included.jumpsuit'),
        t('kurs.included.jumps13'),
        t('kurs.included.jumps47'),
        t('kurs.included.packing'),
        t('kurs.included.aCourse'),
        t('kurs.included.video'),
        t('kurs.included.accommodation'),
      ];

  const requirements = content?.course?.requirements?.length
    ? content.course.requirements
    : [
        t('kurs.requirements.age'),
        t('kurs.requirements.medical'),
        t('kurs.requirements.weight'),
        t('kurs.requirements.declaration'),
        t('kurs.requirements.motivation'),
      ];

  const sanityProgressionLevels = content?.course?.progressionLevels;
  const progressionLevels = sanityProgressionLevels?.length
    ? sanityProgressionLevels
    : [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        levelNumber: n,
        title: t(`kurs.progression.level${n}Title`),
        goal: t(`kurs.progression.level${n}Goal`),
        desc: n === 1 || n === 3 || n === 8 ? t(`kurs.progression.level${n}Desc`) : undefined,
        requirements: n === 8
          ? [
              t('kurs.progression.level8Req1'),
              t('kurs.progression.level8Req2'),
              t('kurs.progression.level8Req3'),
            ]
          : undefined,
        nextSteps: n === 8
          ? [
              t('kurs.progression.level8Next1'),
              t('kurs.progression.level8Next2'),
              t('kurs.progression.level8Next3'),
            ]
          : undefined,
      }));

  const faqData = sanityFAQs.length > 0
    ? sanityFAQs
    : Array.from({ length: 6 }, (_, i) => ({
        question: t(`kurs.faq.q${i + 1}.question`),
        answer: t(`kurs.faq.q${i + 1}.answer`),
      }));

  const heroStats = {
    theoryDays: content?.course?.heroStats?.theoryDays || '1,5',
    jumpsCount: content?.course?.heroStats?.jumpsCount || '7',
    windTunnelValue: content?.course?.heroStats?.windTunnelValue || '10 min',
    minAge: content?.course?.heroStats?.minAge || '16 år',
  };

  const courseDetails = {
    durationDesc: content?.course?.courseDetails?.durationDesc || t('kurs.details.durationDesc'),
    jumpsDesc: content?.course?.courseDetails?.jumpsDesc || t('kurs.details.jumpsDesc'),
    altitudeDesc: content?.course?.courseDetails?.altitudeDesc || t('kurs.details.altitudeDesc'),
    ageDesc: content?.course?.courseDetails?.ageDesc || t('kurs.details.ageDesc'),
  };

  const pricingIncluded: string[] = content?.course?.pricingIncluded?.length
    ? content.course.pricingIncluded
    : [
        t('kurs.pricing.included1'),
        t('kurs.pricing.included2'),
        t('kurs.pricing.included3'),
        t('kurs.pricing.included4'),
        t('kurs.pricing.included5'),
      ];

  const sanityALicense = content?.course?.aLicense;
  const aLicense = {
    progressionItems: sanityALicense?.progressionItems?.length
      ? sanityALicense.progressionItems
      : [
          { title: t('kurs.aLicense.soloJumps'), description: t('kurs.aLicense.soloJumpsDesc') },
          { title: t('kurs.aLicense.checkouts'), description: t('kurs.aLicense.checkoutsDesc') },
          { title: t('kurs.aLicense.lowJumps'), description: t('kurs.aLicense.lowJumpsDesc') },
        ],
    tempoDesc: sanityALicense?.tempoDesc || t('kurs.aLicense.tempoDesc'),
    beforeItems: sanityALicense?.beforeItems?.length
      ? sanityALicense.beforeItems
      : [
          { title: t('kurs.aLicense.packingCourse'), description: t('kurs.aLicense.packingCourseDesc') },
          { title: t('kurs.aLicense.packingExam'), description: t('kurs.aLicense.packingExamDesc') },
          { title: t('kurs.aLicense.aCourse'), description: t('kurs.aLicense.aCourseDesc') },
          { title: t('kurs.aLicense.aExam'), description: t('kurs.aLicense.aExamDesc') },
          { title: t('kurs.aLicense.renUtover'), description: t('kurs.aLicense.renUtoverDesc') },
        ],
    congratsDesc: sanityALicense?.congratsDesc || t('kurs.aLicense.congratsDesc'),
    totalJumps: sanityALicense?.totalJumps || t('kurs.aLicense.totalJumps'),
  };

  const payment = {
    bookingDesc: content?.course?.payment?.bookingDesc || t('kurs.payment.bookingDesc'),
    startDesc: content?.course?.payment?.startDesc || t('kurs.payment.startDesc'),
    vippsDesc: content?.course?.payment?.vippsDesc || t('kurs.payment.vippsDesc'),
    rejumpDesc1: content?.course?.payment?.rejumpDesc1 || t('kurs.payment.rejumpDesc1'),
    rejumpDesc2: content?.course?.payment?.rejumpDesc2 || t('kurs.payment.rejumpDesc2'),
    membershipDesc: content?.course?.payment?.membershipDesc || t('kurs.payment.membershipDesc'),
    cancellationDesc: content?.course?.payment?.cancellationDesc || t('kurs.payment.cancellationDesc'),
  };

  const declaration = content?.course?.declaration || t('kurs.declaration.text');

  const support = {
    facebook: content?.course?.support?.facebook || t('kurs.support.facebook'),
    mentor: content?.course?.support?.mentor || t('kurs.support.mentor'),
  };

  return { modules, included, requirements, progressionLevels, faqData, heroStats, courseDetails, pricingIncluded, aLicense, payment, declaration, support };
};
