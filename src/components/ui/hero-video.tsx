"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
  className?: string;
  priority?: boolean;
}

export function HeroVideo({
  desktopSrc,
  mobileSrc,
  poster,
  className = "",
  priority = false,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    // If priority, load immediately
    if (priority) {
      setShouldLoad(true);
      return;
    }

    // Otherwise, use intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      className={className}
      preload={priority ? "auto" : "none"}
    >
      {shouldLoad && (
        <>
          {/* Mobile version (max-width: 768px) */}
          <source
            src={mobileSrc}
            type="video/webm"
            media="(max-width: 768px)"
          />
          {/* Desktop version */}
          <source
            src={desktopSrc}
            type="video/webm"
            media="(min-width: 769px)"
          />
          {/* Fallback for all */}
          <source src={desktopSrc} type="video/webm" />
        </>
      )}
    </video>
  );
}

