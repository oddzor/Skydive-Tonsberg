import { defineField, defineType } from 'sanity'

export const forHopperePricingSchema = defineType({
  name: 'forHopperePricing',
  title: 'For Hoppere Pricing',
  type: 'document',
  groups: [
    { name: 'jumps', title: 'Jumps', default: true },
    { name: 'registration', title: 'Registration' },
    { name: 'equipment', title: 'Equipment' },
    { name: 'courses', title: 'Courses' },
    { name: 'bunkhouse', title: 'Bunkhouse' },
    { name: 'misc', title: 'Misc' },
  ],
  fields: [
    defineField({
      name: 'jumps',
      title: 'Jump Prices',
      type: 'object',
      group: 'jumps',
      fields: [
        defineField({ name: 'normal', title: 'Normal (kr)', type: 'number' }),
        defineField({ name: 'deal', title: 'Deal price (kr)', type: 'number' }),
        defineField({ name: 'dealDeposit', title: 'Deal deposit (kr)', type: 'number' }),
        defineField({ name: 'bigDeal', title: 'Big Deal price (kr)', type: 'number' }),
        defineField({ name: 'bigDealDeposit', title: 'Big Deal deposit (kr)', type: 'number' }),
        defineField({ name: 'highAltitude', title: 'High Altitude surcharge (kr)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'registration',
      title: 'Registration Fees',
      type: 'object',
      group: 'registration',
      fields: [
        defineField({ name: 'annual', title: 'Annual membership (kr)', type: 'number' }),
        defineField({ name: 'annualVeteran', title: 'Annual veteran (kr)', type: 'number' }),
        defineField({ name: 'day', title: 'Day pass (kr)', type: 'number' }),
        defineField({ name: 'weekend', title: 'Weekend pass (kr)', type: 'number' }),
        defineField({ name: 'week', title: 'Week pass (kr)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment Rental',
      type: 'object',
      group: 'equipment',
      fields: [
        defineField({ name: 'rentalRig', title: 'Rental rig (kr)', type: 'number' }),
        defineField({ name: 'studentRig', title: 'Student rig (kr)', type: 'number' }),
        defineField({ name: 'altimeter', title: 'Altimeter (kr)', type: 'number' }),
        defineField({ name: 'packing', title: 'Packing (kr)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'courses',
      title: 'Course Prices',
      type: 'object',
      group: 'courses',
      fields: [
        defineField({ name: 'affCourse', title: 'AFF Course (kr)', type: 'number' }),
        defineField({ name: 'rejump13', title: 'Rejump Level 1-3 (kr)', type: 'number' }),
        defineField({ name: 'rejump47', title: 'Rejump Level 4-7 (kr)', type: 'number' }),
        defineField({ name: 'level8', title: 'Level 8 jump (kr)', type: 'number' }),
        defineField({ name: 'checkoutJump', title: 'Checkout jump (kr)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'misc',
      title: 'Miscellaneous',
      type: 'object',
      group: 'misc',
      fields: [
        defineField({ name: 'tofskMembership', title: 'TOFSK Membership (kr)', type: 'number' }),
        defineField({ name: 'burbleWithdrawal', title: 'Burble withdrawal fee (kr)', type: 'number' }),
        defineField({ name: 'recruiterReward', title: 'Recruiter reward', type: 'string' }),
        defineField({ name: 'familyDiscount', title: 'Family discount (kr)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'bunkhouse',
      title: 'Bunkhouse',
      type: 'object',
      group: 'bunkhouse',
      fields: [
        defineField({ name: 'threeMan', title: 'Three-man room per person (kr)', type: 'number' }),
        defineField({ name: 'doubleSingle', title: 'Double room — single (kr)', type: 'number' }),
        defineField({ name: 'doubleTwo', title: 'Double room — two people (kr)', type: 'number' }),
        defineField({ name: 'bedding', title: 'Bedding (kr)', type: 'number' }),
        defineField({ name: 'rvPower', title: 'RV power per night (kr)', type: 'number' }),
        defineField({ name: 'rvPowerWeek', title: 'RV power per week (kr)', type: 'number' }),
        defineField({ name: 'tentNoPower', title: 'Tent — no power (kr)', type: 'number' }),
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'For Hoppere Pricing' }
    },
  },
})
