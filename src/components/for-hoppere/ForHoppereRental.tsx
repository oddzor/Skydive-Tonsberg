'use client';
import { motion } from 'framer-motion';
import { Briefcase, CreditCard, CheckCircle2, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky" />
                  {t('forHoppere.rental.included')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {rentalAvailable}
                </p>
                <ul className="space-y-3">
                  {rentalFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-foreground mb-3">{t('forHoppere.rental.requirements')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {rentalRequirements.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky" />
                  {t('forHoppere.pricing.equipment')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-foreground">{t('forHoppere.rental.pricing.rental')}</span>
                      <span className="text-2xl font-bold text-sky">{content?.pricing?.forHoppere?.equipment?.rentalRig || 215} kr</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('forHoppere.rental.pricing.perJump')}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-foreground">{t('forHoppere.rental.pricing.student')}</span>
                      <span className="text-2xl font-bold text-sky">{content?.pricing?.forHoppere?.equipment?.studentRig || 125} kr</span>
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
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-brand hover:opacity-90 text-white font-semibold"
                >
                  <a
                    href="https://www.supersaas.com/schedule/SkydiveTonsberg/Rental_Rigs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Briefcase className="mr-2 w-5 h-5" />
                    {t('forHoppere.rental.bookButton')}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
