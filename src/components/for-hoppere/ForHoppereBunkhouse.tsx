'use client';
import { motion } from 'framer-motion';
import { Home, CheckCircle2, CreditCard, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereBunkhouse() {
  const { t } = useLanguage();
  const { bunkhouseDescription, bunkhousingPricing, bunkhouseRules } = useForHoppereData();
  return (
    <section id="bunkhouse" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
            {t('forHoppere.bunkhouse.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.bunkhouse.title')}{' '}
            <span className="text-gradient">{t('forHoppere.bunkhouse.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {bunkhouseDescription}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
          >
            <a
              href="https://www.supersaas.com/schedule/SkydiveTonsberg/Bunkhouse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home className="mr-2 w-5 h-5" />
              {t('forHoppere.bunkhouse.bookButton')}
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <Card className="border-0 shadow-lg flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-sky" />
                  {t('forHoppere.bunkhouse.rulesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-3">
                  {bunkhouseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    {t('forHoppere.bunkhouse.contactText')}{' '}
                    <a href="mailto:info@hoppfallskjerm.no" className="text-sky hover:underline">
                      info@hoppfallskjerm.no
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <Card className="border-0 shadow-lg flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky" />
                  {t('forHoppere.bunkhouse.pricingTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {bunkhousingPricing.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    {t('forHoppere.bunkhouse.warningText')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
