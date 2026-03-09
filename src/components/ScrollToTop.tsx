"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { toCanonical } from "@/lib/locale-href";

export function ScrollToTop() {
  const pathname = usePathname();
  const prevRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = pathname;

    if (prev !== null) {
      const prevParts = prev.split('/').filter(Boolean);
      const nextParts = pathname.split('/').filter(Boolean);
      const locales = ['no', 'en'];
      if (
        prevParts.length === nextParts.length &&
        locales.includes(prevParts[0]) &&
        locales.includes(nextParts[0]) &&
        prevParts[0] !== nextParts[0] &&
        toCanonical(prevParts[1] ?? '') === toCanonical(nextParts[1] ?? '')
      ) {
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
