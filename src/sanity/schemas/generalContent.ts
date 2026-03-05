import { defineField, defineType } from 'sanity'

export const generalContentSchema = defineType({
  name: 'generalContent',
  title: 'General Content',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street / Location', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal Code', type: 'string' }),
      ],
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'object',
      fields: [
        defineField({ name: 'startMonth', title: 'Season Start (e.g. Mai)', type: 'string' }),
        defineField({ name: 'endMonth', title: 'Season End (e.g. Oktober)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      description: 'Optional banner shown at the top of the site',
      type: 'object',
      fields: [
        defineField({ name: 'active', title: 'Show Banner', type: 'boolean', initialValue: false }),
        defineField({ name: 'textNo', title: 'Text (Norwegian)', type: 'string' }),
        defineField({ name: 'textEn', title: 'Text (English)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      description: 'Burble booking link (used in CTA and tandem hero buttons)',
      type: 'url',
    }),
    defineField({
      name: 'shopUrl',
      title: 'Shop URL',
      description: 'Burble shop link',
      type: 'url',
    }),
    defineField({
      name: 'jumpCalendarUrl',
      title: 'Jump Calendar URL',
      description: 'External jump calendar link',
      type: 'url',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'General Content' }
    },
  },
})
