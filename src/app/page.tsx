import { Hero, About, Services, Testimonials, CTA, FAQ } from "@/components/sections";
import { homeFAQSchema } from "@/lib/faqSchema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFAQSchema) }}
      />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
