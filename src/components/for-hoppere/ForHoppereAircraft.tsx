'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereAircraft() {
  const { t } = useLanguage();
  const { aircraftIntro, aircraftHistory, aircraftRenovation } = useForHoppereData();
  return (
    <section id="flyet" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.aircraft.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.aircraft.title')}{' '}
            <span className="text-gradient">{t('forHoppere.aircraft.titleHighlight')}</span>
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {aircraftIntro}
            </p>
            <p className="text-muted-foreground mb-6">
              {aircraftHistory}
            </p>
            <p className="text-muted-foreground mb-6">
              {aircraftRenovation}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-card rounded-xl border border-border text-center">
                <p className="text-3xl font-bold text-sky">20</p>
                <p className="text-sm text-muted-foreground">{t('forHoppere.aircraft.stats.jumpers')}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border text-center">
                <p className="text-3xl font-bold text-sky">10 min</p>
                <p className="text-sm text-muted-foreground">{t('forHoppere.aircraft.stats.climbTime')}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border text-center">
                <p className="text-3xl font-bold text-sky">22 000+</p>
                <p className="text-sm text-muted-foreground">{t('forHoppere.aircraft.stats.hours')}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border text-center">
                <p className="text-3xl font-bold text-sky">1968</p>
                <p className="text-sm text-muted-foreground">{t('forHoppere.aircraft.stats.year')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {t('forHoppere.aircraft.care')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/ln-jmp.webp"
              alt={t('forHoppere.aircraft.alt')}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
