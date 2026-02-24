"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
type Language = "no" | "en";
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage === "no" || savedLanguage === "en") {
        return savedLanguage;
      }
    }
    return "no";
  });
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  useEffect(() => {
    setTranslationsLoaded(false);
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
