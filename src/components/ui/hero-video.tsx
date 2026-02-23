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

  const [src, setSrc] = useState<string | null>(null);
  const movSrc = src ? src.replace(".webm", ".mov") : null;
  useEffect(() => {
    const pick = () => {
      setSrc(window.matchMedia("(max-width: 768px)").matches ? mobileSrc : desktopSrc);
    };
    pick();
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [mobileSrc, desktopSrc]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !shouldLoad) return;
    video.load();
    video.play().catch(() => {});
  }, [src, shouldLoad]);

  useEffect(() => {
    if (priority) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setShouldLoad(true);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay
      poster={poster}
      className={className}
      preload={priority ? "auto" : "metadata"}
      style={{ backgroundColor: "transparent" }}
    >
      {shouldLoad && src && (
        <>
          <source src={src} type="video/webm" />
          {movSrc && <source src={movSrc} type="video/mp4" />}
        </>
      )}
    </video>
  );
}
