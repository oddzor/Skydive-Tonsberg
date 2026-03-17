"use client";
import { useState, useEffect, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale-href";

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
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [scrolled, setScrolled] = useState(false);
  const [showDesktopHeader, setShowDesktopHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const navigation = [
    { name: t("nav.home"), href: localePath(language, "hjem") },
    { name: t("nav.tandem"), href: localePath(language, "tandem") },
    { name: t("nav.courses"), href: localePath(language, "kurs") },
    { name: t("nav.contact"), href: localePath(language, "kontakt") },
  ];
  const rightNavigation = [
    { name: t("nav.forJumpers"), href: localePath(language, "for-hoppere"), external: false },
    { name: t("nav.faq"), href: localePath(language, "faq"), external: false },
    { name: t("nav.jumpCalendar"), href: localePath(language, "hoppkalender"), external: false },
  ];

  useEffect(() => {
    const update = () => {
      const p = window.location.pathname;
      const isHome = p === "/no/hjem" || p === "/en/home" || p === "/en/hjem";
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

  const targetFlagCode = language === "no" ? "gb" : "no";
  const targetFlagAlt = language === "no" ? "English" : "Norsk";

  const mobileNavContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Image
          src="/Skydive_Tonsberg_hero_header.png"
          alt="Skydive Tønsberg"
          width={2048}
          height={510}
          className="h-8 w-auto"
          quality={75}
        />
      </div>
      <nav className="flex-1 overflow-auto py-6 px-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="my-6 border-t pt-6">
          <p className="px-4 text-sm font-medium text-muted-foreground mb-3">
            {t("nav.externalLinks")}
          </p>
          <div className="space-y-1">
            {rightNavigation.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
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
      <div className={cn("fixed top-3 right-3 z-[100] lg:hidden [transform:translateZ(0)]", mobileOpen && "hidden")}>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "backdrop-blur-sm transition-colors",
                scrolled
                  ? "bg-background/90 text-foreground hover:bg-background border border-border shadow-sm"
                  : "bg-black/30 text-white hover:bg-black/50 hover:text-white"
              )}
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

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden lg:block transition-transform duration-500 ease-out bg-transparent",
          !showDesktopHeader && "-translate-y-full",
          scrolled && "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href={localePath(language, "hjem")} className="flex items-center gap-3 group">
              <div className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <Image
                  src="/Skydive_Tonsberg_hero_header.png"
                  alt="Skydive Tønsberg"
                  width={2048}
                  height={510}
                  className="h-11 w-auto"
                  quality={75}
                />
              </div>
            </Link>

            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = mounted && pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors group",
                      active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 bg-gradient-brand transition-transform duration-300 origin-center",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
              <div className="w-px h-6 bg-border mx-2" />
              {rightNavigation.map((item) => {
                const active = mounted && pathname === item.href;
                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors group",
                      active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 bg-gradient-brand transition-transform duration-300 origin-center",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

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
      </header>
    </>
  );
}
