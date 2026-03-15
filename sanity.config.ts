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
            singleton(S, 'Landing Page', 'landingPage'),

            S.divider(),

            singleton(S, 'Tandem Page', 'tandemInfo'),

            singleton(S, 'Kurs Page', 'courseInfo'),

            singleton(S, 'For Hoppere Page', 'forHoppereInfo'),

            S.divider(),


            S.listItem()
              .title('Pricing')
              .child(
                S.list()
                  .title('Pricing')
                  .items([
                    singleton(S, 'Tandem', 'tandemPricing'),
                    singleton(S, 'Kurs', 'kursPricing'),
                    singleton(S, 'For Hoppere', 'forHopperePricing'),
                  ])
              ),

            S.divider(),


            S.listItem()
              .title('FAQs')
              .child(
                S.list()
                  .title('FAQs')
                  .items([
                    faqList(S, 'Home', 'home'),
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
