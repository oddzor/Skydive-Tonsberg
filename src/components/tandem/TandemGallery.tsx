'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { SectionHeader } from '@/components/shared';
import { PhotoCarousel } from '@/components/kurs/PhotoCarousel';
function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function TandemGallery() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('tandem.gallery.title') || 'Tandem Gallery'}
          description={t('tandem.gallery.description') || 'See the amazing views and experience'}
        />
        <PhotoCarousel
          className="md:hidden"
          animation="zoom"
          height={400}
          photos={[
            { src: content?.tandem?.images?.galleryWide1 || '/tandem-gallery-wide-1.webp', alt: pickAlt(content?.tandem?.images?.galleryWide1AltNo, content?.tandem?.images?.galleryWide1AltEn, 'Tandem Skydiving View', language) },
            { src: content?.tandem?.images?.galleryRect1 || '/tandem-gallery-rect-1.webp', alt: pickAlt(content?.tandem?.images?.galleryRect1AltNo, content?.tandem?.images?.galleryRect1AltEn, 'Tandem Jump Preparation', language) },
            { src: content?.tandem?.images?.galleryRect2 || '/tandem-gallery-rect-2.webp', alt: pickAlt(content?.tandem?.images?.galleryRect2AltNo, content?.tandem?.images?.galleryRect2AltEn, 'In Freefall', language) },
            { src: content?.tandem?.images?.gallerySquare1 || '/tandem-gallery-square-1.webp', alt: pickAlt(content?.tandem?.images?.gallerySquare1AltNo, content?.tandem?.images?.gallerySquare1AltEn, 'Happy Tandem Student', language) },
            { src: content?.tandem?.images?.gallerySquare2 || '/tandem-gallery-square-2.webp', alt: pickAlt(content?.tandem?.images?.gallerySquare2AltNo, content?.tandem?.images?.gallerySquare2AltEn, 'Canopy Flight', language) },
            { src: content?.tandem?.images?.gallerySquare3 || '/tandem-gallery-square-3.webp', alt: pickAlt(content?.tandem?.images?.gallerySquare3AltNo, content?.tandem?.images?.gallerySquare3AltEn, 'Landing', language) },
          ]}
        />

        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            <Image
              src={content?.tandem?.images?.galleryWide1 || '/tandem-gallery-wide-1.webp'}
              alt={pickAlt(content?.tandem?.images?.galleryWide1AltNo, content?.tandem?.images?.galleryWide1AltEn, 'Tandem Skydiving View', language)}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 90vw, 1200px"
              quality={90}
              priority
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={content?.tandem?.images?.galleryRect1 || '/tandem-gallery-rect-1.webp'}
                alt={pickAlt(content?.tandem?.images?.galleryRect1AltNo, content?.tandem?.images?.galleryRect1AltEn, 'Tandem Jump Preparation', language)}
                fill
                className="object-cover"
                sizes="50vw"
                quality={90}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={content?.tandem?.images?.galleryRect2 || '/tandem-gallery-rect-2.webp'}
                alt={pickAlt(content?.tandem?.images?.galleryRect2AltNo, content?.tandem?.images?.galleryRect2AltEn, 'In Freefall', language)}
                fill
                className="object-cover"
                sizes="50vw"
                quality={90}
              />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={content?.tandem?.images?.gallerySquare1 || '/tandem-gallery-square-1.webp'}
                alt={pickAlt(content?.tandem?.images?.gallerySquare1AltNo, content?.tandem?.images?.gallerySquare1AltEn, 'Happy Tandem Student', language)}
                fill
                className="object-cover"
                sizes="33vw"
                quality={90}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={content?.tandem?.images?.gallerySquare2 || '/tandem-gallery-square-2.webp'}
                alt={pickAlt(content?.tandem?.images?.gallerySquare2AltNo, content?.tandem?.images?.gallerySquare2AltEn, 'Canopy Flight', language)}
                fill
                className="object-cover"
                sizes="33vw"
                quality={90}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={content?.tandem?.images?.gallerySquare3 || '/tandem-gallery-square-3.webp'}
                alt={pickAlt(content?.tandem?.images?.gallerySquare3AltNo, content?.tandem?.images?.gallerySquare3AltEn, 'Landing', language)}
                fill
                className="object-cover"
                sizes="33vw"
                quality={90}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
