import type { Metadata } from "next";
import { KursContent } from "./KursContent";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { PAGE_FAQS_QUERY, COURSE_INFO_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ, SanityCourseInfo } from "@/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kurs | Lær å hoppe fallskjerm",
  description:
    "Bli selvstendig fallskjermhopper med vårt AFF grunnkurs. Profesjonelle instruktører, moderne utstyr og et fantastisk læringsmiljø ved Tønsberg Flyplass.",
  alternates: { canonical: "https://skydivetonsberg.no/kurs" },
  openGraph: {
    title: "Fallskjermkurs hos Skydive Tønsberg",
    description:
      "Bli selvstendig fallskjermhopper med vårt AFF grunnkurs. Profesjonelle instruktører og moderne utstyr.",
    url: "https://skydivetonsberg.no/kurs",
    images: [{ url: "/og-kurs.jpg", width: 1200, height: 630, alt: "AFF Grunnkurs hos Skydive Tønsberg" }],
  },
};

export default async function KursPage() {
  const [kursFAQs, courseInfo] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "kurs" }),
    safeFetch<SanityCourseInfo>(COURSE_INFO_QUERY),
  ]);

  const faqSchema = kursFAQs?.length
    ? buildFAQSchema(kursFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <SanityDataProvider
      data={{
        faqs: kursFAQs ?? [],
        tandemPricing: null,
        kursPricing: null,
        forHopperePricing: null,
        courseInfo: courseInfo ?? null,
        tandemInfo: null,
        generalContent: null,
        landingPage: null,
        forHoppereInfo: null,
      }}
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <KursContent />
    </SanityDataProvider>
  );
}
