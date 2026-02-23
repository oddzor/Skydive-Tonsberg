'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';

export function KursALicense() {
  const { t } = useLanguage();
  const { content } = useCMSContent();

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
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
            alt="Student Learning to Pack Parachute"
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Progression requirements */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.progressionTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.soloJumps')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.soloJumpsDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.checkouts')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.checkoutsDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.lowJumps')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.lowJumpsDesc')}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
                  {t('kurs.aLicense.tempoDesc')}
                </p>
              </CardContent>
            </Card>

            {/* Before-license requirements */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.beforeLicenseTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.packingCourse')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.packingCourseDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.packingExam')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.packingExamDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.aCourse')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.aCourseDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.aExam')}</p>
                      <p className="text-sm text-muted-foreground">{t('kurs.aLicense.aExamDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{t('kurs.aLicense.renUtover')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('kurs.aLicense.renUtoverDesc')}{' '}
                        <a
                          href="https://renutover.no"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky hover:underline"
                        >
                          renutover.no
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image left, Congratulations card right */}
          <div className="grid md:grid-cols-2 md:gap-8 md:items-stretch mt-8 space-y-6 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={content?.course?.images?.licenseCelebration || '/a-license-celebration.webp'}
                alt="New A-License Graduate Celebrating"
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
                  {t('kurs.aLicense.congratsDesc')}
                </p>
                <p className="text-muted-foreground">
                  {t('kurs.aLicense.totalJumps')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
