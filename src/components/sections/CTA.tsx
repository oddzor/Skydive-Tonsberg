"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
export function CTA() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta-background.webp"
          alt="Bakgrunn"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky/90 to-leaf/90" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      {}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
          >
            {t('home.cta.title')}{" "}
            <span className="underline decoration-4 underline-offset-8 decoration-white/50">
              {t('home.cta.titleHighlight')}
            </span>
            {t('home.cta.titleEnd')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            {t('home.cta.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-xl"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t('home.cta.bookTandem')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white font-semibold px-8 py-6 text-lg backdrop-blur-sm"
            >
              <Link href="/kontakt" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {t('home.cta.contactUs')}
              </Link>
            </Button>
          </motion.div>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-white/70"
          >
            <a
              href="https://www.skydivetonsberg.no/hoppkalender-1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              {t('home.cta.viewCalendar')}
            </a>
            <span className="text-white/30">•</span>
            <a
              href="https://store.burblesoft.com/?dz_id=551"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-sm"
            >
              {t('home.cta.visitShop')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
