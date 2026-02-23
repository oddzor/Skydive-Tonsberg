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

/** Reliable flag image that works on every browser / OS (no emoji rendering needed). */
function FlagImg({ code, alt }: { code: string; alt: string }) {
  return (
    <Image
      src={`https://flagcdn.com/48x36/${code}.png`}
      width={24}
      height={18}
      alt={alt}
      className="rounded-sm object-cover"
      unoptimized
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showDesktopHeader, setShowDesktopHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.tandem"), href: "/tandem" },
    { name: t("nav.courses"), href: "/kurs" },
    { name: t("nav.contact"), href: "/kontakt" },
  ];
  const rightNavigation = [
    { name: t("nav.forJumpers"), href: "/for-hoppere", external: false },
    { name: t("nav.faq"), href: "/faq", external: false },
    {
      name: t("nav.jumpCalendar"),
      href: "https://www.skydivetonsberg.no/hoppkalender-1",
      external: true,
    },
  ];

  // Desktop-only: hide header on homepage until user scrolls past the hero.
  useEffect(() => {
    const update = () => {
      const isHome = window.location.pathname === "/";
      const isDesktop = window.innerWidth >= 1024;
      if (isHome && isDesktop) {
        const threshold = window.innerHeight * 0.9;
        setShowDesktopHeader(window.scrollY > threshold);
        setScrolled(window.scrollY > threshold + 50);
      } else {
        setShowDesktopHeader(true);
        setScrolled(true);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Which flag to show (flag of the language we'll switch TO).
  const targetFlagCode = language === "no" ? "gb" : "no";
  const targetFlagAlt = language === "no" ? "English" : "Norsk";

  const mobileNavContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Image
          src="/Skydive_Tonsberg_hero_header.png"
          alt="Skydive Tønsberg"
          width={600}
          height={148}
          className="h-8 w-auto"
          priority
          quality={100}
        />
      </div>
      <nav className="flex-1 overflow-auto py-6 px-4">
        <div className="space-y-1">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
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
            {t("nav.externalLinks")}
          </p>
          <div className="space-y-1">
            {rightNavigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navigation.length + index) * 0.08 }}
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
          <FlagImg code={targetFlagCode} alt={targetFlagAlt} />
          <span>
            {language === "no" ? t("nav.switchToEnglish") : t("nav.switchToNorwegian")}
          </span>
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
            {t("nav.bookTandem")}
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/*
       * ── MOBILE HAMBURGER ───────────────────────────────────────────────────
       * A standalone fixed element (no Framer Motion transform parent) so the
       * button is always anchored to the viewport top-right corner regardless
       * of scroll position. No background bar — the button floats transparently
       * over the page; the white slide-out panel only appears when opened.
       */}
      <div className="fixed top-3 right-3 z-50 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 hover:text-white"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t("nav.openMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 p-0">
            <SheetTitle className="sr-only">{t("nav.navigationMenu")}</SheetTitle>
            {mobileNavContent}
          </SheetContent>
        </Sheet>
      </div>

      {/*
       * ── DESKTOP HEADER ─────────────────────────────────────────────────────
       * Slides in after the user scrolls past the hero on the homepage; always
       * visible on every other page.
       */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showDesktopHeader ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300 bg-transparent",
          scrolled &&
            "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/Skydive_Tonsberg_hero_header.png"
                  alt="Skydive Tønsberg"
                  width={1000}
                  height={246}
                  className="h-11 w-auto"
                  priority
                  quality={100}
                />
              </motion.div>
            </Link>

            {/* Centre nav links */}
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
              {rightNavigation.map((item) =>
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
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === "no" ? "en" : "no")}
                className="flex items-center gap-2 px-3"
                title={
                  language === "no"
                    ? t("nav.switchToEnglish")
                    : t("nav.switchToNorwegian")
                }
              >
                <FlagImg code={targetFlagCode} alt={targetFlagAlt} />
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
                  {t("nav.bookTandem")}
                </a>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
