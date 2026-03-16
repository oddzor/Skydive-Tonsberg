"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { Users, Award, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMSContent } from "@/hooks/useCMSContent";
import { PhotoCarousel } from "@/components/kurs/PhotoCarousel";
const FOUNDING_YEAR = 1981;
const FOUNDING_MONTH = 9;
function calculateYearsOfExperience(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (currentMonth < FOUNDING_MONTH) {
    return currentYear - FOUNDING_YEAR - 1;
  }
  return currentYear - FOUNDING_YEAR;
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}

export function About() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = useMemo(() => [
    {
      id: 'members',
      label: t('home.about.stats.members') || 'Aktive medlemmer',
      value: content?.home?.statsMembersCount || "400+",
      icon: Users,
    },
    {
      id: 'experience',
      label: t('home.about.stats.experience') || 'År med erfaring',
      value: `${calculateYearsOfExperience()}+`,
      icon: Award,
    },
    {
      id: 'jumps',
      label: t('home.about.stats.jumps') || 'Sikre hopp årlig',
      value: content?.home?.statsJumpsCount || "20 000+",
      icon: Shield,
    },
    {
      id: 'satisfaction',
      label: t('home.about.stats.satisfaction') || 'Fornøyde hoppere',
      value: "100%",
      icon: Heart,
    },
  ], [t, content?.home]);

  const description1 = content?.home?.aboutDescription1 || t('home.about.description1');
  const description2 = content?.home?.aboutDescription2 || t('home.about.description2');

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >

          <motion.div variants={itemVariants} className="order-1 lg:order-1">
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t('home.about.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t('home.about.title')}{" "}
              <span className="text-gradient">{t('home.about.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {description1}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description2}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-gradient-brand text-white">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="order-2 lg:order-2 relative"
          >
            <PhotoCarousel
              className="md:hidden"
              animation="zoom"
              height={360}
              photos={[
                { src: content?.home?.images?.aboutGrid1 || "/wingsuit-trio.webp", alt: pickAlt(content?.home?.images?.aboutGrid1AltNo, content?.home?.images?.aboutGrid1AltEn, "Wingsuit trio i formasjon", language) },
                { src: content?.home?.images?.aboutGrid2 || "/tandem-landing.webp", alt: pickAlt(content?.home?.images?.aboutGrid2AltNo, content?.home?.images?.aboutGrid2AltEn, "Tandemhopp landing", language) },
                { src: content?.home?.images?.aboutGrid3 || "/aff-student-exit.webp", alt: pickAlt(content?.home?.images?.aboutGrid3AltNo, content?.home?.images?.aboutGrid3AltEn, "AFF elev uthopp", language) },
                { src: content?.home?.images?.aboutGrid4 || "/tandem-smiles.webp", alt: pickAlt(content?.home?.images?.aboutGrid4AltNo, content?.home?.images?.aboutGrid4AltEn, "Glade tandemhoppere", language) },
              ]}
            />

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={content?.home?.images?.aboutGrid1 || "/wingsuit-trio.webp"}
                    alt={pickAlt(content?.home?.images?.aboutGrid1AltNo, content?.home?.images?.aboutGrid1AltEn, "Wingsuit trio i formasjon", language)}
                    fill
                    sizes="(max-width: 1024px) 45vw, calc(25vw - 2rem)"
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={content?.home?.images?.aboutGrid2 || "/tandem-landing.webp"}
                    alt={pickAlt(content?.home?.images?.aboutGrid2AltNo, content?.home?.images?.aboutGrid2AltEn, "Tandemhopp landing", language)}
                    fill
                    sizes="(max-width: 1024px) 45vw, calc(25vw - 2rem)"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="pt-8 space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={content?.home?.images?.aboutGrid3 || "/aff-student-exit.webp"}
                    alt={pickAlt(content?.home?.images?.aboutGrid3AltNo, content?.home?.images?.aboutGrid3AltEn, "AFF elev uthopp", language)}
                    fill
                    sizes="(max-width: 1024px) 45vw, calc(25vw - 2rem)"
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={content?.home?.images?.aboutGrid4 || "/tandem-smiles.webp"}
                    alt={pickAlt(content?.home?.images?.aboutGrid4AltNo, content?.home?.images?.aboutGrid4AltEn, "Glade tandemhoppere", language)}
                    fill
                    sizes="(max-width: 1024px) 45vw, calc(25vw - 2rem)"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-sky/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-leaf/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
