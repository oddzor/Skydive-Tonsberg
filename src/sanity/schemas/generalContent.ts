import { defineField, defineType } from 'sanity'

export const generalContentSchema = defineType({
  name: 'generalContent',
  title: 'General Content',
  type: 'document',
  fields: [
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
