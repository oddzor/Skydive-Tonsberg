'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plane, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { localePath } from '@/lib/locale-href';
export function ForHoppereCTA() {
  const { t, language } = useLanguage();
  return (
    <section className="py-24 lg:py-32 bg-gradient-brand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <Plane className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Vi sees i lufta!
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Sjekk hoppkalenderen og bli med oss for noen fantastiske hopp over Vestfold.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-semibold px-8"
            >
              <Link href={localePath(language, 'hoppkalender')}>
                <Calendar className="mr-2 w-5 h-5" />
                {t('forHoppere.cta.calendarButton')}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href={localePath(language, 'kontakt')}>
                {t('forHoppere.cta.contactButton')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
