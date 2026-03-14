import type { Metadata } from "next";
import { ForHoppereContent } from "./ForHoppereContent";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { PAGE_FAQS_QUERY, FOR_HOPPERE_PRICING_QUERY, FOR_HOPPERE_INFO_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ, SanityForHopperePricing, SanityForHoppereInfo } from "@/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skydive Tønsberg | For Hoppere",
  description:
    "Erfaren fallskjermhopper? Skydive Tønsberg ønsker deg velkommen til funjumping. Aktivt hoppmiljø, moderne fly og fantastiske forhold ved Tønsberg Flyplass.",
  alternates: { canonical: "https://skydivetonsberg.no/for-hoppere" },
  openGraph: {
    title: "For erfarne hoppere hos Skydive Tønsberg",
    description:
      "Funjumping, utstyrsleie og et aktivt hoppmiljø for sertifiserte fallskjermhoppere.",
    url: "https://skydivetonsberg.no/for-hoppere",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Fallskjermhoppere i formasjon over Vestfold" }],
  },
};

export default async function ForHopperePage() {
  const [forHoppereFAQs, forHopperePricing, forHoppereInfo] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "forHoppere" }),
    safeFetch<SanityForHopperePricing>(FOR_HOPPERE_PRICING_QUERY),
    safeFetch<SanityForHoppereInfo>(FOR_HOPPERE_INFO_QUERY),
  ]);

  const faqSchema = forHoppereFAQs?.length
    ? buildFAQSchema(forHoppereFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <SanityDataProvider
      data={{
        faqs: forHoppereFAQs ?? [],
        tandemPricing: null,
        kursPricing: null,
        forHopperePricing: forHopperePricing ?? null,
        courseInfo: null,
        tandemInfo: null,
        generalContent: null,
        landingPage: null,
        forHoppereInfo: forHoppereInfo ?? null,
      }}
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ForHoppereContent />
    </SanityDataProvider>
  );
}
