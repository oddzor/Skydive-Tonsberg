import type { Metadata } from "next";
import { ForHoppereContent } from "./ForHoppereContent";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { PAGE_FAQS_QUERY, FOR_HOPPERE_PRICING_QUERY, FOR_HOPPERE_INFO_QUERY, TANDEM_PRICING_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ, SanityForHopperePricing, SanityForHoppereInfo, SanityTandemPricing } from "@/sanity/types";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "For Jumpers",
      description:
        "Experienced skydiver? Skydive Tønsberg welcomes you for fun jumping. Active jump community, modern aircraft and great conditions at Tønsberg Airport.",
      alternates: { canonical: "https://skydivetonsberg.no/for-hoppere" },
      openGraph: {
        title: "For experienced jumpers at Skydive Tønsberg",
        description:
          "Fun jumping, equipment rental and an active skydiving community for licensed skydivers.",
        url: "https://skydivetonsberg.no/en/for-jumpers",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Skydivers in formation over Vestfold" }],
      },
    };
  }
  return {
    title: "For Hoppere",
    description:
      "Erfaren fallskjermhopper? Skydive Tønsberg ønsker deg velkommen til funjumping. Aktivt hoppmiljø, moderne fly og fantastiske forhold ved Tønsberg Flyplass.",
    alternates: { canonical: "https://skydivetonsberg.no/for-hoppere" },
    openGraph: {
      title: "For erfarne hoppere hos Skydive Tønsberg",
      description:
        "Funjumping, utstyrsleie og et aktivt hoppmiljø for sertifiserte fallskjermhoppere.",
      url: "https://skydivetonsberg.no/no/for-hoppere",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Fallskjermhoppere i formasjon over Vestfold" }],
    },
  };
}

export default async function ForHopperePage() {
  const [forHoppereFAQs, forHopperePricing, forHoppereInfo, tandemPricing] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "forHoppere" }, 'faqs.forHoppere'),
    safeFetch<SanityForHopperePricing>(FOR_HOPPERE_PRICING_QUERY, undefined, 'forHopperePricing'),
    safeFetch<SanityForHoppereInfo>(FOR_HOPPERE_INFO_QUERY, undefined, 'forHoppereInfo'),
    safeFetch<SanityTandemPricing>(TANDEM_PRICING_QUERY, undefined, 'tandemPricing'),
  ]);

  const faqSchema = forHoppereFAQs?.length
    ? buildFAQSchema(forHoppereFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <SanityDataProvider
      data={{
        faqs: forHoppereFAQs ?? [],
        tandemPricing: tandemPricing ?? null,
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
