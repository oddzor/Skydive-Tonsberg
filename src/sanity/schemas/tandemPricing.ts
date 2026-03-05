import { defineField, defineType } from 'sanity'

export const tandemPricingSchema = defineType({
  name: 'tandemPricing',
  title: 'Tandem Pricing',
  type: 'document',
  fields: [
    defineField({ name: 'weekday', title: 'Weekday (kr)', type: 'number' }),
    defineField({ name: 'weekend', title: 'Weekend (kr)', type: 'number' }),
    defineField({ name: 'video', title: 'Video Add-on (kr)', type: 'number' }),
    defineField({ name: 'videoPhotos', title: 'Video + Photos Add-on (kr)', type: 'number' }),
    defineField({ name: 'fullPackage', title: 'Full Package Add-on (kr)', type: 'number' }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Tandem Pricing' }
    },
  },
})
