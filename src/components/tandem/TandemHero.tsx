'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Gift, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useTandemData } from '@/hooks/useTandemData';
import { VideoEmbed } from '@/components/shared';
export function TandemHero() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { pricingIncluded, heroCard } = useTandemData();
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
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="border-2 border-sky/30 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-black">
                  {t('tandem.hero.pricingTitle')}
                </h3>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">{t('tandem.hero.priceFrom')}</p>
                  <p className="text-5xl font-bold text-sky mb-2">
                    {content?.pricing?.tandem?.weekday || 4690} kr
                  </p>
                  <p className="text-muted-foreground">{t('tandem.hero.priceSubtitle')}</p>
                </div>
                <div className="space-y-3">
                  {pricingIncluded.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-sky/10 rounded-lg">
                  <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky" />
                    {t('tandem.hero.videoPricingTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('tandem.hero.videoPricingDesc')}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-sky/20 shadow-xl">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6 text-black">{heroCard.title}</h3>
                <div className="space-y-4 flex-1">
                  {heroCard.infoItems.map((item, i) => (
                    <p key={i} className="text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <Image src="/favicon.svg" alt="" aria-hidden width={20} height={20} className="h-5 w-auto shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{heroCard.closingText}</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
