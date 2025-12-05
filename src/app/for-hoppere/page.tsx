import type { Metadata } from "next";
import { ForHoppereContent } from "./ForHoppereContent";

export const metadata: Metadata = {
  title: "For Hoppere | Gjesthopping og medlemskap",
  description:
    "Erfaren fallskjermhopper? Skydive Tønsberg ønsker deg velkommen til gjesthopping. Aktivt hoppmiljø, moderne fly og fantastiske forhold ved Tønsberg Flyplass.",
  openGraph: {
    title: "For erfarne hoppere hos Skydive Tønsberg",
    description:
      "Gjesthopping, utstyrsleie og et aktivt hoppmiljø for sertifiserte fallskjermhoppere.",
    images: [
      {
        url: "/og-for-hoppere.jpg",
        width: 1200,
        height: 630,
        alt: "Fallskjermhoppere i formasjon over Vestfold",
      },
    ],
  },
};

export default function ForHopperePage() {
  return <ForHoppereContent />;
}






