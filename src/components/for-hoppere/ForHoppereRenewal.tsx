'use client';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereRenewal() {
  const { t } = useLanguage();
  const { renewalDescription } = useForHoppereData();
  return (
    <section id="fornye" className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.renewal.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('forHoppere.renewal.title')}{' '}
            <span className="text-gradient">{t('forHoppere.renewal.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {renewalDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
            >
              <a
                href="https://nlf.no/grener/fallskjerm/Medlem/minidrett/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 w-5 h-5" />
                {t('forHoppere.renewal.button')}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold"
            >
              <a
                href="https://tms.nlf.no/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 w-5 h-5" />
                {t('forHoppere.renewal.button2')}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
