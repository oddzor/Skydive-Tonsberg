import { defineField, defineType } from 'sanity'

const bilingualListField = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    of: [
      {
        type: 'object' as const,
        fields: [
          defineField({ name: 'no', title: 'Norwegian', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'no' } },
      },
    ],
  })

const textField = (name: string, title: string, group: string, rows = 3, required = false) =>
  defineField({
    name,
    title,
    type: 'text',
    rows,
    group,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Sanity validation rule type varies by field type
    ...(required ? { validation: (rule: any) => rule.required() } : {}),
  })

export const forHoppereInfoSchema = defineType({
  name: 'forHoppereInfo',
  title: 'For Hoppere Info',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'video', title: 'Video' },
    { name: 'season', title: 'Season' },
    { name: 'renewal', title: 'Renewal' },
    { name: 'bunkhouse', title: 'Bunkhouse' },
    { name: 'burbleme', title: 'BurbleMe' },
    { name: 'hoppfeltbrief', title: 'Hoppfeltbrief' },
    { name: 'rental', title: 'Rental' },
    { name: 'insurance', title: 'Insurance' },
    { name: 'reporting', title: 'Reporting' },
    { name: 'aircraft', title: 'Aircraft' },
    { name: 'facilities', title: 'Facilities' },
  ],
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video ID',
      type: 'string',
      group: 'video',
      description: 'YouTube video ID only (e.g. dQw4w9WgXcQ, not the full URL)',
    }),

    textField('heroDescriptionNo', 'Hero Description (Norwegian)', 'content', 4, true),
    textField('heroDescriptionEn', 'Hero Description (English)', 'content', 4, true),
    textField('heroSubDescriptionNo', 'Hero Sub-Description (Norwegian)', 'content', 3),
    textField('heroSubDescriptionEn', 'Hero Sub-Description (English)', 'content', 3),

    defineField({ name: 'seasonStartNo', title: 'Season Start (Norwegian)', type: 'string', group: 'season', validation: (Rule) => Rule.required() }),
    defineField({ name: 'seasonStartEn', title: 'Season Start (English)', type: 'string', group: 'season', validation: (Rule) => Rule.required() }),
    defineField({ name: 'seasonEndNo', title: 'Season End (Norwegian)', type: 'string', group: 'season', validation: (Rule) => Rule.required() }),
    defineField({ name: 'seasonEndEn', title: 'Season End (English)', type: 'string', group: 'season', validation: (Rule) => Rule.required() }),
    defineField({ name: 'openDaysNo', title: 'Open Days (Norwegian)', type: 'string', group: 'season' }),
    defineField({ name: 'openDaysEn', title: 'Open Days (English)', type: 'string', group: 'season' }),

    textField('renewalDescriptionNo', 'Renewal Description (Norwegian)', 'renewal', 3, true),
    textField('renewalDescriptionEn', 'Renewal Description (English)', 'renewal', 3, true),

    textField('bunkhouseDescriptionNo', 'Bunkhouse Description (Norwegian)', 'bunkhouse', 3, true),
    textField('bunkhouseDescriptionEn', 'Bunkhouse Description (English)', 'bunkhouse', 3, true),
    bilingualListField('bunkhouseRules', 'Bunkhouse Rules', 'bunkhouse'),

    textField('burbleMeDescriptionNo', 'Main Description (Norwegian)', 'burbleme', 3, true),
    textField('burbleMeDescriptionEn', 'Main Description (English)', 'burbleme', 3, true),
    textField('burbleMePersonalDetailsDescNo', 'Profile — Personal Details Desc (Norwegian)', 'burbleme'),
    textField('burbleMePersonalDetailsDescEn', 'Profile — Personal Details Desc (English)', 'burbleme'),
    textField('burbleMeProfileNoteNo', 'Profile — Warning Note (Norwegian)', 'burbleme'),
    textField('burbleMeProfileNoteEn', 'Profile — Warning Note (English)', 'burbleme'),
    textField('burbleMeCheckInDropzoneDescNo', 'Check-In — Dropzone Desc (Norwegian)', 'burbleme'),
    textField('burbleMeCheckInDropzoneDescEn', 'Check-In — Dropzone Desc (English)', 'burbleme'),
    textField('burbleMeCheckInFormationDescNo', 'Check-In — Formation Desc (Norwegian)', 'burbleme'),
    textField('burbleMeCheckInFormationDescEn', 'Check-In — Formation Desc (English)', 'burbleme'),
    bilingualListField('burbleMeCheckInRules', 'Check-In — Tracking Rules', 'burbleme'),
    textField('burbleMeLoadTimeDescNo', 'Notifications — Load Time Desc (Norwegian)', 'burbleme'),
    textField('burbleMeLoadTimeDescEn', 'Notifications — Load Time Desc (English)', 'burbleme'),
    textField('burbleMeOutlandingDescNo', 'Notifications — Outlanding Desc (Norwegian)', 'burbleme'),
    textField('burbleMeOutlandingDescEn', 'Notifications — Outlanding Desc (English)', 'burbleme'),
    textField('burbleMeLocationDescNo', 'Notifications — Location Desc (Norwegian)', 'burbleme'),
    textField('burbleMeLocationDescEn', 'Notifications — Location Desc (English)', 'burbleme'),

    bilingualListField('exitOrder', 'Exit Order', 'hoppfeltbrief'),
    bilingualListField('boardingRules', 'Boarding Rules', 'hoppfeltbrief'),
    bilingualListField('inAircraftRules', 'In Aircraft Rules', 'hoppfeltbrief'),
    bilingualListField('landingPatternRules', 'Landing Pattern Rules', 'hoppfeltbrief'),
    bilingualListField('outlandingRules', 'Outlanding Rules', 'hoppfeltbrief'),

    textField('rentalDescriptionNo', 'Description (Norwegian)', 'rental', 3, true),
    textField('rentalDescriptionEn', 'Description (English)', 'rental', 3, true),
    textField('rentalAvailableNo', 'Available Equipment Desc (Norwegian)', 'rental'),
    textField('rentalAvailableEn', 'Available Equipment Desc (English)', 'rental'),
    bilingualListField('rentalFeatures', 'Features / What Is Included', 'rental'),
    bilingualListField('rentalRequirements', 'Rental Requirements', 'rental'),
    textField('rentalContactTextNo', 'Contact Text (Norwegian)', 'rental'),
    textField('rentalContactTextEn', 'Contact Text (English)', 'rental'),

    textField('insuranceNorwegianTextNo', 'Norwegian Jumpers — Insurance Text (Norwegian)', 'insurance', 4, true),
    textField('insuranceNorwegianTextEn', 'Norwegian Jumpers — Insurance Text (English)', 'insurance', 4, true),
    textField('insuranceForeignIntroNo', 'Foreign Jumpers — Intro (Norwegian)', 'insurance', 3),
    textField('insuranceForeignIntroEn', 'Foreign Jumpers — Intro (English)', 'insurance', 3),
    textField('insuranceForeignBuyNo', 'Foreign Jumpers — How to Buy (Norwegian)', 'insurance', 3),
    textField('insuranceForeignBuyEn', 'Foreign Jumpers — How to Buy (English)', 'insurance', 3),
    textField('insuranceForeignWarningNo', 'Foreign Jumpers — Warning (Norwegian)', 'insurance', 3),
    textField('insuranceForeignWarningEn', 'Foreign Jumpers — Warning (English)', 'insurance', 3),

    textField('reportingIntroNo', 'Intro Paragraph (Norwegian)', 'reporting', 4, true),
    textField('reportingIntroEn', 'Intro Paragraph (English)', 'reporting', 4, true),
    textField('reportingPolicyNo', 'Policy Paragraph (Norwegian)', 'reporting', 3),
    textField('reportingPolicyEn', 'Policy Paragraph (English)', 'reporting', 3),
    textField('reportingSystemDescNo', 'System Description (Norwegian)', 'reporting', 3),
    textField('reportingSystemDescEn', 'System Description (English)', 'reporting', 3),
    textField('reportingSystemPathNo', 'System Path / Navigation (Norwegian)', 'reporting', 2),
    textField('reportingSystemPathEn', 'System Path / Navigation (English)', 'reporting', 2),
    textField('reportingGroupNo', 'Reporting Group Members (Norwegian)', 'reporting', 2),
    textField('reportingGroupEn', 'Reporting Group Members (English)', 'reporting', 2),

    textField('aircraftIntroNo', 'Aircraft Intro Paragraph (Norwegian)', 'aircraft', 4, true),
    textField('aircraftIntroEn', 'Aircraft Intro Paragraph (English)', 'aircraft', 4, true),
    textField('aircraftHistoryNo', 'Aircraft History Paragraph (Norwegian)', 'aircraft', 3),
    textField('aircraftHistoryEn', 'Aircraft History Paragraph (English)', 'aircraft', 3),
    textField('aircraftRenovationNo', 'Aircraft Renovation Paragraph (Norwegian)', 'aircraft', 3),
    textField('aircraftRenovationEn', 'Aircraft Renovation Paragraph (English)', 'aircraft', 3),

    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      group: 'facilities',
      of: [
        {
          type: 'object' as const,
          fields: [
            defineField({ name: 'nameNo', title: 'Name (Norwegian)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'nameEn', title: 'Name (English)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text', rows: 2 }),
            defineField({ name: 'descriptionEn', title: 'Description (English)', type: 'text', rows: 2 }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'altNo', title: 'Alt Text (Norwegian)', type: 'string' }),
                defineField({ name: 'altEn', title: 'Alt Text (English)', type: 'string' }),
              ],
            }),
          ],
          preview: { select: { title: 'nameNo', media: 'image' } },
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'For Hoppere Info' }
    },
  },
})
