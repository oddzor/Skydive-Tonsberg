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
      name: 'jumpStats',
      title: 'Key Jump Stats',
      description: 'Shown as the three stat boxes below the pricing cards (exit altitude, freefall duration, age restriction)',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'exitAltitudeNo', title: 'Exit Altitude (Norwegian)', type: 'string', description: 'e.g. 4000m' }),
        defineField({ name: 'exitAltitudeEn', title: 'Exit Altitude (English)', type: 'string', description: 'e.g. 4000m' }),
        defineField({ name: 'freefallDurationNo', title: 'Freefall Duration (Norwegian)', type: 'string', description: 'e.g. 40 sek' }),
        defineField({ name: 'freefallDurationEn', title: 'Freefall Duration (English)', type: 'string', description: 'e.g. 40 sec' }),
        defineField({ name: 'ageRestrictionNo', title: 'Age Restriction (Norwegian)', type: 'string', description: 'e.g. 15 år' }),
        defineField({ name: 'ageRestrictionEn', title: 'Age Restriction (English)', type: 'string', description: 'e.g. 15 years' }),
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
