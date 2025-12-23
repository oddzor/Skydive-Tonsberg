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
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      // Only play once the video is fully loaded and ready
      video.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    };

    const handleLoadedData = () => {
      // Video has loaded enough to start playing
      setIsLoaded(true);
    };

    // Listen for when the video is ready to play through without buffering
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("loadeddata", handleLoadedData);

    // If video is already loaded (cached), play immediately
    if (video.readyState >= 3) {
      handleCanPlayThrough();
    }

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      poster={poster}
      className={className}
      preload={priority ? "auto" : "metadata"}
      style={{
        // Ensure poster is visible until video loads
        backgroundColor: "transparent",
      }}
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



