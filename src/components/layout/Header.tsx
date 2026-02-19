"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.tandem'), href: "/tandem" },
    { name: t('nav.courses'), href: "/kurs" },
    { name: t('nav.contact'), href: "/kontakt" },
  ];
  const rightNavigation = [
    { name: t('nav.forJumpers'), href: "/for-hoppere", external: false },
    { name: t('nav.faq'), href: "/faq", external: false },
    { name: t('nav.jumpCalendar'), href: "https://www.skydivetonsberg.no/hoppkalender-1", external: true },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const pathname = window.location.pathname;
      const isHome = pathname === '/';
      if (isHome) {
        const heroThreshold = window.innerHeight * 0.9;
        setShowHeader(window.scrollY > heroThreshold);
        setScrolled(window.scrollY > heroThreshold + 50);
      } else {
        setShowHeader(true);
        setScrolled(true);
      }
    };
    handleScroll(); 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent",
        scrolled && "lg:bg-background/95 lg:backdrop-blur-md lg:shadow-lg lg:border-b lg:border-border/50"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/Skydive_Tonsberg_hero_header.png"
                alt="Skydive Tønsberg"
                width={1000}
                height={246}
                className="h-11 sm:h-12 w-auto"
                priority
                quality={100}
              />
            </motion.div>
          </Link>

          <div className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-brand group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            {rightNavigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-brand group-hover:w-3/4 transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "no" ? "en" : "no")}
              className="flex items-center gap-2 px-3"
              title={language === "no" ? t('nav.switchToEnglish') : t('nav.switchToNorwegian')}
            >
              <span className="text-2xl">{language === "no" ? "🇬🇧" : "🇳🇴"}</span>
            </Button>
            <Button
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-6 shadow-lg shadow-sky/25"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('nav.bookTandem')}
              </a>
            </Button>
          </div>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 right-4 lg:relative lg:top-0 lg:right-0 z-50 bg-background/80 backdrop-blur-sm lg:bg-transparent"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t('nav.openMenu')}</span>
            </Button>
          </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <SheetTitle className="sr-only">{t('nav.navigationMenu')}</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Image
                    src="/logo.svg"
                    alt="Skydive Tønsberg"
                    width={140}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex-1 overflow-auto py-6 px-4">
                  <div className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="my-6 border-t pt-6">
                    <p className="px-4 text-sm font-medium text-muted-foreground mb-3">
                      {t('nav.externalLinks')}
                    </p>
                    <div className="space-y-1">
                      {rightNavigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navigation.length + index) * 0.1 }}
                        >
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                            >
                              {item.name}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </nav>
                <div className="p-4 border-t space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setLanguage(language === "no" ? "en" : "no");
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">{language === "no" ? "🇬🇧" : "🇳🇴"}</span>
                    <span>{language === "no" ? t('nav.switchToEnglish') : t('nav.switchToNorwegian')}</span>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-semibold shadow-lg"
                  >
                    <a
                      href="https://bookings.burblesoft.eu/551/18"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('nav.bookTandem')}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
      </nav>
    </motion.header>
  );
}
