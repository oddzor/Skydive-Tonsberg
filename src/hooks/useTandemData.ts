import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from './useCMSContent';
import { useSanityFAQs } from '@/contexts/SanityDataContext';
import { Plane, Eye, Users, Award } from 'lucide-react';

export const useTandemData = () => {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const sanityFAQs = useSanityFAQs('tandem');

  const sanityHighlights = content?.tandem?.highlights;
  const highlights = sanityHighlights?.length
    ? [
        { icon: Plane, title: sanityHighlights[0]?.title ?? t('tandem.highlights.closestOslo.title'), description: sanityHighlights[0]?.description ?? t('tandem.highlights.closestOslo.description') },
        { icon: Eye, title: sanityHighlights[1]?.title ?? t('tandem.highlights.beautifulView.title'), description: sanityHighlights[1]?.description ?? t('tandem.highlights.beautifulView.description') },
        { icon: Users, title: sanityHighlights[2]?.title ?? t('tandem.highlights.bestPlane.title'), description: sanityHighlights[2]?.description ?? t('tandem.highlights.bestPlane.description') },
        { icon: Award, title: sanityHighlights[3]?.title ?? t('tandem.highlights.experienced.title'), description: sanityHighlights[3]?.description ?? t('tandem.highlights.experienced.description') },
      ]
    : [
        { icon: Plane, title: t('tandem.highlights.closestOslo.title'), description: t('tandem.highlights.closestOslo.description') },
        { icon: Eye, title: t('tandem.highlights.beautifulView.title'), description: t('tandem.highlights.beautifulView.description') },
        { icon: Users, title: t('tandem.highlights.bestPlane.title'), description: t('tandem.highlights.bestPlane.description') },
        { icon: Award, title: t('tandem.highlights.experienced.title'), description: t('tandem.highlights.experienced.description') },
      ];

  const requirements = content?.tandem?.requirements?.length
    ? content.tandem.requirements
    : [
        t('tandem.requirements.age'),
        t('tandem.requirements.medical'),
        t('tandem.requirements.weight'),
        t('tandem.requirements.sober'),
      ];

  const sanityJumpDaySteps = content?.tandem?.jumpDaySteps;
  const jumpDaySteps = sanityJumpDaySteps?.length
    ? sanityJumpDaySteps
    : [
        { title: t('tandem.jumpDay.step1.title'), description: t('tandem.jumpDay.step1.description') },
        { title: t('tandem.jumpDay.step2.title'), description: t('tandem.jumpDay.step2.description') },
        { title: t('tandem.jumpDay.step3.title'), description: t('tandem.jumpDay.step3.description') },
        { title: t('tandem.jumpDay.step4.title'), description: t('tandem.jumpDay.step4.description') },
        { title: t('tandem.jumpDay.step5.title'), description: t('tandem.jumpDay.step5.description') },
        { title: t('tandem.jumpDay.step6.title'), description: t('tandem.jumpDay.step6.description') },
      ];

  const faqData = sanityFAQs.length > 0
    ? sanityFAQs
    : Array.from({ length: 8 }, (_, i) => ({
        question: t(`tandem.faq.q${i + 1}.question`),
        answer: t(`tandem.faq.q${i + 1}.answer`),
      }));

  const jumpStats = content?.tandem?.jumpStats;
  const exitAltitude = jumpStats?.exitAltitude || '4000m';
  const freefallDuration = jumpStats?.freefallDuration || '40 sek';
  const ageRestriction = jumpStats?.ageRestriction || '15 år';

  return { highlights, requirements, jumpDaySteps, faqData, exitAltitude, freefallDuration, ageRestriction };
};
