import type { SanityFAQ } from '@/sanity/types'

export type FAQ = { question: string; answer: string }

export const buildFAQSchema = (faqs: FAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const sanityFaqToSchema = (faq: SanityFAQ): FAQ => ({
  question: faq.questionNo,
  answer: faq.answerNo,
})
