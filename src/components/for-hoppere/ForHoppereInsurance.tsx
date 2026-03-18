'use client';
import { motion } from 'framer-motion';
import { Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereInsurance() {
  const { t } = useLanguage();
  const { insuranceNorwegianText, insuranceForeignIntro, insuranceForeignBuy, insuranceForeignWarning } = useForHoppereData();
  return (
    <section id="forsikring" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
            {t('forHoppere.insurance.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('forHoppere.insurance.title')}{' '}
            <span className="text-gradient">{t('forHoppere.insurance.titleHighlight')}</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-leaf" />
                  {t('forHoppere.insurance.norwegianTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {insuranceNorwegianText}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky" />
                  {t('forHoppere.insurance.foreignTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {insuranceForeignIntro}
                </p>
                <p className="text-muted-foreground">
                  {insuranceForeignBuy}
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    {insuranceForeignWarning}
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
