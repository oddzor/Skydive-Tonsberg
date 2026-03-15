import type { Metadata } from "next";
import { KontaktContent } from "./KontaktContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "Contact",
      description:
        "Questions about skydiving? Contact Skydive Tønsberg for information about tandem jumps, courses or fun jumping. We're happy to help!",
      alternates: { canonical: "https://skydivetonsberg.no/kontakt" },
      openGraph: {
        title: "Contact Skydive Tønsberg",
        description:
          "Questions about skydiving? We're happy to help with information about tandem jumps, courses or fun jumping.",
        url: "https://skydivetonsberg.no/en/contact",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "Kontakt",
    description:
      "Har du spørsmål om fallskjermhopping? Kontakt Skydive Tønsberg for informasjon om tandemhopp, kurs eller funjumping. Vi hjelper deg gjerne!",
    alternates: { canonical: "https://skydivetonsberg.no/kontakt" },
    openGraph: {
      title: "Kontakt Skydive Tønsberg",
      description:
        "Har du spørsmål om fallskjermhopping? Vi hjelper deg gjerne med informasjon om tandemhopp, kurs eller funjumping.",
      url: "https://skydivetonsberg.no/no/kontakt",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kontakt Skydive Tønsberg" }],
    },
  };
}

export default function KontaktPage() {
  return <KontaktContent />;
}
