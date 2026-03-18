'use client';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
export function ForHoppereGrassroots() {
  const { t } = useLanguage();
  return (
    <section id="grasrotandelen" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
            {t('forHoppere.weather.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('forHoppere.weather.grassroots.title')}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2 border-leaf shadow-lg">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-leaf mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('forHoppere.weather.grassroots.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('forHoppere.weather.grassroots.desc')}
              </p>
              <Button asChild className="bg-leaf hover:bg-leaf/90 text-white">
                <a href="https://www.norsk-tipping.no/grasrotandelen" target="_blank" rel="noopener noreferrer">
                  {t('forHoppere.weather.grassroots.button')}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
