import { defineField, defineType } from 'sanity'

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Tandem', value: 'tandem' },
          { title: 'Kurs', value: 'kurs' },
          { title: 'For Hoppere', value: 'forHoppere' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'questionNo',
      title: 'Question (Norwegian)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questionEn',
      title: 'Question (English)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answerNo',
      title: 'Answer (Norwegian)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer (English)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'questionNo',
      subtitle: 'page',
    },
  },
  orderings: [
    {
      title: 'Page then Order',
      name: 'pageOrderAsc',
      by: [
        { field: 'page', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})
