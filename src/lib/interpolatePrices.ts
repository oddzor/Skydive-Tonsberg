import type {
  SanityTandemPricing,
  SanityForHopperePricing,
} from '@/sanity/types'

export type PricingContext = {
  tandemPricing: SanityTandemPricing | null
  kursPricing?: null
  forHopperePricing: SanityForHopperePricing | null
}

function buildTokenMap(ctx: PricingContext): Record<string, string> {
  const map: Record<string, string> = {}
  const t = ctx.tandemPricing
  const f = ctx.forHopperePricing

  if (t) {
    map['tandem.weekday'] = String(t.weekday)
    map['tandem.weekend'] = String(t.weekend)
    map['tandem.video'] = String(t.video)
    map['tandem.videoPhotos'] = String(t.videoPhotos)
    map['tandem.fullPackage'] = String(t.fullPackage)
  }

  if (f) {
    map['jumps.normal'] = String(f.jumps?.normal ?? '')
    map['jumps.deal'] = String(f.jumps?.deal ?? '')
    map['jumps.dealDeposit'] = String(f.jumps?.dealDeposit ?? '')
    map['jumps.bigDeal'] = String(f.jumps?.bigDeal ?? '')
    map['jumps.bigDealDeposit'] = String(f.jumps?.bigDealDeposit ?? '')
    map['jumps.highAltitude'] = String(f.jumps?.highAltitude ?? '')

    map['registration.annual'] = String(f.registration?.annual ?? '')
    map['registration.annualVeteran'] = String(f.registration?.annualVeteran ?? '')
    map['registration.day'] = String(f.registration?.day ?? '')
    map['registration.weekend'] = String(f.registration?.weekend ?? '')
    map['registration.week'] = String(f.registration?.week ?? '')

    map['equipment.rentalRig'] = String(f.equipment?.rentalRig ?? '')
    map['equipment.studentRig'] = String(f.equipment?.studentRig ?? '')
    map['equipment.altimeter'] = String(f.equipment?.altimeter ?? '')
    map['equipment.packing'] = String(f.equipment?.packing ?? '')

    map['courses.aff'] = String(f.courses?.affCourse ?? '')
    map['courses.rejump13'] = String(f.courses?.rejump13 ?? '')
    map['courses.rejump47'] = String(f.courses?.rejump47 ?? '')
    map['courses.level8'] = String(f.courses?.level8 ?? '')
    map['courses.checkoutJump'] = String(f.courses?.checkoutJump ?? '')

    map['bunkhouse.threeMan'] = String(f.bunkhouse?.threeMan ?? '')
    map['bunkhouse.doubleSingle'] = String(f.bunkhouse?.doubleSingle ?? '')
    map['bunkhouse.doubleTwo'] = String(f.bunkhouse?.doubleTwo ?? '')
    map['bunkhouse.bedding'] = String(f.bunkhouse?.bedding ?? '')
    map['bunkhouse.rvPower'] = String(f.bunkhouse?.rvPower ?? '')
    map['bunkhouse.rvPowerWeek'] = String(f.bunkhouse?.rvPowerWeek ?? '')
    map['bunkhouse.tentNoPower'] = String(f.bunkhouse?.tentNoPower ?? '')

    map['misc.tofskMembership'] = String(f.misc?.tofskMembership ?? '')
    map['misc.burbleWithdrawal'] = String(f.misc?.burbleWithdrawal ?? '')
    map['misc.recruiterReward'] = String(f.misc?.recruiterReward ?? '')
    map['misc.familyDiscount'] = String(f.misc?.familyDiscount ?? '')
  }

  return map
}

/**
 * Replaces {{token}} placeholders in FAQ answer text with live pricing values.
 * Unknown tokens or tokens with no data are left as-is so editors can spot them.
 */
export function interpolatePrices(text: string, ctx: PricingContext): string {
  const map = buildTokenMap(ctx)
  return text.replace(/\{\{([^}]+)\}\}/g, (match, key: string) => {
    const value = map[key.trim()]
    return value !== undefined && value !== '' ? value : match
  })
}
