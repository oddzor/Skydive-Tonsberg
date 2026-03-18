'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { localePath } from '@/lib/locale-href';
import { useForHoppereData } from '@/hooks/useForHoppereData';
import { JumperDashboard } from '@/components/for-hoppere/JumperDashboard';
import { VideoEmbed } from '@/components/shared';
export function ForHoppereHero() {
  const { t, language } = useLanguage();
  const { videoUrl, heroDescription, heroSubDescription } = useForHoppereData();
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-leaf/10 rounded-full text-leaf border border-leaf/30">
              {t('forHoppere.hero.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {t('forHoppere.hero.title')}{' '}
              <span className="text-gradient">{t('forHoppere.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {heroDescription}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mt-4">
              {heroSubDescription}
            </p>
          </div>
          <VideoEmbed
            videoId={videoUrl}
            title={t('forHoppere.hero.title')}
            className="mb-8"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Calendar className="w-10 h-10 text-sky mb-3" />
                <h3 className="font-bold text-lg mb-2">{t('forHoppere.cards.calendar.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('forHoppere.cards.calendar.desc')}
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-brand hover:opacity-90 text-white"
                >
                  <Link href={localePath(language, 'hoppkalender')}>
                    <Calendar className="mr-2 w-4 h-4" />
                    {t('forHoppere.cards.calendar.button')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <LayoutDashboard className="w-10 h-10 text-sky mb-3" />
                <h3 className="font-bold text-lg mb-2">{t('forHoppere.cards.dashboard.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('forHoppere.cards.dashboard.desc')}
                </p>
                <JumperDashboard />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
