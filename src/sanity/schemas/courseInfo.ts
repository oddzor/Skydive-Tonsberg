import { defineField, defineType } from 'sanity'

const moduleFields = () => [
  defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
  defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
  defineField({ name: 'descNo', title: 'Description (Norwegian)', type: 'text', rows: 3 }),
  defineField({ name: 'descEn', title: 'Description (English)', type: 'text', rows: 3 }),
  defineField({ name: 'duration', title: 'Duration', type: 'string' }),
]

const bilingualArrayField = () => ({
  type: 'object' as const,
  fields: [
    defineField({ name: 'no', title: 'Norwegian', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
  preview: { select: { title: 'no' } },
})

const bilingualItemField = () => ({
  type: 'object' as const,
  fields: [
    defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
    defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
    defineField({ name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionEn', title: 'Description (English)', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'titleNo' } },
})

export const courseInfoSchema = defineType({
  name: 'courseInfo',
  title: 'Course Info',
  type: 'document',
  groups: [
    { name: 'images', title: 'Images', default: true },
    { name: 'video', title: 'Video' },
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Level 1–7 Content' },
    { name: 'progression', title: 'Progression (Level 1–8)' },
    { name: 'aLicense', title: 'A-License' },
    { name: 'payment', title: 'Payment & Info' },
  ],
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video ID',
      type: 'string',
      group: 'video',
      description: 'YouTube video ID (e.g. 2pLzOHyYCIk)',
    }),

    defineField({
      name: 'heroCard',
      title: 'Hero Card — About Section',
      description: 'The info card shown on the right side of the hero pricing section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
        defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
        defineField({
          name: 'infoItems',
          title: 'Info Items',
          type: 'array',
          of: [{ ...bilingualArrayField() }],
        }),
        defineField({ name: 'closingTextNo', title: 'Closing Text (Norwegian)', type: 'text', rows: 2 }),
        defineField({ name: 'closingTextEn', title: 'Closing Text (English)', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'pricingIncluded',
      title: 'Price Card — Included Items (5 items)',
      description: 'The 5 checkmark items shown in the pricing card in the hero section',
      type: 'array',
      group: 'hero',
      of: [{ ...bilingualArrayField() }],
    }),

    defineField({
      name: 'modules',
      title: 'Course Modules',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'groundSchool', title: 'Ground School', type: 'object', fields: moduleFields() }),
        defineField({ name: 'windTunnel', title: 'Wind Tunnel', type: 'object', fields: moduleFields() }),
        defineField({ name: 'level13', title: 'Level 1-3', type: 'object', fields: moduleFields() }),
        defineField({ name: 'level47', title: 'Level 4-7', type: 'object', fields: moduleFields() }),
      ],
    }),
    defineField({
      name: 'included',
      title: "What's Included (full list)",
      type: 'array',
      group: 'content',
      of: [{ ...bilingualArrayField() }],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements to Participate',
      type: 'array',
      group: 'content',
      of: [{ ...bilingualArrayField() }],
    }),

    defineField({
      name: 'progressionLevels',
      title: 'AFF Progression Levels (1–8)',
      description: 'Content for each AFF level card on the course page',
      type: 'array',
      group: 'progression',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'levelNumber', title: 'Level Number', type: 'number', validation: (Rule) => Rule.min(1).max(8) }),
            defineField({ name: 'titleNo', title: 'Title (Norwegian)', type: 'string' }),
            defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
            defineField({ name: 'goalNo', title: 'Goal / Objective (Norwegian)', type: 'text', rows: 2 }),
            defineField({ name: 'goalEn', title: 'Goal / Objective (English)', type: 'text', rows: 2 }),
            defineField({ name: 'descNo', title: 'Description (Norwegian)', type: 'text', rows: 3 }),
            defineField({ name: 'descEn', title: 'Description (English)', type: 'text', rows: 3 }),
            defineField({ name: 'requirements', title: 'Requirements List (Level 8)', type: 'array', of: [{ ...bilingualArrayField() }] }),
            defineField({ name: 'nextSteps', title: 'Next Steps (Level 8)', type: 'array', of: [{ ...bilingualArrayField() }] }),
          ],
          preview: {
            select: { title: 'titleNo', subtitle: 'levelNumber' },
            prepare(sel: { title?: string; subtitle?: number }) {
              return { title: `Level ${sel.subtitle}: ${sel.title ?? ''}` }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'aLicenseProgressionItems',
      title: 'Level 8 Progression Items (3 items)',
      description: 'The three checkmark items under "Nivå 8 progresjon" (solo jumps, checkouts, low jumps)',
      type: 'array',
      group: 'aLicense',
      of: [{ ...bilingualItemField() }],
    }),
    defineField({
      name: 'aLicenseTempoDescNo',
      title: 'Self-paced Note (Norwegian)',
      type: 'text',
      rows: 2,
      group: 'aLicense',
    }),
    defineField({
      name: 'aLicenseTempoDescEn',
      title: 'Self-paced Note (English)',
      type: 'text',
      rows: 2,
      group: 'aLicense',
    }),
    defineField({
      name: 'aLicenseBeforeItems',
      title: 'Before A-License Items (5 items)',
      description: 'The five checkmark items under "Før du får A-bevis" (packing course, exam, A-course, A-exam, Ren Utøver)',
      type: 'array',
      group: 'aLicense',
      of: [{ ...bilingualItemField() }],
    }),
    defineField({
      name: 'aLicenseCongratsDescNo',
      title: 'Congratulations Description (Norwegian)',
      type: 'text',
      rows: 3,
      group: 'aLicense',
    }),
    defineField({
      name: 'aLicenseCongratsDescEn',
      title: 'Congratulations Description (English)',
      type: 'text',
      rows: 3,
      group: 'aLicense',
    }),
    defineField({
      name: 'aLicenseTotalJumpsNo',
      title: 'Total Jumps Note (Norwegian)',
      type: 'string',
      group: 'aLicense',
    }),
    defineField({
      name: 'aLicenseTotalJumpsEn',
      title: 'Total Jumps Note (English)',
      type: 'string',
      group: 'aLicense',
    }),

    defineField({
      name: 'paymentBookingDescNo',
      title: 'Booking Deposit Description (Norwegian)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentBookingDescEn',
      title: 'Booking Deposit Description (English)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentStartDescNo',
      title: 'Payment at Course Start (Norwegian)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentStartDescEn',
      title: 'Payment at Course Start (English)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentVippsDescNo',
      title: 'Vipps Description (Norwegian)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentVippsDescEn',
      title: 'Vipps Description (English)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentRejumpDesc1No',
      title: 'Rejump Description 1 (Norwegian)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentRejumpDesc1En',
      title: 'Rejump Description 1 (English)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentRejumpDesc2No',
      title: 'Rejump Description 2 — before link (Norwegian)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentRejumpDesc2En',
      title: 'Rejump Description 2 — before link (English)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'paymentMembershipDescNo',
      title: 'Membership Note (Norwegian)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentMembershipDescEn',
      title: 'Membership Note (English)',
      type: 'text',
      rows: 2,
      group: 'payment',
    }),
    defineField({
      name: 'paymentCancellationDescNo',
      title: 'Cancellation Policy (Norwegian)',
      type: 'text',
      rows: 3,
      group: 'payment',
    }),
    defineField({
      name: 'paymentCancellationDescEn',
      title: 'Cancellation Policy (English)',
      type: 'text',
      rows: 3,
      group: 'payment',
    }),
    defineField({
      name: 'declarationTextNo',
      title: 'Health Declaration Text (Norwegian)',
      type: 'text',
      rows: 4,
      group: 'payment',
    }),
    defineField({
      name: 'declarationTextEn',
      title: 'Health Declaration Text (English)',
      type: 'text',
      rows: 4,
      group: 'payment',
    }),
    defineField({
      name: 'supportFacebookNo',
      title: 'Support — Facebook Group Text (Norwegian)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'supportFacebookEn',
      title: 'Support — Facebook Group Text (English)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'supportMentorNo',
      title: 'Support — Mentor Text (Norwegian)',
      type: 'string',
      group: 'payment',
    }),
    defineField({
      name: 'supportMentorEn',
      title: 'Support — Mentor Text (English)',
      type: 'string',
      group: 'payment',
    }),

    defineField({ name: 'classroom', title: 'Banner Image — Wide (below hero)', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'studentInAction', title: 'Progression Section — Right', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'groupPhoto1', title: 'Group Photos — Left', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'groupPhoto2', title: 'Group Photos — Center', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'groupPhoto3', title: 'Group Photos — Right', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'soloStudent', title: 'Progression Section — Left', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'instructorCoaching', title: 'Progression Section — (unused)', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'packingCourse', title: 'A-License Section — Center Wide', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
    defineField({ name: 'licenseCelebration', title: 'A-License Section — Bottom Left', type: 'image', group: 'images', options: { hotspot: true }, fields: [defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }), defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' })] }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Course Info' }
    },
  },
})
