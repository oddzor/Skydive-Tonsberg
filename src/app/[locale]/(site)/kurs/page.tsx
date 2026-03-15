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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "AFF Skydiving Course",
      description:
        "Become an independent skydiver with the AFF course at Skydive Tønsberg. Professional instructors, modern equipment and 8 progression levels at Jarlsberg Airport near Oslo.",
      alternates: { canonical: "https://skydivetonsberg.no/kurs" },
      openGraph: {
        title: "AFF Skydiving Course",
        description:
          "Become an independent skydiver with the AFF course. Professional instructors and modern equipment near Oslo.",
        url: "https://skydivetonsberg.no/en/course",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AFF Skydiving Course at Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "AFF Grunnkurs",
    description:
      "Bli selvstendig fallskjermhopper med AFF grunnkurs hos Skydive Tønsberg. Profesjonelle instruktører, moderne utstyr og 8 progressjonsnivåer ved Jarlsberg Flyplass nær Oslo.",
    alternates: { canonical: "https://skydivetonsberg.no/kurs" },
    openGraph: {
      title: "AFF Grunnkurs",
      description:
        "Bli selvstendig fallskjermhopper med AFF grunnkurs. Profesjonelle instruktører og moderne utstyr nær Oslo.",
      url: "https://skydivetonsberg.no/no/kurs",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AFF Grunnkurs hos Skydive Tønsberg" }],
    },
  };
}

export default async function KursPage() {
  const [kursFAQs, courseInfo] = await Promise.all([
    safeFetch<SanityFAQ[]>(PAGE_FAQS_QUERY, { page: "kurs" }, 'faqs.kurs'),
    safeFetch<SanityCourseInfo>(COURSE_INFO_QUERY, undefined, 'courseInfo'),
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
