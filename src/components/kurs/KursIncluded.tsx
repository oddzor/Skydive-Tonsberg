'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKursData } from '@/hooks/useKursData';
import { useCMSContent } from '@/hooks/useCMSContent';
function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function KursIncluded() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const { included } = useKursData();
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              {t('kurs.included.title')}
            </h2>
            <div className="space-y-4">
              {included.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={content?.course?.images?.studentInAction || '/aff-student.webp'}
              alt={pickAlt(content?.course?.images?.studentInActionAltNo, content?.course?.images?.studentInActionAltEn, 'AFF Student', language)}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
