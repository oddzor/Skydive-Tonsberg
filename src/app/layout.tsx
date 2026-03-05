import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://skydivetonsberg.no"),
  title: {
    default: "Skydive Tønsberg | Fallskjermhopping i Vestfold",
    template: "%s | Skydive Tønsberg",
  },
  description:
    "Opplev fallskjermhopping med Skydive Tønsberg. Tandemhopp, AFF-kurs og hoppmuligheter for erfarne hoppere. Norges mest tilgjengelige fallskjermklubb ved Tønsberg Flyplass.",
  keywords: [
    "fallskjermhopping",
    "tandemhopp",
    "skydiving",
    "Tønsberg",
    "Vestfold",
    "AFF kurs",
    "fallskjermklubb",
    "tandem",
    "hopping",
    "Norge",
    "hoppkalender",
    "gjesthopping",
    "Jarlsberg flyplass",
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
    canonical: "https://skydivetonsberg.no",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
          as="font"
          href="/fonts/masque__.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="video"
          href="/herovideo-mobile.webm"
          type="video/webm"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="video"
          href="/herovideo-optimized.webm"
          type="video/webm"
          media="(min-width: 769px)"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}

        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
