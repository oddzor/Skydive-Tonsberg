import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoppkalender | Planlagte hoppdager",
  description:
    "Se planlagte hoppdager og arrangementer hos Skydive Tønsberg. Hold deg oppdatert på årets hoppkalender ved Jarlsberg flyplass.",
  alternates: {
    canonical: "https://skydivetonsberg.no/hoppkalender",
  },
  openGraph: {
    title: "Hoppkalender | Skydive Tønsberg",
    description:
      "Planlagte hoppdager og arrangementer hos Skydive Tønsberg ved Jarlsberg flyplass.",
    url: "https://skydivetonsberg.no/hoppkalender",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HoppkalenderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
