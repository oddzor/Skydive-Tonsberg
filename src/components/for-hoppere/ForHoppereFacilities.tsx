'use client';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';

export function ForHoppereFacilities() {
  const { t } = useLanguage();
  const { facilities } = useForHoppereData();

  if (!facilities.length) return null;

  return (
    <section id="fasiliteter" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.facilities.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.facilities.title')}{' '}
            <span className="text-gradient">{t('forHoppere.facilities.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('forHoppere.facilities.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden h-full">
                <div className="relative aspect-[4/3] bg-muted">
                  {facility.imageUrl ? (
                    <Image
                      src={facility.imageUrl}
                      alt={facility.imageAlt ?? facility.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                      <Camera className="w-8 h-8" />
                      <span className="text-xs text-center px-2">
                        {t('forHoppere.facilities.noImage')}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{facility.name}</h3>
                  {facility.description && (
                    <p className="text-sm text-muted-foreground mt-1">{facility.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
