'use client';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereRental() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { rentalDescription, rentalAvailable, rentalContactText, rentalFeatures, rentalRequirements } = useForHoppereData();
  return (
    <section id="rental" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.rental.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.rental.title')}{' '}
            <span className="text-gradient">{t('forHoppere.rental.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {rentalDescription}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky" />
                {t('forHoppere.rental.included')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{rentalAvailable}</p>
              <ul className="space-y-3">
                {rentalFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-foreground mb-3">{t('forHoppere.rental.requirements')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {rentalRequirements.map((req, i) => (
                    <li key={i}>• {req}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-4">
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-foreground">{t('forHoppere.rental.pricing.rental')}</span>
                    <span className="text-2xl font-bold text-sky">{content?.pricing?.forHoppere?.equipment?.rentalRig ?? 0} kr</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('forHoppere.rental.pricing.perJump')}</p>
                </div>
              </div>
              <div className="p-4 bg-sky/10 rounded-xl border border-sky/20">
                <p className="text-sm text-foreground">
                  <Info className="w-4 h-4 inline mr-2" />
                  {rentalContactText}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
