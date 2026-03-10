import type { Metadata } from "next";
import { KursContent } from "./KursContent";
import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { PAGE_FAQS_QUERY, COURSE_INFO_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ, SanityCourseInfo } from "@/sanity/types";

export const revalidate = 3600;

const kursSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AFF Grunnkurs",
  description:
    "Bli selvstendig fallskjermhopper med AFF-metoden (Accelerated Freefall). 8 progressjonsnivåer fra tandemhopp til solo. Inkluderer teori, vindtunneltrening og veiledede hopp ved Jarlsberg Flyplass nær Oslo.",
  provider: {
    "@type": "Organization",
    name: "Skydive Tønsberg",
    url: "https://skydivetonsberg.no",
  },
  url: "https://skydivetonsberg.no/kurs",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      name: "Jarlsberg Flyplass",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jarlsberg Flyplass",
        addressLocality: "Tønsberg",
        addressRegion: "Vestfold",
        postalCode: "3145",
        addressCountry: "NO",
      },
    },
  },
  offers: {
    "@type": "Offer",
    price: 18990,
    priceCurrency: "NOK",
    availability: "https://schema.org/InStock",
    url: "https://skydivetonsberg.no/kurs",
    seller: { "@type": "Organization", name: "Skydive Tønsberg" },
  },
};

export const metadata: Metadata = {
  title: "AFF Grunnkurs | Lær å hoppe fallskjerm | Skydive Tønsberg",
  description:
    "Bli selvstendig fallskjermhopper med AFF grunnkurs hos Skydive Tønsberg. Profesjonelle instruktører, moderne utstyr og 8 progressjonsnivåer ved Jarlsberg Flyplass nær Oslo.",
  alternates: { canonical: "https://skydivetonsberg.no/kurs" },
  openGraph: {
    title: "AFF Grunnkurs | Skydive Tønsberg",
    description:
      "Bli selvstendig fallskjermhopper med AFF grunnkurs. Profesjonelle instruktører og moderne utstyr nær Oslo.",
    url: "https://skydivetonsberg.no/kurs",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AFF Grunnkurs hos Skydive Tønsberg" }],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kursSchema) }}
      />
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
