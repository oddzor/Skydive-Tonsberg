import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from './useCMSContent';
import { BookOpen, Wind, Users2, User } from 'lucide-react';

export const useKursData = () => {
  const { t } = useLanguage();
  const { content } = useCMSContent();

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

  const included = content?.course?.included || [
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

  const requirements = content?.course?.requirements || [
    t('kurs.requirements.age'),
    t('kurs.requirements.medical'),
    t('kurs.requirements.weight'),
    t('kurs.requirements.declaration'),
    t('kurs.requirements.motivation'),
  ];

  const faqData = Array.from({ length: 6 }, (_, i) => ({
    question: t(`kurs.faq.q${i + 1}.question`),
    answer: t(`kurs.faq.q${i + 1}.answer`),
  }));

  return { modules, included, requirements, faqData };
};
