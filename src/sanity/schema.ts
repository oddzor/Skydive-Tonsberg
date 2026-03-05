import { faqSchema } from './schemas/faq'
import { tandemPricingSchema } from './schemas/tandemPricing'
import { kursPricingSchema } from './schemas/kursPricing'
import { forHopperePricingSchema } from './schemas/forHopperePricing'
import { courseInfoSchema } from './schemas/courseInfo'
import { tandemInfoSchema } from './schemas/tandemInfo'
import { generalContentSchema } from './schemas/generalContent'
import { landingPageSchema } from './schemas/landingPage'
import { forHoppereInfoSchema } from './schemas/forHoppereInfo'

export const schema = {
  types: [
    faqSchema,
    tandemPricingSchema,
    kursPricingSchema,
    forHopperePricingSchema,
    courseInfoSchema,
    tandemInfoSchema,
    generalContentSchema,
    landingPageSchema,
    forHoppereInfoSchema,
  ],
}
