import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: "Jump Calendar",
      description:
        "See upcoming jump days and events at Skydive Tønsberg. Plan your skydiving season at Jarlsberg Airport near Oslo.",
      openGraph: {
        title: "Jump Calendar",
        description: "Upcoming jump days and events at Skydive Tønsberg near Oslo.",
        url: "https://skydivetonsberg.no/en/jumpcalendar",
        images: [{ url: "/hero-poster.webp", alt: "Jump Calendar – Skydive Tønsberg" }],
      },
    };
  }
  return {
    title: "Hoppkalender",
    description:
      "Se planlagte hoppdager og arrangementer hos Skydive Tønsberg. Hold deg oppdatert på årets hoppkalender ved Jarlsberg flyplass.",
    alternates: { canonical: "https://skydivetonsberg.no/hoppkalender" },
    openGraph: {
      title: "Hoppkalender",
      description: "Planlagte hoppdager og arrangementer hos Skydive Tønsberg ved Jarlsberg flyplass.",
      url: "https://skydivetonsberg.no/no/hoppkalender",
      images: [{ url: "/hero-poster.webp", alt: "Hoppkalender – Skydive Tønsberg" }],
    },
  };
}

export default function HoppkalenderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
