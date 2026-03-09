import { SanityDataProvider } from "@/contexts/SanityDataContext";
import { safeFetch } from "@/sanity/client";
import { ALL_FAQS_QUERY } from "@/sanity/queries";
import type { SanityFAQ } from "@/sanity/types";
import { FAQPageContent } from "./FAQPageContent";

export default async function FAQPage() {
  const allFAQs = await safeFetch<SanityFAQ[]>(ALL_FAQS_QUERY);

  return (
    <SanityDataProvider
      data={{ faqs: allFAQs ?? [], tandemPricing: null, kursPricing: null, forHopperePricing: null, courseInfo: null, tandemInfo: null, generalContent: null, landingPage: null, forHoppereInfo: null }}
    >
      <FAQPageContent />
    </SanityDataProvider>
  );
}
