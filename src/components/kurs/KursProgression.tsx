'use client';
import { motion } from 'framer-motion';
import { ClipboardList, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useKursData } from '@/hooks/useKursData';
import { PhotoCarousel } from './PhotoCarousel';
import { localImageSrc } from './imageHelpers';

function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function KursProgression() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const { progressionLevels } = useKursData();

  const progressionSoloSrc = localImageSrc(content?.course?.images?.soloStudent, '/aff-solo-student.webp');
  const progressionStudentSrc = localImageSrc(content?.course?.images?.studentInAction, '/aff-student.webp');

  const level = (n: number) => progressionLevels.find((l) => l.levelNumber === n) ?? {
    levelNumber: n,
    title: t(`kurs.progression.level${n}Title`),
    goal: t(`kurs.progression.level${n}Goal`),
    desc: undefined,
    requirements: undefined,
    nextSteps: undefined,
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('kurs.progression.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('kurs.progression.description')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">

          {/* Level 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{level(1).title}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                        <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3">
                      <strong>{t('kurs.requirements.title')}:</strong> {level(1).goal}
                    </p>
                    {level(1).desc && (
                      <p className="text-sm text-muted-foreground mt-2">{level(1).desc}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Level 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{level(2).title}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                        <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3">
                      <strong>{t('kurs.requirements.title')}:</strong> {level(2).goal}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Level 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{level(3).title}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                        <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                        <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3">
                      <strong>{t('kurs.requirements.title')}:</strong> {level(3).goal}
                    </p>
                    {level(3).desc && (
                      <p className="text-sm text-muted-foreground mt-2">{level(3).desc}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <PhotoCarousel
            photos={[
              { src: progressionSoloSrc,    alt: pickAlt(content?.course?.images?.soloStudentAltNo, content?.course?.images?.soloStudentAltEn, 'Solo AFF Student Flying', language), objectPosition: 'center' },
              { src: progressionStudentSrc, alt: pickAlt(content?.course?.images?.studentInActionAltNo, content?.course?.images?.studentInActionAltEn, 'AFF Student in Freefall', language), objectPosition: 'center' },
            ]}
            height={350}
            columns={2}
            animation="zoom"
            className="my-12"
          />

          {/* Levels 4–7 */}
          <div className="grid md:grid-cols-2 gap-6">
            {[4, 5, 6, 7].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-lg font-bold">
                        {n}
                      </div>
                      <h3 className="text-lg font-bold">{level(n).title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>1 {t('kurs.progression.level1Instructors').toLowerCase()}</strong> | 12 500 fot
                      {n < 7
                        ? ` | ${t('kurs.progression.level47FreefallTime')} ${t('kurs.progression.level1Freefall').toLowerCase()}`
                        : ` | ${t('kurs.progression.level1Deploy')}: 4 000 fot`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('kurs.requirements.title')}:</strong> {level(n).goal}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Level 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-sky shadow-xl bg-linear-to-br from-sky/5 to-transparent">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-sky flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{level(8).title}</h3>
                    {level(8).desc && (
                      <p className="text-muted-foreground mb-4">{level(8).desc}</p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      {level(8).requirements?.length ? (
                        <div className="p-4 bg-background rounded-lg">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-sky" />
                            {t('kurs.progression.level8Requirements')}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {level(8).requirements!.map((req, i) => (
                              <li key={i}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {level(8).nextSteps?.length ? (
                        <div className="p-4 bg-background rounded-lg">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-sky" />
                            {t('kurs.progression.level8NextSection')}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {level(8).nextSteps!.map((step, i) => (
                              <li key={i}>• {step}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
