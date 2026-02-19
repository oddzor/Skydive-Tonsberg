'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoEmbedProps {
  videoId?: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ 
  videoId, 
  title = 'Video',
  className = ''
}: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`max-w-5xl mx-auto ${className}`}
    >
      {videoId && (
        <div 
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer" 
          style={{ paddingBottom: '56.25%' }}
          onClick={() => setShowVideo(true)}
        >{!showVideo && (
            <div className="absolute inset-0 z-10">
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to standard quality if maxres not available
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                }}
              /><div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 rounded-full bg-sky hover:bg-sky/90 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          )}
          
          {/* Loading Skeleton - shown while iframe loads */}
          {showVideo && !isLoaded && (
            <div className="absolute inset-0 bg-linear-to-br from-muted to-muted/50 animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 border-4 border-sky/30 border-t-sky rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading video...</p>
              </div>
            </div>
          )}{showVideo && (
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
      )}
      {!videoId && (
        <div 
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-muted to-muted/50" 
          style={{ paddingBottom: '56.25%' }}
        >
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-sky/20 flex items-center justify-center">
                <Play className="w-10 h-10 text-sky/40" />
              </div>
              <div className="h-4 w-48 bg-muted-foreground/20 rounded" />
              <div className="h-3 w-32 bg-muted-foreground/10 rounded" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
