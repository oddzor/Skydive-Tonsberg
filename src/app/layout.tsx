import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
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
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
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
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
