'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
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
            {t('tandem.hero.bookNow')}
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 py-6 text-lg"
          >
            <a
              href="https://bookings.burblesoft.eu/551/18"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-auto w-fit"
            >
              <ExternalLink className="w-5 h-5" />
              {t('tandem.hero.bookNow')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
