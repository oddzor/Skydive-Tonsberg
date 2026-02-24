'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { SectionHeader } from '@/components/shared';
export function KursSchedule() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
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
    : (content?.course?.images?.classroom || '/course-classroom.webp');

  return (
    <section className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('kurs.schedule.title')}
          description={t('kurs.schedule.description')}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-16 max-w-6xl mx-auto"
        >
          <Image
            src={classroomSrc}
            alt="AFF Ground School Classroom"
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 72rem"
            quality={90}
          />
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t('kurs.schedule.structureTitle')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('kurs.schedule.structureDesc')}
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>
                        <strong>{t('kurs.modules.groundSchool.title')}:</strong>{' '}
                        {t('kurs.schedule.groundSchool')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>
                        <strong>{t('kurs.modules.windTunnel.title')}:</strong>{' '}
                        {t('kurs.schedule.windTunnel')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>
                        <strong>{t('kurs.modules.level13.title')}:</strong>{' '}
                        {t('kurs.schedule.day3')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>
                        <strong>{t('kurs.modules.level47.title')}:</strong>{' '}
                        {t('kurs.schedule.day4')}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground mb-2">
                    <strong>⏰ {t('kurs.schedule.importantTitle')}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('kurs.schedule.importantDesc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
