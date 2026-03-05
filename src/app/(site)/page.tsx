import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
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

// Below-fold sections: SSR output unchanged, but client JS defers to a lazy
// chunk so the browser parses less JavaScript before the LCP paint.
const Services = dynamic(() =>
  import("@/components/sections/Services").then((m) => ({ default: m.Services }))
);
const About = dynamic(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About }))
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ }))
);
const CTA = dynamic(() =>
  import("@/components/sections/CTA").then((m) => ({ default: m.CTA }))
);

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
