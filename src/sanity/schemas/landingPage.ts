import { defineField, defineType } from 'sanity'

export const landingPageSchema = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'introSection', title: 'Intro Section', default: true },
    { name: 'servicesSection', title: 'Services Section' },
    { name: 'video', title: 'Video' },
  ],
  fields: [
    defineField({ name: 'aboutGrid1', title: 'Photo Grid — Left, Tall (top)', type: 'image', group: 'introSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'aboutGrid2', title: 'Photo Grid — Left, Square (bottom)', type: 'image', group: 'introSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'aboutGrid3', title: 'Photo Grid — Right, Square (top)', type: 'image', group: 'introSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'aboutGrid4', title: 'Photo Grid — Right, Tall (bottom)', type: 'image', group: 'introSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({
      name: 'introContent',
      title: 'Text & Stats',
      type: 'object',
      group: 'introSection',
      fields: [
        defineField({
          name: 'aboutDescription1No',
          title: 'Paragraph 1 (Norwegian)',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'aboutDescription1En',
          title: 'Paragraph 1 (English)',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'aboutDescription2No',
          title: 'Paragraph 2 (Norwegian)',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'aboutDescription2En',
          title: 'Paragraph 2 (English)',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'statsMembersCount',
          title: 'Stat — Members',
          type: 'string',
          initialValue: '400+',
        }),
        defineField({
          name: 'statsJumpsCount',
          title: 'Stat — Total Jumps',
          type: 'string',
          initialValue: '20 000+',
        }),
      ],
    }),

    defineField({ name: 'serviceTandem', title: 'Service Card — Tandem Image', type: 'image', group: 'servicesSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'serviceAff', title: 'Service Card — AFF/Kurs Image', type: 'image', group: 'servicesSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'serviceExperienced', title: 'Service Card — For Hoppere Image', type: 'image', group: 'servicesSection', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({
      name: 'servicesContent',
      title: 'Card Text',
      type: 'object',
      group: 'servicesSection',
      fields: [
        defineField({ name: 'tandemTitleNo', title: 'Tandem — Title (Norwegian)', type: 'string' }),
        defineField({ name: 'tandemTitleEn', title: 'Tandem — Title (English)', type: 'string' }),
        defineField({ name: 'tandemDescNo', title: 'Tandem — Description (Norwegian)', type: 'text', rows: 3 }),
        defineField({ name: 'tandemDescEn', title: 'Tandem — Description (English)', type: 'text', rows: 3 }),
        defineField({ name: 'affTitleNo', title: 'AFF/Kurs — Title (Norwegian)', type: 'string' }),
        defineField({ name: 'affTitleEn', title: 'AFF/Kurs — Title (English)', type: 'string' }),
        defineField({ name: 'affDescNo', title: 'AFF/Kurs — Description (Norwegian)', type: 'text', rows: 3 }),
        defineField({ name: 'affDescEn', title: 'AFF/Kurs — Description (English)', type: 'text', rows: 3 }),
        defineField({ name: 'experiencedTitleNo', title: 'For Hoppere — Title (Norwegian)', type: 'string' }),
        defineField({ name: 'experiencedTitleEn', title: 'For Hoppere — Title (English)', type: 'string' }),
        defineField({ name: 'experiencedDescNo', title: 'For Hoppere — Description (Norwegian)', type: 'text', rows: 3 }),
        defineField({ name: 'experiencedDescEn', title: 'For Hoppere — Description (English)', type: 'text', rows: 3 }),
      ],
    }),

    defineField({
      name: 'video',
      title: 'Hero Video',
      type: 'object',
      group: 'video',
      fields: [
        defineField({
          name: 'heroVideoDesktop',
          title: 'Desktop Video',
          type: 'string',
          initialValue: '/herovideo-optimized.webm',
        }),
        defineField({
          name: 'heroVideoMobile',
          title: 'Mobile Video',
          type: 'string',
          initialValue: '/herovideo-mobile.webm',
        }),
        defineField({
          name: 'heroPoster',
          title: 'Poster Image (shown before video loads)',
          type: 'string',
          initialValue: '/hero-poster.webp',
        }),
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Landing Page' }
    },
  },
})
