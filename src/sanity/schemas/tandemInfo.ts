import { defineField, defineType } from 'sanity'

export const tandemInfoSchema = defineType({
  name: 'tandemInfo',
  title: 'Tandem Info',
  type: 'document',
  groups: [
    { name: 'images', title: 'Images', default: true },
    { name: 'video', title: 'Video' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video ID',
      type: 'string',
      group: 'video',
      description: 'YouTube video ID (e.g. olKR6xCSB7M)',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'no', title: 'Norwegian', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
          ],
          preview: {
            select: { title: 'no' },
          },
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (4 cards)',
      description: 'The four highlight cards shown on the tandem page',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
            defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
            defineField({ name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text', rows: 3 }),
            defineField({ name: 'descriptionEn', title: 'Description (English)', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'titleNo' },
          },
        },
      ],
    }),
    defineField({
      name: 'jumpDaySteps',
      title: 'Jump Day Steps (6 steps)',
      description: 'Step-by-step guide to what happens on jump day',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
            defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
            defineField({ name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text', rows: 3 }),
            defineField({ name: 'descriptionEn', title: 'Description (English)', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'titleNo' },
          },
        },
      ],
    }),
    defineField({
      name: 'pricingIncluded',
      title: 'Price Card — Included Items',
      description: 'Checklist items shown in the pricing card in the hero section',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'no', title: 'Norwegian', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
          ],
          preview: { select: { title: 'no' } },
        },
      ],
    }),
    defineField({
      name: 'heroCard',
      title: 'Hero Card — About Section',
      description: 'The info card shown on the right side of the hero pricing section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
        defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
        defineField({
          name: 'infoItems',
          title: 'Info Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'no', title: 'Norwegian', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
              preview: { select: { title: 'no' } },
            },
          ],
        }),
        defineField({ name: 'closingTextNo', title: 'Closing Text (Norwegian)', type: 'text', rows: 2 }),
        defineField({ name: 'closingTextEn', title: 'Closing Text (English)', type: 'text', rows: 2 }),
      ],
    }),
    defineField({ name: 'galleryWide1', title: 'Gallery — Top Wide', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'galleryRect1', title: 'Gallery — Large Left', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'galleryRect2', title: 'Gallery — Large Right', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'gallerySquare1', title: 'Gallery — Small Left', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'gallerySquare2', title: 'Gallery — Small Center', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'gallerySquare3', title: 'Gallery — Small Right', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Tandem Info' }
    },
  },
})
