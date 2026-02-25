import type { Metadata } from "next";
import { KursContent } from "./KursContent";
import { kursFAQSchema } from "@/lib/faqSchema";

export const metadata: Metadata = {
  title: "Kurs | Lær å hoppe fallskjerm",
  description:
    "Bli selvstendig fallskjermhopper med vårt AFF grunnkurs. Profesjonelle instruktører, moderne utstyr og et fantastisk læringsmiljø ved Tønsberg Flyplass.",
  alternates: { canonical: "https://skydivetonsberg.no/kurs" },
  openGraph: {
    title: "Fallskjermkurs hos Skydive Tønsberg",
    description:
      "Bli selvstendig fallskjermhopper med vårt AFF grunnkurs. Profesjonelle instruktører og moderne utstyr.",
    url: "https://skydivetonsberg.no/kurs",
    images: [{ url: "/og-kurs.jpg", width: 1200, height: 630, alt: "AFF Grunnkurs hos Skydive Tønsberg" }],
  },
};

export default function KursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kursFAQSchema) }}
      />
      <KursContent />
    </>
  );
}
