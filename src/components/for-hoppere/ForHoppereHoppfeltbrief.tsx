'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ZoomIn, X, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
const getHoppfeltbriefImages = (t: (key: string) => string) => [
  {
    src: '/hoppfeltbrief1.webp',
    alt: t('forHoppere.hoppfeltbrief.images.airspaceAlt'),
    title: t('forHoppere.hoppfeltbrief.images.airspace'),
  },
  {
    src: '/hoppfeltbrief2.webp',
    alt: t('forHoppere.hoppfeltbrief.images.exitOrderAlt'),
    title: t('forHoppere.hoppfeltbrief.images.exitOrder'),
  },
  {
    src: '/hoppfeltbrief3.webp',
    alt: t('forHoppere.hoppfeltbrief.images.landingAreasAlt'),
    title: t('forHoppere.hoppfeltbrief.images.landingAreas'),
  },
];
export function ForHoppereHoppfeltbrief() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();
  const { exitOrder, boardingRules, inAircraftRules, landingPatternRules, outlandingRules } = useForHoppereData();
  const hoppfeltbriefImages = getHoppfeltbriefImages(t);
  return (
    <>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              <Image
                src={selectedImage}
                alt="Hoppfeltbrief"
                width={1200}
                height={800}
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-lg block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section id="hoppfeltbrief" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t('forHoppere.hoppfeltbrief.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('forHoppere.hoppfeltbrief.title')}{' '}
              <span className="text-gradient">{t('forHoppere.hoppfeltbrief.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('forHoppere.hoppfeltbrief.description')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {hoppfeltbriefImages.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedImage(image.src)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative aspect-4/3 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium text-center">
                    {image.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-12">
            {t('forHoppere.hoppfeltbrief.clickToZoom')}
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('forHoppere.hoppfeltbrief.exitOrderTitle')}</h3>
              <Card className="border-0 shadow-lg flex-1">
                <CardContent className="p-6">
                  <ol className="space-y-2">
                    {exitOrder.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-sky text-white text-sm flex items-center justify-center font-semibold shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                    {t('forHoppere.hoppfeltbrief.exitOrderNote')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('forHoppere.hoppfeltbrief.proceduresTitle')}</h3>
              <Card className="border-0 shadow-lg flex-1">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.hoppfeltbrief.boarding.title')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {boardingRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.hoppfeltbrief.inAircraft.title')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {inAircraftRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.hoppfeltbrief.landingPattern.title')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {landingPatternRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.hoppfeltbrief.outlanding.title')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {outlandingRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
