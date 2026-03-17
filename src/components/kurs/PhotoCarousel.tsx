'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'framer-motion';
import Image from 'next/image';

export interface Photo {
  src: string;
  alt: string;
  objectPosition?: string;
}

export type CarouselAnimation = 'slide' | 'fade' | 'zoom';

const ANIMATION_VARIANTS: Record<
  CarouselAnimation,
  { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition; transition: Transition }
> = {
  slide: {
    initial:    { opacity: 0, x: 60 },
    animate:    { opacity: 1, x: 0 },
    exit:       { opacity: 0, x: -60 },
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  fade: {
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    exit:       { opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  zoom: {
    initial:    { opacity: 0, scale: 1.08 },
    animate:    { opacity: 1, scale: 1 },
    exit:       { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export interface PhotoCarouselProps {
  photos: Photo[];
  height?: number;
  columns?: 2 | 3;
  animation?: CarouselAnimation;
  className?: string;
}

export function PhotoCarousel({
  photos,
  height = 300,
  columns = 3,
  animation = 'slide',
  className = '',
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const variants = ANIMATION_VARIANTS[animation];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const heightStyle = { height: `${height}px` };
  const desktopCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <div className={className}>
      <div className="md:hidden">
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-muted" style={heightStyle}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={variants.transition}
              className="absolute inset-0"
            >
              <Image
                src={photos[index].src}
                alt={photos[index].alt}
                fill
                className="object-cover"
                style={{ objectPosition: photos[index].objectPosition ?? 'top' }}
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Vis bilde ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`hidden md:grid ${desktopCols} gap-6`}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-xl bg-muted"
            style={heightStyle}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              style={{ objectPosition: photo.objectPosition ?? 'top' }}
              priority
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
