'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { EventsCarousel } from '@/components/for-hoppere/EventsCarousel';
export function ForHoppereEvents() {
  const { t } = useLanguage();
  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.events.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('forHoppere.events.title')}{' '}
            <span className="text-gradient">{t('forHoppere.events.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{t('forHoppere.events.description')}</p>
        </motion.div>
        <EventsCarousel />
      </div>
    </section>
  );
}
