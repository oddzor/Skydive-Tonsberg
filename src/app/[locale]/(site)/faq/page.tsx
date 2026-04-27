import type { Metadata } from "next";

export const revalidate = 3600;
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { ALL_FAQS_QUERY, TANDEM_PRICING_QUERY, FOR_HOPPERE_PRICING_QUERY } from "@/sanity/queries";
import type { SanityFAQ, SanityTandemPricing, SanityForHopperePricing } from "@/sanity/types";
import { FAQPageContent } from "./FAQPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "FAQ",
      description:
        "Find answers to the most common questions about tandem skydiving, AFF courses and fun jumping at Skydive Tønsberg.",
      openGraph: {
        title: "FAQ",
        description: "Answers to the most common questions about skydiving at Skydive Tønsberg.",
        url: "https://skydivetonsberg.no/en/faq",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FAQ Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "FAQ",
    description:
      "Finn svar på de vanligste spørsmålene om tandemhopp, AFF-kurs og funjumping hos Skydive Tønsberg.",
    openGraph: {
      title: "FAQ",
      description: "Svar på de vanligste spørsmålene om fallskjermhopping hos Skydive Tønsberg.",
      url: "https://skydivetonsberg.no/no/faq",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FAQ Skydive Tønsberg" }],
    },
  };
}

export default async function FAQPage() {
  const [allFAQs, tandemPricing, forHopperePricing] = await Promise.all([
    safeFetch<SanityFAQ[]>(ALL_FAQS_QUERY, undefined, 'faqs.all'),
    safeFetch<SanityTandemPricing>(TANDEM_PRICING_QUERY, undefined, 'tandemPricing'),
    safeFetch<SanityForHopperePricing>(FOR_HOPPERE_PRICING_QUERY, undefined, 'forHopperePricing'),
  ]);

  return (
    <SanityDataProvider
      data={{ faqs: allFAQs ?? [], tandemPricing: tandemPricing ?? null, forHopperePricing: forHopperePricing ?? null, courseInfo: null, tandemInfo: null, generalContent: null, landingPage: null, forHoppereInfo: null }}
    >
      <FAQPageContent />
    </SanityDataProvider>
  );
}
