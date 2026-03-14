"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, GraduationCap, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMSContent } from "@/hooks/useCMSContent";
import { CMSContent } from "@/hooks/useCMSContent.types";
function pickAlt(no: string | null | undefined, en: string | null | undefined, fallback: string, language: string): string {
  return (language === 'en' ? (en || no) : (no || en)) || fallback;
}
const getServices = (
  t: (key: string) => string,
  cmsContent: CMSContent | null,
  language: string,
) => {
  const cards = cmsContent?.home?.serviceCards;
  const imgs = cmsContent?.home?.images;
  const services = [
    {
      title: cards?.tandemTitle || t('home.services.tandem.title'),
      description: cards?.tandemDesc || t('home.services.tandem.description'),
      price: `${cmsContent?.pricing?.tandem?.weekday || 4690} kr`,
      image: imgs?.serviceTandem || "/service-tandem.webp",
      alt: pickAlt(imgs?.serviceTandemAltNo, imgs?.serviceTandemAltEn, t('home.services.tandem.title'), language),
      icon: Users,
      href: "/tandem",
      cta: t('home.services.tandem.cta'),
      external: false,
      gradient: "from-sky to-sky-dark",
      showPrice: true,
    },
    {
      title: cards?.affTitle || t('home.services.aff.title'),
      description: cards?.affDesc || t('home.services.aff.description'),
      price: `${cmsContent?.pricing?.kurs?.affCourse || 18990} kr`,
      image: imgs?.serviceAff || "/service-aff.webp",
      alt: pickAlt(imgs?.serviceAffAltNo, imgs?.serviceAffAltEn, t('home.services.aff.title'), language),
      icon: GraduationCap,
      href: "/kurs",
      cta: t('home.services.aff.cta'),
      external: false,
      gradient: "from-leaf to-leaf-dark",
      showPrice: true,
    },
    {
      title: cards?.experiencedTitle || t('home.services.experienced.title'),
      description: cards?.experiencedDesc || t('home.services.experienced.description'),
      image: imgs?.serviceExperienced || "/service-experienced.webp",
      alt: pickAlt(imgs?.serviceExperiencedAltNo, imgs?.serviceExperiencedAltEn, t('home.services.experienced.title'), language),
      icon: Plane,
      href: "/for-hoppere",
      cta: t('home.services.experienced.cta'),
      external: false,
      gradient: "from-sky-dark to-leaf-dark",
      showPrice: false,
    },
  ];
  return services;
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
export function Services() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const services = getServices(t, content, language);
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
            {t('home.services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('home.services.title')} <span className="text-gradient">{t('home.services.titleHighlight')}</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.href} variants={cardVariants}>
              <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm">
                      <service.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  {service.external ? (
                    <Button asChild className="bg-gradient-brand hover:opacity-90 text-white font-semibold group/btn">
                      <a
                        href={service.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="bg-gradient-brand hover:opacity-90 text-white font-semibold group/btn">
                      <Link href={service.href} className="flex items-center gap-2">
                        {service.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
