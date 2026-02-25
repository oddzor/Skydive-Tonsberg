import type { Metadata } from "next";
import { TandemContent } from "./TandemContent";
import { tandemFAQSchema } from "@/lib/faqSchema";

export const metadata: Metadata = {
  title: "Tandemhopp | Opplev fritt fall | Skydive Tønsberg",
  description:
    "Book tandemhopp hos Skydive Tønsberg - desidert nærmest Oslo! Hopp fra 4000 meter med ca. 40 sekunder fritt fall. Fra kun 4690 kr inkl. alt.",
  alternates: { canonical: "https://skydivetonsberg.no/tandem" },
  openGraph: {
    title: "Tandemhopp | Skydive Tønsberg",
    description:
      "Opplev fritt fall fra 4000 meter med vakker utsikt over Oslofjorden. Book ditt tandemhopp i dag!",
    url: "https://skydivetonsberg.no/tandem",
    images: [{ url: "/og-tandem.jpg", width: 1200, height: 630, alt: "Tandemhopp hos Skydive Tønsberg" }],
  },
};

export default function TandemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tandemFAQSchema) }}
      />
      <TandemContent />
    </>
  );
}
