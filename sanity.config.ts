import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schema'

const singletonTypes = [
  'landingPage',
  'tandemPricing',
  'kursPricing',
  'forHopperePricing',
  'forHoppereInfo',
  'courseInfo',
  'tandemInfo',
  'generalContent',
]

const faqList = (S: StructureBuilder, title: string, page: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "faq" && page == $page')
        .params({ page })
        .defaultOrdering([{ field: 'order', direction: 'asc' }])
    )

const singleton = (S: StructureBuilder, title: string, type: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export default defineConfig({
  name: 'skydive-tonsberg',
  title: 'Skydive Tønsberg CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Skydive Tønsberg')
          .items([
            S.listItem()
              .title('Landing Page')
              .child(
                S.list()
                  .title('Landing Page')
                  .items([
                    singleton(S, 'Content & Media', 'landingPage'),
                    faqList(S, 'FAQs', 'home'),
                  ])
              ),

            S.divider(),

            S.listItem()
              .title('Tandem Page')
              .child(
                S.list()
                  .title('Tandem Page')
                  .items([
                    singleton(S, 'Content & Media', 'tandemInfo'),
                    singleton(S, 'Pricing', 'tandemPricing'),
                    faqList(S, 'FAQs', 'tandem'),
                  ])
              ),


            S.listItem()
              .title('Kurs Page')
              .child(
                S.list()
                  .title('Kurs Page')
                  .items([
                    singleton(S, 'Content & Media', 'courseInfo'),
                    singleton(S, 'Pricing', 'kursPricing'),
                    faqList(S, 'FAQs', 'kurs'),
                  ])
              ),


            S.listItem()
              .title('For Hoppere Page')
              .child(
                S.list()
                  .title('For Hoppere Page')
                  .items([
                    singleton(S, 'Content & Media', 'forHoppereInfo'),
                    singleton(S, 'Pricing', 'forHopperePricing'),
                    faqList(S, 'FAQs', 'forHoppere'),
                  ])
              ),

            S.divider(),


            S.listItem()
              .title('FAQ Page')
              .child(
                S.list()
                  .title('FAQ Page')
                  .items([
                    faqList(S, 'Tandem', 'tandem'),
                    faqList(S, 'Kurs', 'kurs'),
                    faqList(S, 'For Hoppere', 'forHoppere'),
                  ])
              ),

            S.divider(),


            singleton(S, 'General Content', 'generalContent'),
          ]),
    }),
    visionTool(),
  ],
  schema,
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !singletonTypes.includes(template.templateId))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.includes(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate' && action !== 'unpublish')
      }
      return prev
    },
  },
})
