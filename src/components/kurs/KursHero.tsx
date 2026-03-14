'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useKursData } from '@/hooks/useKursData';
import { useGeneralContent } from '@/contexts/SanityDataContext';
import { VideoEmbed } from '@/components/shared';
export function KursHero() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { pricingIncluded, heroCard } = useKursData();
  const generalContent = useGeneralContent();
  const bookingUrl = generalContent?.bookingUrl || 'https://bookings.burblesoft.eu/551/154';
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
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="border-2 border-leaf/30 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-leaf">
                  {t('kurs.pricing.title')}
                </h3>
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold text-sky mb-2">
                    {content?.pricing?.kurs?.affCourse || 18990} kr
                  </p>
                  <p className="text-muted-foreground">{t('kurs.pricing.completeCourse')}</p>
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
                    <FileText className="w-4 h-4 text-leaf" />
                    {t('kurs.pricing.paymentTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('kurs.pricing.paymentDesc')}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-leaf/20 shadow-xl">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6 text-leaf">{heroCard.title}</h3>
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
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-12 py-6 text-lg shadow-xl"
            >
              <a
                href={bookingUrl}
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
