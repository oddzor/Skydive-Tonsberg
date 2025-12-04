"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  navigation: [
    { name: "Hjem", href: "/" },
    { name: "Kurs", href: "/kurs" },
    { name: "For Hoppere", href: "/for-hoppere" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  external: [
    { name: "Hoppkalender", href: "https://www.skydivetonsberg.no/hoppkalender-1" },
    { name: "Book Tandemhopp", href: "https://bookings.burblesoft.eu/551/18" },
    { name: "Nettbutikk", href: "https://store.burblesoft.com/?dz_id=551" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/skydivetonsberg", icon: Instagram },
    { name: "YouTube", href: "https://www.youtube.com/@skydivetnsberg9501", icon: Youtube },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Skydive Tønsberg"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Opplev frihet i fritt fall over vakre Vestfold. 
              Norges mest tilgjengelige fallskjermklubb med fokus på sikkerhet, 
              fellesskap og eventyr.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Sider</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* External Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Tjenester</h3>
            <ul className="space-y-3">
              {footerLinks.external.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-background transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-sky flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Tønsberg Flyplass<br />
                  Jarlsberg, Vestfold
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-leaf flex-shrink-0" />
                <a
                  href="mailto:post@skydivetonsberg.no"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  post@skydivetonsberg.no
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <Separator className="my-12 bg-background/10" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-background/50 text-sm"
        >
          <p>© {new Date().getFullYear()} Skydive Tønsberg. Alle rettigheter reservert.</p>
          <div className="flex gap-6">
            <Link href="/personvern" className="hover:text-background transition-colors">
              Personvern
            </Link>
            <Link href="/vilkar" className="hover:text-background transition-colors">
              Vilkår
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

