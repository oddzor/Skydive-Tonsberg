'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useKursData } from '@/hooks/useKursData';

function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function KursALicense() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const { aLicense } = useKursData();

  return (
    <section id="a-lisens" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('kurs.aLicense.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('kurs.aLicense.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-lg h-[450px] mx-auto rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          <Image
            src={content?.course?.images?.packingCourse || '/packing-course.webp'}
            alt={pickAlt(content?.course?.images?.packingCourseAltNo, content?.course?.images?.packingCourseAltEn, 'Student Learning to Pack Parachute', language)}
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.progressionTitle')}</h3>
                <div className="space-y-4">
                  {aLicense.progressionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
                  {aLicense.tempoDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.beforeLicenseTitle')}</h3>
                <div className="space-y-4">
                  {aLicense.beforeItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 md:gap-8 md:items-stretch mt-8 space-y-6 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={content?.course?.images?.licenseCelebration || '/a-license-celebration.webp'}
                alt={pickAlt(content?.course?.images?.licenseCelebrationAltNo, content?.course?.images?.licenseCelebrationAltEn, 'New A-License Graduate Celebrating', language)}
                width={0}
                height={0}
                sizes="(max-width: 767px) 100vw, 50vw"
                className="w-full h-auto"
                quality={90}
              />
            </motion.div>

            <Card className="border-2 border-leaf shadow-xl bg-linear-to-br from-leaf/5 to-transparent h-full">
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                  <PartyPopper className="w-6 h-6 text-leaf" />
                  {t('kurs.aLicense.congratulations')}
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {aLicense.congratsDesc}
                </p>
                <p className="text-muted-foreground">
                  {aLicense.totalJumps}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
