import type { Metadata } from "next";
import { KontaktContent } from "./KontaktContent";

export const metadata: Metadata = {
  title: "Kontakt | Ta kontakt med oss",
  description:
    "Har du spørsmål om fallskjermhopping? Kontakt Skydive Tønsberg for informasjon om tandemhopp, kurs eller gjesthopping. Vi hjelper deg gjerne!",
  openGraph: {
    title: "Kontakt Skydive Tønsberg",
    description:
      "Har du spørsmål om fallskjermhopping? Vi hjelper deg gjerne med informasjon om tandemhopp, kurs eller gjesthopping.",
    images: [
      {
        url: "/og-kontakt.jpg",
        width: 1200,
        height: 630,
        alt: "Kontakt Skydive Tønsberg",
      },
    ],
  },
};

export default function KontaktPage() {
  return <KontaktContent />;
}













