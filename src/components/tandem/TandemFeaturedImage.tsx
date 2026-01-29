'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCMSContent } from '@/hooks/useCMSContent';
export function TandemFeaturedImage() {
  const { content } = useCMSContent();
  return (
    <section className="py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src={content?.tandem?.images?.heroPhoto || '/tandem-hero-photo.webp'}
            alt="Tandem Skydiving Experience"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
