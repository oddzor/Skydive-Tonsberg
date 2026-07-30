'use client';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
export function ForHoppereHandbook() {
  const { t } = useLanguage();
  return (
    <section id="handbok" className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.handbook.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('forHoppere.handbook.title')}{' '}
            <span className="text-gradient">{t('forHoppere.handbook.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('forHoppere.handbook.description')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
          >
            <a
              href="https://nlf.readin.no/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              {t('forHoppere.handbook.button')}
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
