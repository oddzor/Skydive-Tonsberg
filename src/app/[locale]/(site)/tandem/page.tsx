import type { Metadata } from "next";
import { TandemContent } from "./TandemContent";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { PAGE_FAQS_QUERY, TANDEM_INFO_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ, SanityTandemInfo } from "@/sanity/types";

export const revalidate = 3600;

const tandemSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tandemhopp",
  description:
    "Opplev fritt fall fra 4000 meter med vakker utsikt over Oslofjorden. Ca. 40 sekunder fritt fall med profesjonell instruktør. Nærmest Oslo.",
  brand: { "@type": "Brand", name: "Skydive Tønsberg" },
  url: "https://skydivetonsberg.no/tandem",
  offers: {
    "@type": "Offer",
    price: 4690,
    priceCurrency: "NOK",
    availability: "https://schema.org/InStock",
    url: "https://skydivetonsberg.no/tandem",
    seller: { "@type": "Organization", name: "Skydive Tønsberg" },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "Tandem Skydive near Oslo",
      description:
        "Book a tandem skydive at Skydive Tønsberg – closest to Oslo! Jump from 4000 metres with approx. 40 seconds of freefall. From only 4690 NOK, everything included.",
      alternates: { canonical: "https://skydivetonsberg.no/tandem" },
      openGraph: {
        title: "Tandem Skydive near Oslo",
        description:
          "Experience freefall from 4000 metres with stunning views over the Oslofjord. Book your tandem skydive today!",
        url: "https://skydivetonsberg.no/en/tandem",
        images: [{ url: "/og-tandem.jpg", width: 1200, height: 630, alt: "Tandem skydive at Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "Tandemhopp nær Oslo",
    description:
      "Book tandemhopp hos Skydive Tønsberg – desidert nærmest Oslo! Hopp fra 4000 meter med ca. 40 sekunder fritt fall. Fra kun 4690 kr inkl. alt.",
    alternates: { canonical: "https://skydivetonsberg.no/tandem" },
    openGraph: {
      title: "Tandemhopp nær Oslo",
      description:
        "Opplev fritt fall fra 4000 meter med vakker utsikt over Oslofjorden. Book ditt tandemhopp i dag!",
      url: "https://skydivetonsberg.no/no/tandem",
      images: [{ url: "/og-tandem.jpg", width: 1200, height: 630, alt: "Tandemhopp hos Skydive Tønsberg" }],
    },
  };
}

export default async function TandemPage() {
  const [tandemFAQs, tandemInfo] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "tandem" }, 'faqs.tandem'),
    safeFetch<SanityTandemInfo>(TANDEM_INFO_QUERY, undefined, 'tandemInfo'),
  ]);

  const faqSchema = tandemFAQs?.length
    ? buildFAQSchema(tandemFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <SanityDataProvider
      data={{
        faqs: tandemFAQs ?? [],
        tandemPricing: null,
        kursPricing: null,
        forHopperePricing: null,
        courseInfo: null,
        tandemInfo: tandemInfo ?? null,
        generalContent: null,
        landingPage: null,
        forHoppereInfo: null,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tandemSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <TandemContent />
    </SanityDataProvider>
  );
}
