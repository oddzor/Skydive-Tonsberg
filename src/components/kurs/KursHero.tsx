'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, FileText, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { VideoEmbed, StatsGrid } from '@/components/shared';
export function KursHero() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const keyStats = [
    {
      value: '1,5',
      label: t('kurs.stats.theoryDays'),
    },
    {
      value: '7',
      label: t('kurs.stats.jumps'),
    },
    {
      value: '10 min',
      label: t('kurs.stats.windTunnel'),
    },
    {
      value: '16 år',
      label: t('kurs.stats.minAge'),
    },
  ];
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-leaf/10 rounded-full text-leaf border border-leaf/30">
              {t('kurs.hero.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {t('kurs.hero.title')}{' '}
              <span className="text-gradient">{t('kurs.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              {t('kurs.hero.description')}
            </p>
          </div>
          <VideoEmbed
            videoId={content?.course?.videoUrl}
            title="AFF Course at Skydive Tønsberg"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-leaf/30 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-leaf">
                  {t('kurs.pricing.title')}
                </h3>
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold text-leaf mb-2">
                    {content?.pricing?.kurs?.affCourse || 18990} kr
                  </p>
                  <p className="text-muted-foreground">{t('kurs.pricing.completeCourse')}</p>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <p className="text-sm">{t(`kurs.pricing.included${num}`)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-leaf/10 rounded-lg">
                  <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-leaf" />
                    {t('kurs.pricing.paymentTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('kurs.pricing.paymentDesc')}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-leaf/30 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-leaf">
                  {t('kurs.details.title')}
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-leaf" />
                      {t('kurs.details.durationTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.details.durationDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf" />
                      {t('kurs.details.jumpsTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.details.jumpsDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <Target className="w-4 h-4 text-leaf" />
                      {t('kurs.details.altitudeTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.details.altitudeDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-leaf" />
                      {t('kurs.details.ageTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.details.ageDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <StatsGrid stats={keyStats} columns={4} className="mb-8" />
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-12 py-6 text-lg shadow-xl"
            >
              <a
                href="https://bookings.burblesoft.eu/551/154"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t('kurs.hero.bookCourse')}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              {t('kurs.hero.questionsEmail')}{' '}
              <a
                href="mailto:kurs@hoppfallskjerm.no"
                className="text-leaf hover:underline font-semibold"
              >
                kurs@hoppfallskjerm.no
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
