"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, GraduationCap, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const getServices = (t: (key: string) => string) => [
  {
    title: t('home.services.tandem.title'),
    description: t('home.services.tandem.description'),
    image: "/service-tandem.webp",
    icon: Users,
    href: "https://bookings.burblesoft.eu/551/18",
    cta: t('home.services.tandem.cta'),
    external: true,
    gradient: "from-sky to-sky-dark",
  },
  {
    title: t('home.services.aff.title'),
    description: t('home.services.aff.description'),
    image: "/service-aff.webp",
    icon: GraduationCap,
    href: "/kurs",
    cta: t('home.services.aff.cta'),
    external: false,
    gradient: "from-leaf to-leaf-dark",
  },
  {
    title: t('home.services.experienced.title'),
    description: t('home.services.experienced.description'),
    image: "/service-experienced.webp",
    icon: Plane,
    href: "/for-hoppere",
    cta: t('home.services.experienced.cta'),
    external: false,
    gradient: "from-sky-dark to-leaf-dark",
  },
];

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
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const services = getServices(t);

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
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
                    <Button asChild variant="outline" className="group/btn">
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
                    <Button asChild variant="outline" className="group/btn">
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



