'use client';
import { motion } from 'framer-motion';
interface VideoEmbedProps {
  videoId?: string;
  title?: string;
  className?: string;
  noVideoMessage?: string;
}
export function VideoEmbed({ 
  videoId, 
  title = 'Video',
  className = '',
  noVideoMessage = 'No video configured.'
}: VideoEmbedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`max-w-5xl mx-auto ${className}`}
    >
      {videoId && (
        <div 
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black" 
          style={{ paddingBottom: '56.25%' }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={title}
          />
        </div>
      )}
      {!videoId && (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            {noVideoMessage}
          </p>
        </div>
      )}
    </motion.div>
  );
}
