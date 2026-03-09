"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { slugMap, toCanonical } from "@/lib/locale-href";
type Language = "no" | "en";
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Language;
}) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(initialLocale ?? "no");
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  useEffect(() => {
    if (initialLocale) {
      localStorage.setItem("language", initialLocale);
    }
  }, [initialLocale]);
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/translations/${language}.json`);
        const data = await response.json();
        setTranslations(data);
        setTranslationsLoaded(true);
      } catch {
        setTranslationsLoaded(true);
      }
    };
    loadTranslations();
  }, [language]);
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    const segments = pathname.split('/');
    if (segments.length >= 2 && (segments[1] === 'no' || segments[1] === 'en')) {
      const currentSlug = segments[2] ?? '';
      const canonical = toCanonical(currentSlug);
      const newSlug = slugMap[canonical]?.[lang] ?? currentSlug;
      segments[1] = lang;
      if (segments.length >= 3) segments[2] = newSlug;
      window.history.replaceState(null, '', segments.join('/') || '/');
    }
  };
  const t = (key: string): string => {
    if (!translationsLoaded) return "";
    const keys = key.split(".");
    let value: unknown = translations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
