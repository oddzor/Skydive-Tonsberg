import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Wind, Users2, User } from 'lucide-react';

export const useKursData = () => {
  const { t } = useLanguage();

  const modules = [
    {
      icon: BookOpen,
      title: t('kurs.modules.groundSchool.title'),
      description: t('kurs.modules.groundSchool.description'),
      duration: t('kurs.modules.groundSchool.duration'),
    },
    {
      icon: Wind,
      title: t('kurs.modules.windTunnel.title'),
      description: t('kurs.modules.windTunnel.description'),
      duration: t('kurs.modules.windTunnel.duration'),
    },
    {
      icon: Users2,
      title: t('kurs.modules.level13.title'),
      description: t('kurs.modules.level13.description'),
      duration: t('kurs.modules.level13.duration'),
    },
    {
      icon: User,
      title: t('kurs.modules.level47.title'),
      description: t('kurs.modules.level47.description'),
      duration: t('kurs.modules.level47.duration'),
    },
  ];

  const included = [
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

  const requirements = [
    t('kurs.requirements.age'),
    t('kurs.requirements.medical'),
    t('kurs.requirements.weight'),
    t('kurs.requirements.declaration'),
    t('kurs.requirements.motivation'),
  ];

  const faqData = [
    {
      question: t('kurs.faq.q1.question'),
      answer: t('kurs.faq.q1.answer'),
    },
    {
      question: t('kurs.faq.q2.question'),
      answer: t('kurs.faq.q2.answer'),
    },
    {
      question: t('kurs.faq.q3.question'),
      answer: t('kurs.faq.q3.answer'),
    },
    {
      question: t('kurs.faq.q4.question'),
      answer: t('kurs.faq.q4.answer'),
    },
    {
      question: t('kurs.faq.q5.question'),
      answer: t('kurs.faq.q5.answer'),
    },
    {
      question: t('kurs.faq.q6.question'),
      answer: t('kurs.faq.q6.answer'),
    },
  ];

  return {
    modules,
    included,
    requirements,
    faqData,
  };
};







