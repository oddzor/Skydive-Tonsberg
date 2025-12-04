"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { Users, Award, Shield, Heart } from "lucide-react";

// Club founded in September 1981
const FOUNDING_YEAR = 1981;
const FOUNDING_MONTH = 9; // September

function calculateYearsOfExperience(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed
  
  // If we haven't reached September yet this year, subtract 1
  if (currentMonth < FOUNDING_MONTH) {
    return currentYear - FOUNDING_YEAR - 1;
  }
  return currentYear - FOUNDING_YEAR;
}

const getStats = () => [
  { label: "Aktive medlemmer", value: "400+", icon: Users },
  { label: "År med erfaring", value: `${calculateYearsOfExperience()}+`, icon: Award },
  { label: "Sikre hopp årlig", value: "20 000+", icon: Shield },
  { label: "Fornøyde hoppere", value: "100%", icon: Heart },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stats = useMemo(() => getStats(), []);

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
          {/* Content */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Om oss
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Din port til{" "}
              <span className="text-gradient">himmelen</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Skydive Tønsberg er en av Norges mest etablerte og aktive 
              fallskjermklubber. Med base på Tønsberg Flyplass (Jarlsberg) 
              tilbyr vi alt fra tandemhopp for nybegynnere til avansert 
              trening for erfarne hoppere.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Vårt dedikerte team av instruktører og erfarne hoppere sørger for 
              at hver eneste opplevelse er trygg, spennende og minneverdig. 
              Bli med i vårt fellesskap og oppdag gleden ved fritt fall!
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
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

          {/* Image Grid */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/about-1.webp"
                    alt="Fallskjermhopper i fritt fall"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/about-2.webp"
                    alt="Tandemhopp over Vestfold"
                    fill
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
                    src="/about-3.webp"
                    alt="Fallskjerm under åpen himmel"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/about-4.webp"
                    alt="Klubbmedlemmer på bakken"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-sky/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-leaf/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}




