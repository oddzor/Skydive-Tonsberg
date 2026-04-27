import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import {
  PAGE_FAQS_QUERY,
  TANDEM_PRICING_QUERY,
  FOR_HOPPERE_PRICING_QUERY,
  LANDING_PAGE_QUERY,
  GENERAL_CONTENT_QUERY,
} from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type {
  SanityFAQ,
  SanityTandemPricing,
  SanityForHopperePricing,
  SanityLandingPage,
  SanityGeneralContent,
} from "@/sanity/types";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "Skydiving near Oslo",
      description:
        "Experience the thrill of skydiving at Skydive Tønsberg – closest to Oslo! Tandem skydives, AFF courses and fun jumping at Jarlsberg Airport in Vestfold.",
      openGraph: {
        title: "Skydiving near Oslo",
        description:
          "Experience the thrill of skydiving at Skydive Tønsberg – closest to Oslo!",
        url: "https://skydivetonsberg.no/en/home",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Skydiving at Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "Fallskjermhopping nær Oslo",
    description:
      "Opplev spenningen ved fallskjermhopping hos Skydive Tønsberg – nærmest Oslo! Tandemhopp, AFF-kurs og funjumping ved Jarlsberg Flyplass i Vestfold.",
    openGraph: {
      title: "Fallskjermhopping nær Oslo",
      description:
        "Opplev spenningen ved fallskjermhopping hos Skydive Tønsberg – nærmest Oslo!",
      url: "https://skydivetonsberg.no/no/hjem",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Fallskjermhopping hos Skydive Tønsberg" }],
    },
  };
}

export default async function Home() {
  const [homeFAQs, tandemPricing, forHopperePricing, landingPage, generalContent] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "home" }, 'faqs.home'),
    safeFetch<SanityTandemPricing>(TANDEM_PRICING_QUERY, undefined, 'tandemPricing'),
    safeFetch<SanityForHopperePricing>(FOR_HOPPERE_PRICING_QUERY, undefined, 'forHopperePricing'),
    safeFetch<SanityLandingPage>(LANDING_PAGE_QUERY, undefined, 'landingPage'),
    safeFetch<SanityGeneralContent>(GENERAL_CONTENT_QUERY, undefined, 'generalContent'),
  ]);

  const faqSchema = homeFAQs?.length
    ? buildFAQSchema(homeFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <>
    <link rel="preload" as="image" href="/hero-poster.webp" fetchPriority="high" type="image/webp" />
    <SanityDataProvider
      data={{
        faqs: homeFAQs ?? [],
        tandemPricing: tandemPricing ?? null,
        forHopperePricing: forHopperePricing ?? null,
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
    </>
  );
}
