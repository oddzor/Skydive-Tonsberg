"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, MapPin, ExternalLink, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";


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
  const [showKeyhole, setShowKeyhole] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const footerLinks = {
    navigation: [
      { name: t('nav.home'), href: "/" },
      { name: t('nav.courses'), href: "/kurs" },
      { name: t('nav.forJumpers'), href: "/for-hoppere" },
      { name: t('nav.contact'), href: "/kontakt" },
    ],
    external: [
      { name: t('nav.jumpCalendar'), href: "https://www.skydivetonsberg.no/hoppkalender-1" },
      { name: t('nav.bookTandem'), href: "https://bookings.burblesoft.eu/551/18" },
      { name: t('nav.shop'), href: "https://store.burblesoft.com/?dz_id=551" },
    ],
    social: [
      { name: "Instagram", href: "https://instagram.com/skydivetonsberg", icon: Instagram },
      { name: "YouTube", href: "https://www.youtube.com/@skydivetnsberg9501", icon: Youtube },
    ],
  };

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
                src="/skydive-tonsberg-footer.png"
                alt="Skydive Tønsberg"
                width={1000}
                height={246}
                className="h-12 w-auto"
                quality={100}
              />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {t('footer.description')}
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
            <h3 className="text-lg font-semibold mb-6">{t('footer.pages')}</h3>
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
            <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
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
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-sky shrink-0" />
                <span className="text-background/70 text-sm">
                  Tønsberg Flyplass<br />
                  Jarlsberg, Vestfold
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-leaf shrink-0" />
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
          <div className="flex items-center gap-3">
            {/* Hidden keyhole button - click 3 times on the copyright text */}
            <button
              onClick={() => {
                const clicks = parseInt(sessionStorage.getItem("keyholeClicks") || "0") + 1;
                sessionStorage.setItem("keyholeClicks", clicks.toString());
                
                if (clicks >= 3) {
                  sessionStorage.removeItem("keyholeClicks");
                  router.push("/cms");
                } else if (clicks === 1) {
                  setShowKeyhole(true);
                  setTimeout(() => setShowKeyhole(false), 2000);
                }
              }}
              className="text-background/50 hover:text-background/70 transition-colors cursor-pointer relative"
              aria-label="CMS Access"
            >
              <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
              {showKeyhole && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2"
                >
                  <KeyRound className="w-4 h-4 text-leaf" />
                </motion.div>
              )}
            </button>
          </div>
          <div className="flex gap-6">
            <Link href="/personvern" className="hover:text-background transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/vilkar" className="hover:text-background transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

