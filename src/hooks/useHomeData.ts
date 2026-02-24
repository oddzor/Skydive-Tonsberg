import { useLanguage } from '@/contexts/LanguageContext';

export const useHomeData = () => {
  const { t } = useLanguage();

  const faqData = Array.from({ length: 10 }, (_, i) => ({
    question: t(`home.faq.questions.q${i + 1}.question`),
    answer: t(`home.faq.questions.q${i + 1}.answer`),
  }));

  return {
    faqData,
  };
};
