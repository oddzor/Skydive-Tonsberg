'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  KursHero,
  KursRequirements,
  KursFAQ,
  KursPayment,
  KursProgression,
  KursALicense,
  PhotoCarousel,
} from '@/components/kurs';
import { localImageSrc } from '@/components/kurs/imageHelpers';
import { PageNav } from '@/components/shared/PageNav';

const KURS_NAV_SECTIONS = [
  { id: 'kursinfo',  labelKey: 'kurs.quickLinks.kursinfo' },
  { id: 'progresjon', labelKey: 'kurs.quickLinks.progresjon' },
  { id: 'a-lisens',  labelKey: 'kurs.quickLinks.aLisens' },
  { id: 'betaling',  labelKey: 'kurs.quickLinks.betaling' },
  { id: 'krav',      labelKey: 'kurs.quickLinks.krav' },
  { id: 'faq',       labelKey: 'kurs.quickLinks.faq' },
];

function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function KursContent() {
  const { content } = useCMSContent();
  const { language } = useLanguage();


  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const classroomSrc = isMobile
    ? '/course-classroom-mobile.webp'
    : localImageSrc(content?.course?.images?.classroom, '/course-classroom.webp');

  const groupPhotos = [
    {
      src: localImageSrc(content?.course?.images?.groupPhoto1, '/course-group-1.webp'),
      alt: 'AFF Students in Airplane',
      objectPosition: 'top',
    },
    {
      src: localImageSrc(content?.course?.images?.groupPhoto2, '/course-group-2.webp'),
      alt: 'Student After Successful Jump',
      objectPosition: 'center',
    },
    {
      src: localImageSrc(content?.course?.images?.groupPhoto3, '/course-group-3.webp'),
      alt: 'AFF Training Session',
      objectPosition: 'center',
    },
  ];

  return (
    <>
      <PageNav sections={KURS_NAV_SECTIONS} />
      <KursHero />

      <section id="kursinfo" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto"
          >
            <Image
              src={classroomSrc}
              alt={pickAlt(content?.course?.images?.classroomAltNo, content?.course?.images?.classroomAltEn, 'AFF Ground School Classroom', language)}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 72rem"
              quality={90}
            />
          </motion.div>
        </div>
      </section>

      <KursProgression />

      <section className="hidden md:block py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <PhotoCarousel photos={groupPhotos} height={300} columns={3} animation="zoom" />
        </div>
      </section>

      <KursALicense />

      <KursPayment />
      <div className="md:hidden py-8 px-4">
        <PhotoCarousel photos={groupPhotos} height={300} columns={3} animation="zoom" />
      </div>

      <KursRequirements />

      <KursFAQ />
    </>
  );
}
