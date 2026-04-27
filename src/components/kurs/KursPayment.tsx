'use client';
import { motion } from 'framer-motion';
import {
  FileText,
  CreditCard,
  Smartphone,
  RefreshCw,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useKursData } from '@/hooks/useKursData';

export function KursPayment() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const { payment } = useKursData();

  return (
    <section id="betaling" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('kurs.payment.title')}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">{t('kurs.payment.priceTitle')}</h3>
              <div className="text-4xl font-bold text-sky mb-2">
                {content?.pricing?.forHoppere?.courses?.affCourse ?? 0} kr
              </div>
              <p className="text-muted-foreground mb-6">{t('kurs.payment.completeCourse')}</p>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky" />
                    {t('kurs.payment.bookingTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.bookingDesc}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-sky" />
                    {t('kurs.payment.startTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.startDesc}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-sky" />
                    {t('kurs.payment.vippsTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.vippsDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">{t('kurs.payment.rejumpTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-sky" />
                    {t('kurs.payment.rejumpSubtitle')}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {payment.rejumpDesc1}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.rejumpDesc2}{' '}
                    <a href="/for-hoppere#priser" className="text-sky hover:underline">
                      {t('nav.forJumpers')}
                    </a>
                    .
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="font-semibold mb-2 text-amber-900 dark:text-amber-100 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t('kurs.payment.membershipTitle')}
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {payment.membershipDesc}
                  </p>
                  <a
                    href="https://nlf.no/medlemsservice/kontingentkalkulator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky hover:underline mt-2 inline-block"
                  >
                    {t('kurs.payment.membershipLink')} →
                  </a>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" />
                    {t('kurs.payment.cancellationTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.cancellationDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
