import type { Metadata } from "next";
import { safeFetch } from "@/sanity/client";
import { ALL_FAQS_QUERY } from "@/sanity/queries";
import { buildFAQSchema, sanityFaqToSchema } from "@/lib/faqSchema";
import type { SanityFAQ } from "@/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Svar på de vanligste spørsmålene om tandemhopp, AFF-kurs og funjumping hos Skydive Tønsberg. Alt du trenger å vite før du hopper.",
  alternates: {
    canonical: "https://skydivetonsberg.no/faq",
  },
  openGraph: {
    title: "FAQ",
    description:
      "Svar på de vanligste spørsmålene om tandemhopp, AFF-kurs og funjumping hos Skydive Tønsberg.",
    url: "https://skydivetonsberg.no/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function FAQLayout({ children }: { children: React.ReactNode }) {
  const allFAQs = await safeFetch<SanityFAQ[]>(ALL_FAQS_QUERY, undefined, 'faqs.all');
  const allFAQSchema = allFAQs?.length
    ? buildFAQSchema(allFAQs.map(sanityFaqToSchema))
    : null;

  return (
    <>
      {allFAQSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(allFAQSchema) }}
        />
      )}
      {children}
    </>
  );
}
