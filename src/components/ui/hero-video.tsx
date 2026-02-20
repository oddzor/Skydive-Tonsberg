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
  const [src, setSrc] = useState(desktopSrc);
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
    if (priority) {
      return;
    }
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
      video.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    };
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("loadeddata", handleCanPlayThrough);
    if (video.readyState >= 3) {
      handleCanPlayThrough();
    }
    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("loadeddata", handleCanPlayThrough);
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
      style={{ backgroundColor: "transparent" }}
    >
      {shouldLoad && <source src={src} type="video/webm" />}
    </video>
  );
}
