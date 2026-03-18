'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plane, CreditCard, Briefcase, Users, BookOpen, Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHopperePricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { pricing, registrationFees, equipmentPricing, coursePricing, tandemPricing } = useForHoppereData();
  return (
    <section id="priser" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.pricing.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.pricing.title')}{' '}
            <span className="text-gradient">{t('forHoppere.pricing.titleHighlight')}</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg overflow-hidden p-0">
            <CardHeader className="bg-sky text-white">
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                {t('forHoppere.pricing.jumpPrices')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-6 pb-6">
              <ul className="space-y-3">
                {pricing.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <span className="text-foreground">{item.name}</span>
                      {item.note && (
                        <span className="block text-xs text-muted-foreground">{item.note}</span>
                      )}
                    </div>
                    <span className="font-semibold text-sky">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5 text-sky" />
                {t('forHoppere.pricing.registrationFees')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {registrationFees.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{item.name}</span>
                    <span className="font-semibold text-sky">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-sky" />
                {t('forHoppere.pricing.equipment')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {equipmentPricing.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{item.name}</span>
                    <span className="font-semibold text-sky">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-sky" />
                {t('forHoppere.pricing.tandem')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tandemPricing.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{item.name}</span>
                    <span className="font-semibold text-sky">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-sky" />
                {t('forHoppere.pricing.courses')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {coursePricing.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{item.name}</span>
                    <span className="font-semibold text-sky">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-sky" />
                {t('forHoppere.pricing.misc')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{t('forHoppere.pricing.miscItems.membership')}</span>
                  <span className="font-semibold text-sky">{content?.pricing?.forHoppere?.misc?.tofskMembership || 350} kr</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{t('forHoppere.pricing.miscItems.withdrawal')}</span>
                  <span className="font-semibold text-sky">{content?.pricing?.forHoppere?.misc?.burbleWithdrawal || 100} kr</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{t('forHoppere.pricing.miscItems.referTandem')}</span>
                  <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.recruiterReward || '2 gratishopp'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{t('forHoppere.pricing.miscItems.referAFF')}</span>
                  <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.recruiterReward || '2 gratishopp'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{t('forHoppere.pricing.miscItems.familyDiscount')}</span>
                  <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.familyDiscount || 500} kr</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 border-sky shadow-lg">
            <CardHeader className="bg-sky text-white">
              <CardTitle>{t('forHoppere.pricing.deals.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.pricing.deals.dealTitle')}</h4>
                  <p className="text-2xl font-bold text-sky mb-2">{t('forHoppere.pricing.deals.dealPrice')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('forHoppere.pricing.deals.dealDesc')}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.pricing.deals.bigDealTitle')}</h4>
                  <p className="text-2xl font-bold text-sky mb-2">{t('forHoppere.pricing.deals.bigDealPrice')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('forHoppere.pricing.deals.bigDealDesc')}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-foreground">
                  <AlertCircle className="w-4 h-4 inline mr-2 text-destructive" />
                  {t('forHoppere.pricing.deals.warning')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
