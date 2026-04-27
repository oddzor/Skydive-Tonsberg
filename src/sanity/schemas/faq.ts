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
      description: `Du kan sette inn priser som oppdateres automatisk når du endrer dem under Priser. Skriv en priskode i doble krøllparenteser — f.eks. vil "{{tandem.weekday}} kr" vise gjeldende pris for tandemhopp på hverdager.

Tilgjengelige priskoder:
TANDEMHOPP: {{tandem.weekday}}, {{tandem.weekend}}, {{tandem.video}}, {{tandem.videoPhotos}}, {{tandem.fullPackage}}
HOPPTIMER: {{jumps.normal}}, {{jumps.deal}}, {{jumps.dealDeposit}}, {{jumps.bigDeal}}, {{jumps.bigDealDeposit}}, {{jumps.highAltitude}}
MEDLEMSKAP / DAGPASS: {{registration.annual}}, {{registration.annualVeteran}}, {{registration.day}}, {{registration.weekend}}, {{registration.week}}
UTSTYRLEIE: {{equipment.rentalRig}}, {{equipment.studentRig}}, {{equipment.altimeter}}, {{equipment.packing}}
KURSPRISER: {{courses.aff}}, {{courses.rejump13}}, {{courses.rejump47}}, {{courses.level8}}, {{courses.checkoutJump}}
BUNKHOUSE: {{bunkhouse.threeMan}}, {{bunkhouse.doubleSingle}}, {{bunkhouse.doubleTwo}}, {{bunkhouse.bedding}}, {{bunkhouse.rvPower}}, {{bunkhouse.rvPowerWeek}}, {{bunkhouse.tentNoPower}}
DIVERSE: {{misc.tofskMembership}}, {{misc.burbleWithdrawal}}, {{misc.familyDiscount}}, {{misc.recruiterReward}}`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer (English)',
      type: 'text',
      rows: 4,
      description: `You can insert prices that update automatically when changed under Pricing settings. Type a price tag in double curly braces — e.g. "{{tandem.weekday}} kr" will show the current weekday tandem price.

Available price tags:
TANDEM JUMP: {{tandem.weekday}}, {{tandem.weekend}}, {{tandem.video}}, {{tandem.videoPhotos}}, {{tandem.fullPackage}}
JUMP TICKETS: {{jumps.normal}}, {{jumps.deal}}, {{jumps.dealDeposit}}, {{jumps.bigDeal}}, {{jumps.bigDealDeposit}}, {{jumps.highAltitude}}
MEMBERSHIP / DAY PASSES: {{registration.annual}}, {{registration.annualVeteran}}, {{registration.day}}, {{registration.weekend}}, {{registration.week}}
EQUIPMENT RENTAL: {{equipment.rentalRig}}, {{equipment.studentRig}}, {{equipment.altimeter}}, {{equipment.packing}}
COURSE PRICES: {{courses.aff}}, {{courses.rejump13}}, {{courses.rejump47}}, {{courses.level8}}, {{courses.checkoutJump}}
BUNKHOUSE: {{bunkhouse.threeMan}}, {{bunkhouse.doubleSingle}}, {{bunkhouse.doubleTwo}}, {{bunkhouse.bedding}}, {{bunkhouse.rvPower}}, {{bunkhouse.rvPowerWeek}}, {{bunkhouse.tentNoPower}}
MISCELLANEOUS: {{misc.tofskMembership}}, {{misc.burbleWithdrawal}}, {{misc.familyDiscount}}, {{misc.recruiterReward}}`,
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
