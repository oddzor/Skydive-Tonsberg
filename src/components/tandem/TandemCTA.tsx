'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
export function TandemCTA() {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-32 bg-linear-to-b from-sky to-leaf text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('tandem.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('tandem.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 py-6 text-lg"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                {t('tandem.hero.bookNow')}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-6 text-lg"
            >
              <a
                href="https://store.burblesoft.com/?dz_id=551"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                {t('tandem.cta.giftCard')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
