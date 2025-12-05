"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Hjem", href: "/" },
  { name: "Tandem", href: "/tandem" },
  { name: "Kurs", href: "/kurs" },
  { name: "For Hoppere", href: "/for-hoppere" },
  { name: "Kontakt", href: "/kontakt" },
];

const externalLinks = [
  { name: "Hoppkalender", href: "https://www.skydivetonsberg.no/hoppkalender-1", external: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileLogo, setShowMobileLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Hide logo on mobile homepage until scrolled past hero logo (approx 600px)
      if (window.location.pathname === '/') {
        setShowMobileLogo(window.scrollY > 600);
      } else {
        setShowMobileLogo(true);
      }
    };
    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative transition-opacity duration-300",
                !showMobileLogo && "md:opacity-100 opacity-0"
              )}
            >
              <Image
                src="/Skydive_Tonsberg_hero_header.png"
                alt="Skydive Tønsberg"
                width={1000}
                height={246}
                className="h-10 sm:h-12 w-auto"
                priority
                quality={100}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
            
            {externalLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-6 shadow-lg shadow-sky/25"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Tandemhopp
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Åpne meny</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <SheetTitle className="sr-only">Navigasjonsmeny</SheetTitle>
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
                      Eksterne lenker
                    </p>
                    <div className="space-y-1">
                      {externalLinks.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navigation.length + index) * 0.1 }}
                        >
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                          >
                            {item.name}
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </nav>
                
                <div className="p-4 border-t">
                  <Button
                    asChild
                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-semibold shadow-lg"
                  >
                    <a
                      href="https://bookings.burblesoft.eu/551/18"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Tandemhopp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}

