import { MetadataRoute } from "next";
import { slugMap } from "@/lib/locale-href";

const baseUrl = "https://skydivetonsberg.no";
const locales = ["no", "en"] as const;

const routes: Array<{ canonical: keyof typeof slugMap; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }> = [
  { canonical: "hjem",        changeFrequency: "weekly",  priority: 1   },
  { canonical: "tandem",      changeFrequency: "monthly", priority: 0.9 },
  { canonical: "kurs",        changeFrequency: "monthly", priority: 0.9 },
  { canonical: "for-hoppere", changeFrequency: "monthly", priority: 0.8 },
  { canonical: "hoppkalender",changeFrequency: "weekly",  priority: 0.5 },
  { canonical: "faq",         changeFrequency: "monthly", priority: 0.7 },
  { canonical: "kontakt",     changeFrequency: "monthly", priority: 0.7 },
  { canonical: "personvern",  changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${baseUrl}/${locale}/${slugMap[route.canonical][locale]}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
