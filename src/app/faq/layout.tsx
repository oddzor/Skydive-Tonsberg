import type { Metadata } from "next";
import { allFAQSchema } from "@/lib/faqSchema";

export const metadata: Metadata = {
  title: "FAQ | Vanlige spørsmål om fallskjermhopping",
  description:
    "Svar på de vanligste spørsmålene om tandemhopp, AFF-kurs og gjesthopping hos Skydive Tønsberg. Alt du trenger å vite før du hopper.",
  alternates: {
    canonical: "https://skydivetonsberg.no/faq",
  },
  openGraph: {
    title: "FAQ | Skydive Tønsberg",
    description:
      "Svar på de vanligste spørsmålene om tandemhopp, AFF-kurs og gjesthopping hos Skydive Tønsberg.",
    url: "https://skydivetonsberg.no/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allFAQSchema) }}
      />
      {children}
    </>
  );
}
