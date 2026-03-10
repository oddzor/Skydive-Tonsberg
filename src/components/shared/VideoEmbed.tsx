'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface VideoEmbedProps {
  videoId?: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({
  videoId,
  title = 'Video',
  className = '',
}: VideoEmbedProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const localThumb = videoId ? `/thumbnails/${videoId}.jpg` : null;
  const ytThumb    = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`max-w-5xl mx-auto ${className}`}
    >
      {videoId ? (
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
          style={{ paddingBottom: '56.25%' }}
        >
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-10"
                onClick={() => setShowVideo(true)}
              >
                {!thumbError ? (
                  <Image
                    src={localThumb!}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    onError={() => setThumbError(true)}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ytThumb!}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors cursor-pointer">
                  {showVideo ? (
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-sky hover:bg-sky/90 flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {showVideo && (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </div>
      ) : (
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
          style={{ paddingBottom: '56.25%' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-10 h-10 text-white/40 ml-1" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
