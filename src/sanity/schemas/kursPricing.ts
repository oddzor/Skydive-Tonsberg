import { defineField, defineType } from 'sanity'

export const kursPricingSchema = defineType({
  name: 'kursPricing',
  title: 'Kurs Pricing',
  type: 'document',
  fields: [
    defineField({ name: 'affCourse', title: 'AFF Course (kr)', type: 'number' }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Kurs Pricing' }
    },
  },
})
