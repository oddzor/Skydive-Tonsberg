import { Hero, About, Services, Testimonials, CTA, FAQ } from "@/components/sections";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import {
  PAGE_FAQS_QUERY,
  TANDEM_PRICING_QUERY,
  KURS_PRICING_QUERY,
  LANDING_PAGE_QUERY,
  GENERAL_CONTENT_QUERY,
} from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type {
  SanityFAQ,
  SanityTandemPricing,
  SanityKursPricing,
  SanityLandingPage,
  SanityGeneralContent,
} from "@/sanity/types";

export const revalidate = 3600;

export default async function Home() {
  const [homeFAQs, tandemPricing, kursPricing, landingPage, generalContent] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "home" }),
    safeFetch<SanityTandemPricing>(TANDEM_PRICING_QUERY),
    safeFetch<SanityKursPricing>(KURS_PRICING_QUERY),
    safeFetch<SanityLandingPage>(LANDING_PAGE_QUERY),
    safeFetch<SanityGeneralContent>(GENERAL_CONTENT_QUERY),
  ]);

  const faqSchema = homeFAQs?.length
    ? buildFAQSchema(homeFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <SanityDataProvider
      data={{
        faqs: homeFAQs ?? [],
        tandemPricing: tandemPricing ?? null,
        kursPricing: kursPricing ?? null,
        forHopperePricing: null,
        courseInfo: null,
        tandemInfo: null,
        generalContent: generalContent ?? null,
        landingPage: landingPage ?? null,
        forHoppereInfo: null,
      }}
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <FAQ />
      <CTA />
    </SanityDataProvider>
  );
}
