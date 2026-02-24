import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from './useCMSContent';
import { Plane, Eye, Users, Award } from 'lucide-react';

export const useTandemData = () => {
  const { t } = useLanguage();
  const { content } = useCMSContent();

  const highlights = [
    { icon: Plane, title: t('tandem.highlights.closestOslo.title'), description: t('tandem.highlights.closestOslo.description') },
    { icon: Eye, title: t('tandem.highlights.beautifulView.title'), description: t('tandem.highlights.beautifulView.description') },
    { icon: Users, title: t('tandem.highlights.bestPlane.title'), description: t('tandem.highlights.bestPlane.description') },
    { icon: Award, title: t('tandem.highlights.experienced.title'), description: t('tandem.highlights.experienced.description') },
  ];

  const requirements = content?.tandem?.requirements || [
    t('tandem.requirements.age'),
    t('tandem.requirements.medical'),
    t('tandem.requirements.weight'),
    t('tandem.requirements.sober'),
  ];

  const jumpDaySteps = [
    { title: t('tandem.jumpDay.step1.title'), description: t('tandem.jumpDay.step1.description') },
    { title: t('tandem.jumpDay.step2.title'), description: t('tandem.jumpDay.step2.description') },
    { title: t('tandem.jumpDay.step3.title'), description: t('tandem.jumpDay.step3.description') },
    { title: t('tandem.jumpDay.step4.title'), description: t('tandem.jumpDay.step4.description') },
    { title: t('tandem.jumpDay.step5.title'), description: t('tandem.jumpDay.step5.description') },
    { title: t('tandem.jumpDay.step6.title'), description: t('tandem.jumpDay.step6.description') },
  ];

  const faqData = Array.from({ length: 8 }, (_, i) => ({
    question: t(`tandem.faq.q${i + 1}.question`),
    answer: t(`tandem.faq.q${i + 1}.answer`),
  }));

  return { highlights, requirements, jumpDaySteps, faqData };
};
