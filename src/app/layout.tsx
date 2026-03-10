import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00B4D8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1628" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://skydivetonsberg.no"),
  title: {
    default: "Skydive Tønsberg | Fallskjermhopping i Vestfold",
    template: "%s | Skydive Tønsberg",
  },
  description:
    "Opplev fallskjermhopping ved Tønsberg Flyplass – nærmest Oslo! Tandemhopp fra 4690 kr, AFF grunnkurs og gjesthopping for erfarne hoppere. Norges mest tilgjengelige fallskjermklubb.",
  keywords: [
    "fallskjermhopping",
    "fallskjerm",
    "tandemhopp",
    "tandemhopp nær Oslo",
    "tandemhopp Oslo",
    "skydiving",
    "skydiving Norway",
    "Tønsberg",
    "Vestfold",
    "AFF kurs",
    "AFF grunnkurs",
    "fallskjermkurs",
    "fallskjermklubb",
    "tandem",
    "gjesthopping",
    "gjesthopping Vestfold",
    "Jarlsberg flyplass",
    "hoppkalender",
  ],
  authors: [{ name: "Skydive Tønsberg" }],
  creator: "Skydive Tønsberg",
  publisher: "Skydive Tønsberg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://skydivetonsberg.no",
    siteName: "Skydive Tønsberg",
    title: "Skydive Tønsberg | Fallskjermhopping i Vestfold",
    description:
      "Opplev fallskjermhopping med Skydive Tønsberg. Tandemhopp, AFF-kurs og hoppmuligheter for erfarne hoppere.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skydive Tønsberg - Fallskjermhopping over Vestfold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skydive Tønsberg | Fallskjermhopping i Vestfold",
    description:
      "Opplev fallskjermhopping med Skydive Tønsberg. Tandemhopp, AFF-kurs og hoppmuligheter for erfarne hoppere.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://skydivetonsberg.no/no/",
    languages: {
      "nb-NO": "https://skydivetonsberg.no/no/",
      "en": "https://skydivetonsberg.no/en/",
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://skydivetonsberg.no",
  name: "Skydive Tønsberg",
  description:
    "Norges mest tilgjengelige fallskjermklubb. Tandemhopp, AFF-kurs og gjesthopping ved Jarlsberg flyplass i Tønsberg.",
  url: "https://skydivetonsberg.no",
  telephone: "+47 99 59 43 59",
  email: "info@hoppfallskjerm.no",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jarlsberg Flyplass",
    addressLocality: "Tønsberg",
    addressRegion: "Vestfold",
    postalCode: "3145",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.1855,
    longitude: 10.2557,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      description: "Hoppdager i sesongen (mai–oktober)",
    },
  ],
  priceRange: "kr4690–kr18990",
  currenciesAccepted: "NOK",
  paymentAccepted: "Cash, Credit Card",
  image: "https://skydivetonsberg.no/og-image.jpg",
  sameAs: [
    "https://www.facebook.com/skydivetonsberg/",
    "https://instagram.com/skydivetonsberg",
    "https://www.youtube.com/@skydivetnsberg9501",
  ],
  hasMap: "https://www.google.com/maps/place/Skydive+Tønsberg",
  sport: "Fallskjermhopping",
  knowsAbout: ["Tandemhopp", "AFF-kurs", "Fallskjerm", "Skydiving"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={outfit.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          fetchPriority="high"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
