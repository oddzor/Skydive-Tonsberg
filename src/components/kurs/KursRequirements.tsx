'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKursData } from '@/hooks/useKursData';
export function KursRequirements() {
  const { t } = useLanguage();
  const { requirements, declaration, support } = useKursData();
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {t('kurs.requirements.title')}
          </h2>
          <div className="space-y-4 mb-8">
            {requirements.map((req: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-card p-4 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                <span className="text-lg">{req}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-l-4 border-l-sky bg-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky" />
                  {t('kurs.declaration.title')}
                </h3>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{declaration}&rdquo;
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-0 shadow-lg bg-linear-to-br from-leaf/5 to-transparent">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-leaf" />
                  {t('kurs.support.title')}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• {support.facebook}</p>
                  <p>• {support.mentor}</p>
                  <p className="mt-4 pt-4 border-t border-border">
                    <strong>{t('kurs.support.questions')}</strong>{' '}
                    <a href="mailto:kurs@hoppfallskjerm.no" className="text-sky hover:underline">
                      kurs@hoppfallskjerm.no
                    </a>
                    {' '}{t('kurs.support.orCall')}{' '}
                    <a href="tel:+4733380670" className="text-sky hover:underline">
                    33 38 06 70
                    </a>
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
