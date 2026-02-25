import type { Metadata } from "next";
import { ForHoppereContent } from "./ForHoppereContent";
import { forHoppereFAQSchema } from "@/lib/faqSchema";

export const metadata: Metadata = {
  title: "For Hoppere | Gjesthopping og medlemskap",
  description:
    "Erfaren fallskjermhopper? Skydive Tønsberg ønsker deg velkommen til gjesthopping. Aktivt hoppmiljø, moderne fly og fantastiske forhold ved Tønsberg Flyplass.",
  alternates: { canonical: "https://skydivetonsberg.no/for-hoppere" },
  openGraph: {
    title: "For erfarne hoppere hos Skydive Tønsberg",
    description:
      "Gjesthopping, utstyrsleie og et aktivt hoppmiljø for sertifiserte fallskjermhoppere.",
    url: "https://skydivetonsberg.no/for-hoppere",
    images: [{ url: "/og-for-hoppere.jpg", width: 1200, height: 630, alt: "Fallskjermhoppere i formasjon over Vestfold" }],
  },
};

export default function ForHopperePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forHoppereFAQSchema) }}
      />
      <ForHoppereContent />
    </>
  );
}
