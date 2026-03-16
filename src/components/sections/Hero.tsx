"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/ui/hero-video";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale-href";

export function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroVideo
          desktopSrc="/herovideo-optimized.webm"
          mobileSrc="/herovideo-mobile.webm"
          poster="/hero-poster.webp"
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-linear-to-r from-sky/10 to-leaf/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 -mt-12 sm:-mt-16 md:-mt-20">
            <Image
              src="/Skydive_Tonsberg_hero_header.webp"
              alt="Skydive Tønsberg"
              width={2048}
              height={510}
              className="max-w-[min(1000px,85vw)] h-auto mx-auto drop-shadow-2xl"
              sizes="min(1000px, 85vw)"
              priority
              fetchPriority="high"
              quality={75}
            />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 hero-text-shadow leading-tight hero-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {t("home.hero.title")}{" "}
            <span className="text-gradient">{t("home.hero.titleHighlight")}</span>
            <br />
            {t("home.hero.titleEnd")}
          </h1>

          <p
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed hero-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t("home.hero.description")}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-slide-up"
            style={{ animationDelay: "0.55s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-sky/30"
            >
              <a href={localePath(language, "tandem")}>
                {t("home.hero.bookTandem")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-sky/30"
            >
              <a href={localePath(language, "kurs")}>
                {t("home.hero.bookCourse")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hero-fade-in"
        style={{ animationDelay: "1s" }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">{t("home.hero.scrollDown")}</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
