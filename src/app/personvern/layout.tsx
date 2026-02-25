import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvern | Personvernserklæring",
  description:
    "Personvernserklæring for Skydive Tønsberg. Les om hvordan vi behandler dine personopplysninger.",
  alternates: {
    canonical: "https://skydivetonsberg.no/personvern",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function PersonvernLayout({ children }: { children: React.ReactNode }) {
  return children;
}
