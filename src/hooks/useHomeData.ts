import { useLanguage } from '@/contexts/LanguageContext';
import { useSanityFAQs } from '@/contexts/SanityDataContext';

export const useHomeData = () => {
  const { t } = useLanguage();
  const sanityFAQs = useSanityFAQs('home');

  const faqData = sanityFAQs.length > 0
    ? sanityFAQs
    : Array.from({ length: 10 }, (_, i) => ({
        question: t(`home.faq.questions.q${i + 1}.question`),
        answer: t(`home.faq.questions.q${i + 1}.answer`),
      }));

  return { faqData };
};
