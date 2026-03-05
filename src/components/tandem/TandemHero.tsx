'use client';
import { motion } from 'framer-motion';
import { Camera, Calendar, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useTandemData } from '@/hooks/useTandemData';
import { VideoEmbed, StatsGrid } from '@/components/shared';
export function TandemHero() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { exitAltitude, freefallDuration, ageRestriction } = useTandemData();
  const keyStats = [
    {
      value: exitAltitude,
      label: t('tandem.pricingCards.keyFacts.altitudeLabel'),
    },
    {
      value: freefallDuration,
      label: t('tandem.pricingCards.keyFacts.freefallLabel'),
    },
    {
      value: ageRestriction,
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
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-sky/10 rounded-full text-sky border border-sky/30">
              {t('tandem.hero.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {t('tandem.hero.title')}{' '}
              <span className="text-gradient">{t('tandem.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              {t('tandem.hero.description')}
            </p>
          </div>
          <VideoEmbed
            videoId={content?.tandem?.videoUrl}
            title="Tandem Skydiving at Skydive Tønsberg"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-sky/30 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-sky">
                  {t('tandem.pricingCards.tandemTitle')}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <div>
                      <p className="font-semibold">{t('tandem.pricingCards.weekdayLabel')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('tandem.pricingCards.weekdayDesc')}
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-sky">
                      {content?.pricing?.tandem?.weekday || 4690} kr
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <div>
                      <p className="font-semibold">{t('tandem.pricingCards.weekendLabel')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('tandem.pricingCards.weekendDesc')}
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-sky">
                      {content?.pricing?.tandem?.weekend || 5190} kr
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>{t('tandem.pricingCards.includedLabel')}</strong>{' '}
                      {t('tandem.pricingCards.includedDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-sky/30 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-sky">
                  {t('tandem.pricingCards.videoTitle')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-sky" />
                      <span className="font-semibold">{t('tandem.pricingCards.videoLabel')}</span>
                    </div>
                    <p className="text-xl font-bold">
                      {content?.pricing?.tandem?.video || 800} kr
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-sky" />
                      <span className="font-semibold">
                        {t('tandem.pricingCards.videoPhotosLabel')}
                      </span>
                    </div>
                    <p className="text-xl font-bold">
                      {content?.pricing?.tandem?.videoPhotos || 1290} kr
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-sky/10 rounded-lg border-2 border-sky">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-sky" />
                      <span className="font-semibold">
                        {t('tandem.pricingCards.fullPackageLabel')}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-sky">
                      {content?.pricing?.tandem?.fullPackage || 1780} kr
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">
                    {t('tandem.pricingCards.videoDesc')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <StatsGrid stats={keyStats} columns={3} className="mb-8" />
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-12 py-6 text-lg shadow-xl"
              >
                <a
                  href="https://bookings.burblesoft.eu/551/18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {t('tandem.hero.bookNowCTA')}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 hover:bg-muted/50 font-semibold px-12 py-6 text-lg"
              >
                <a
                  href="https://store.burblesoft.com/?dz_id=551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  {t('tandem.cta.giftCard')}
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {t('tandem.pricingCards.callUs')}{' '}
              <a href="tel:+4733380670" className="text-sky hover:underline font-semibold">
              33 38 06 70
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
