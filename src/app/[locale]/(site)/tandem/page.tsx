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

export const metadata: Metadata = {
  title: "Tandemhopp nær Oslo | Fra 4690 kr | Skydive Tønsberg",
  description:
    "Book tandemhopp hos Skydive Tønsberg – desidert nærmest Oslo! Hopp fra 4000 meter med ca. 40 sekunder fritt fall. Fra kun 4690 kr inkl. alt.",
  alternates: { canonical: "https://skydivetonsberg.no/tandem" },
  openGraph: {
    title: "Tandemhopp nær Oslo | Skydive Tønsberg",
    description:
      "Opplev fritt fall fra 4000 meter med vakker utsikt over Oslofjorden. Book ditt tandemhopp i dag!",
    url: "https://skydivetonsberg.no/tandem",
    images: [{ url: "/tandem-gallery-wide-1.webp", alt: "Tandemhopp hos Skydive Tønsberg" }],
  },
};

export default async function TandemPage() {
  const [tandemFAQs, tandemInfo] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "tandem" }),
    safeFetch<SanityTandemInfo>(TANDEM_INFO_QUERY),
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
