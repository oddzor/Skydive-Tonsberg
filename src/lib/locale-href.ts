type Locale = 'no' | 'en';

export const slugMap: Record<string, Record<Locale, string>> = {
  'hjem':         { no: 'hjem',         en: 'home' },
  'kurs':         { no: 'kurs',         en: 'course' },
  'tandem':       { no: 'tandem',       en: 'tandem' },
  'for-hoppere':  { no: 'for-hoppere',  en: 'for-jumpers' },
  'kontakt':      { no: 'kontakt',      en: 'contact' },
  'faq':          { no: 'faq',          en: 'faq' },
  'hoppkalender': { no: 'hoppkalender', en: 'jumpcalendar' },
  'personvern':   { no: 'personvern',   en: 'privacy' },
};

export function toCanonical(slug: string): string {
  for (const [canonical, locales] of Object.entries(slugMap)) {
    if (Object.values(locales).includes(slug)) return canonical;
  }
  return slug;
}

export function localePath(locale: string, canonical: string): string {
  const slug = slugMap[canonical]?.[locale as Locale] ?? canonical;
  return `/${locale}/${slug}`;
}
