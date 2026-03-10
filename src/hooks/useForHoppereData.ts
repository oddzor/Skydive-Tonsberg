import { useLanguage } from "@/contexts/LanguageContext";
import { useCMSContent } from "./useCMSContent";
import { useSanityFAQs, useForHoppereInfo } from "@/contexts/SanityDataContext";
import { Sun, Wind, Calendar, Smartphone } from "lucide-react";

export function useForHoppereData() {
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const sanityFAQs = useSanityFAQs('forHoppere');
  const info = useForHoppereInfo();

  const pick = (no: string | undefined, en: string | undefined) =>
    language === 'en' ? (en ?? no ?? '') : (no ?? '');

  const videoUrl = info?.videoUrl;

  const heroDescription = pick(info?.heroDescriptionNo, info?.heroDescriptionEn)
    || t("forHoppere.hero.description");
  const heroSubDescription = pick(info?.heroSubDescriptionNo, info?.heroSubDescriptionEn)
    || t("forHoppere.hero.subDescription");

  const seasonInfo = [
    {
      label: t("forHoppere.seasonInfo.seasonStart"),
      value: pick(info?.seasonStartNo, info?.seasonStartEn) || t("forHoppere.seasonInfo.startDate"),
      icon: Sun,
    },
    {
      label: t("forHoppere.seasonInfo.seasonEnd"),
      value: pick(info?.seasonEndNo, info?.seasonEndEn) || t("forHoppere.seasonInfo.endDate"),
      icon: Wind,
    },
    {
      label: t("forHoppere.seasonInfo.open"),
      value: pick(info?.openDaysNo, info?.openDaysEn) || t("forHoppere.seasonInfo.openDays"),
      icon: Calendar,
    },
    { label: t("forHoppere.seasonInfo.app"), value: "BurbleMe", icon: Smartphone },
  ];

  const quickLinks = [
    { label: t("forHoppere.quickLinks.renewal"), href: "#fornye" },
    { label: t("forHoppere.quickLinks.bunkhouse"), href: "#bunkhouse" },
    { label: t("forHoppere.quickLinks.burbleme"), href: "#burbleme" },
    { label: t("forHoppere.quickLinks.dropzoneBrief"), href: "#hoppfeltbrief" },
    { label: t("forHoppere.quickLinks.pricing"), href: "#priser" },
    { label: t("forHoppere.quickLinks.rental"), href: "#rental" },
    { label: t("forHoppere.quickLinks.aircraft"), href: "#flyet" },
    { label: t("forHoppere.quickLinks.insurance"), href: "#forsikring" },
    { label: t("forHoppere.quickLinks.reporting"), href: "#varsling" },
    { label: t("forHoppere.quickLinks.weather"), href: "#vaer" },
  ];

  const bunkhousingPricing = [
    { name: t("forHoppere.bunkhouse.pricing.threeMan"), price: `${content?.pricing?.forHoppere?.bunkhouse?.threeMan || 210} kr` },
    { name: t("forHoppere.bunkhouse.pricing.doubleSingle"), price: `${content?.pricing?.forHoppere?.bunkhouse?.doubleSingle || 370} kr` },
    { name: t("forHoppere.bunkhouse.pricing.doubleTwo"), price: `${content?.pricing?.forHoppere?.bunkhouse?.doubleTwo || 520} kr` },
    { name: t("forHoppere.bunkhouse.pricing.bedding"), price: `${content?.pricing?.forHoppere?.bunkhouse?.bedding || 200} kr` },
    { name: t("forHoppere.bunkhouse.pricing.rvPower"), price: `${content?.pricing?.forHoppere?.bunkhouse?.rvPower || 150} kr` },
    { name: t("forHoppere.bunkhouse.pricing.rvPowerWeek"), price: `${content?.pricing?.forHoppere?.bunkhouse?.rvPowerWeek || 600} kr` },
    { name: t("forHoppere.bunkhouse.pricing.tentNoPower"), price: `${content?.pricing?.forHoppere?.bunkhouse?.tentNoPower || 80} kr` },
  ];

 
  const sanityBunkhouseRules = info?.bunkhouseRules;
  const bunkhouseRules = sanityBunkhouseRules?.length
    ? sanityBunkhouseRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.bunkhouse.rules.checkin"),
        t("forHoppere.bunkhouse.rules.rooms"),
        t("forHoppere.bunkhouse.rules.noParty"),
        t("forHoppere.bunkhouse.rules.bedding"),
        t("forHoppere.bunkhouse.rules.billing"),
        t("forHoppere.bunkhouse.rules.girlsRoom"),
      ];


  const sanityExitOrder = info?.exitOrder;
  const exitOrder = sanityExitOrder?.length
    ? sanityExitOrder.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.hoppfeltbrief.exitOrder.tracking1"),
        t("forHoppere.hoppfeltbrief.exitOrder.fs"),
        t("forHoppere.hoppfeltbrief.exitOrder.freefly"),
        t("forHoppere.hoppfeltbrief.exitOrder.aff8"),
        t("forHoppere.hoppfeltbrief.exitOrder.aff17"),
        t("forHoppere.hoppfeltbrief.exitOrder.tracking2"),
        t("forHoppere.hoppfeltbrief.exitOrder.tandem"),
        t("forHoppere.hoppfeltbrief.exitOrder.pullHigh"),
        t("forHoppere.hoppfeltbrief.exitOrder.wingsuit"),
        t("forHoppere.hoppfeltbrief.exitOrder.wingsuitTL1"),
      ];


  const boardingRules = info?.boardingRules?.length
    ? info.boardingRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.hoppfeltbrief.boarding.rule1"),
        t("forHoppere.hoppfeltbrief.boarding.rule2"),
        t("forHoppere.hoppfeltbrief.boarding.rule3"),
      ];

  const inAircraftRules = info?.inAircraftRules?.length
    ? info.inAircraftRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.hoppfeltbrief.inAircraft.rule1"),
        t("forHoppere.hoppfeltbrief.inAircraft.rule2"),
        t("forHoppere.hoppfeltbrief.inAircraft.rule3"),
        t("forHoppere.hoppfeltbrief.inAircraft.rule4"),
      ];

  const landingPatternRules = info?.landingPatternRules?.length
    ? info.landingPatternRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.hoppfeltbrief.landingPattern.rule1"),
        t("forHoppere.hoppfeltbrief.landingPattern.rule2"),
        t("forHoppere.hoppfeltbrief.landingPattern.rule3"),
        t("forHoppere.hoppfeltbrief.landingPattern.rule4"),
      ];

  const outlandingRules = info?.outlandingRules?.length
    ? info.outlandingRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.hoppfeltbrief.outlanding.rule1"),
        t("forHoppere.hoppfeltbrief.outlanding.rule2"),
        t("forHoppere.hoppfeltbrief.outlanding.rule3"),
        t("forHoppere.hoppfeltbrief.outlanding.rule4"),
      ];

  const aircraftIntro = pick(info?.aircraftIntroNo, info?.aircraftIntroEn)
    || t("forHoppere.aircraft.intro");
  const aircraftHistory = pick(info?.aircraftHistoryNo, info?.aircraftHistoryEn)
    || t("forHoppere.aircraft.history");
  const aircraftRenovation = pick(info?.aircraftRenovationNo, info?.aircraftRenovationEn)
    || t("forHoppere.aircraft.renovation");

  const renewalDescription = pick(info?.renewalDescriptionNo, info?.renewalDescriptionEn)
    || t("forHoppere.renewal.description");

  const bunkhouseDescription = pick(info?.bunkhouseDescriptionNo, info?.bunkhouseDescriptionEn)
    || t("forHoppere.bunkhouse.description");

  const burbleMeDescription = pick(info?.burbleMeDescriptionNo, info?.burbleMeDescriptionEn)
    || t("forHoppere.burbleMe.description");
  const burbleMePersonalDetailsDesc = pick(info?.burbleMePersonalDetailsDescNo, info?.burbleMePersonalDetailsDescEn)
    || t("forHoppere.burbleMe.profileSetup.personalDetailsDesc");
  const burbleMeProfileNote = pick(info?.burbleMeProfileNoteNo, info?.burbleMeProfileNoteEn)
    || t("forHoppere.burbleMe.profileSetup.note");
  const burbleMeCheckInDropzoneDesc = pick(info?.burbleMeCheckInDropzoneDescNo, info?.burbleMeCheckInDropzoneDescEn)
    || t("forHoppere.burbleMe.checkIn.dropzoneDesc");
  const burbleMeCheckInFormationDesc = pick(info?.burbleMeCheckInFormationDescNo, info?.burbleMeCheckInFormationDescEn)
    || t("forHoppere.burbleMe.checkIn.formationDesc");
  const burbleMeCheckInRules = info?.burbleMeCheckInRules?.length
    ? info.burbleMeCheckInRules.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.burbleMe.checkIn.trackingRule1"),
        t("forHoppere.burbleMe.checkIn.trackingRule2"),
        t("forHoppere.burbleMe.checkIn.trackingRule3"),
      ];
  const burbleMeLoadTimeDesc = pick(info?.burbleMeLoadTimeDescNo, info?.burbleMeLoadTimeDescEn)
    || t("forHoppere.burbleMe.notifications.loadTimeDesc");
  const burbleMeOutlandingDesc = pick(info?.burbleMeOutlandingDescNo, info?.burbleMeOutlandingDescEn)
    || t("forHoppere.burbleMe.notifications.outlandingDesc");
  const burbleMeLocationDesc = pick(info?.burbleMeLocationDescNo, info?.burbleMeLocationDescEn)
    || t("forHoppere.burbleMe.notifications.locationDesc");

  const rentalDescription = pick(info?.rentalDescriptionNo, info?.rentalDescriptionEn)
    || t("forHoppere.rental.description");
  const rentalAvailable = pick(info?.rentalAvailableNo, info?.rentalAvailableEn)
    || t("forHoppere.rental.available");
  const rentalContactText = pick(info?.rentalContactTextNo, info?.rentalContactTextEn)
    || t("forHoppere.rental.contactText");
  const rentalFeatures = info?.rentalFeatures?.length
    ? info.rentalFeatures.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.rental.features.complete"),
        t("forHoppere.rental.features.maintained"),
        t("forHoppere.rental.features.aad"),
        t("forHoppere.rental.features.sizes"),
      ];
  const rentalRequirements = info?.rentalRequirements?.length
    ? info.rentalRequirements.map((r) => pick(r.no, r.en))
    : [
        t("forHoppere.rental.requirementsList.license"),
        t("forHoppere.rental.requirementsList.insurance"),
        t("forHoppere.rental.requirementsList.currency"),
      ];

  const insuranceNorwegianText = pick(info?.insuranceNorwegianTextNo, info?.insuranceNorwegianTextEn)
    || t("forHoppere.insurance.norwegianText");
  const insuranceForeignIntro = pick(info?.insuranceForeignIntroNo, info?.insuranceForeignIntroEn)
    || t("forHoppere.insurance.foreignIntro");
  const insuranceForeignBuy = pick(info?.insuranceForeignBuyNo, info?.insuranceForeignBuyEn)
    || t("forHoppere.insurance.foreignBuy");
  const insuranceForeignWarning = pick(info?.insuranceForeignWarningNo, info?.insuranceForeignWarningEn)
    || t("forHoppere.insurance.foreignWarning");

  const reportingIntro = pick(info?.reportingIntroNo, info?.reportingIntroEn)
    || t("forHoppere.reporting.intro");
  const reportingPolicy = pick(info?.reportingPolicyNo, info?.reportingPolicyEn)
    || t("forHoppere.reporting.policy");
  const reportingSystemDesc = pick(info?.reportingSystemDescNo, info?.reportingSystemDescEn)
    || t("forHoppere.reporting.systemDesc");
  const reportingSystemPath = pick(info?.reportingSystemPathNo, info?.reportingSystemPathEn)
    || t("forHoppere.reporting.systemPath");
  const reportingGroup = pick(info?.reportingGroupNo, info?.reportingGroupEn)
    || t("forHoppere.reporting.group");

  const pricing = [
    { name: t("forHoppere.pricing.jumps.normal"), price: `${content?.pricing?.forHoppere?.jumps?.normal || 385} kr`, note: "" },
    { name: t("forHoppere.pricing.jumps.deal"), price: `${content?.pricing?.forHoppere?.jumps?.deal || 335} kr`, note: `+ ${content?.pricing?.forHoppere?.jumps?.dealDeposit || 2500} ${t("forHoppere.pricing.jumps.depositSuffix")}` },
    { name: t("forHoppere.pricing.jumps.bigDeal"), price: `${content?.pricing?.forHoppere?.jumps?.bigDeal || 285} kr`, note: `+ ${content?.pricing?.forHoppere?.jumps?.bigDealDeposit || 10000} ${t("forHoppere.pricing.jumps.depositSuffix")}` },
    { name: t("forHoppere.pricing.jumps.highAlt"), price: `+${content?.pricing?.forHoppere?.jumps?.highAltitude || 60} kr`, note: "" },
  ];
  const registrationFees = [
    { name: t("forHoppere.pricing.registration.annual"), price: `${content?.pricing?.forHoppere?.registration?.annual || 1350} kr` },
    { name: t("forHoppere.pricing.registration.annualVeteran"), price: `${content?.pricing?.forHoppere?.registration?.annualVeteran || 950} kr` },
    { name: t("forHoppere.pricing.registration.day"), price: `${content?.pricing?.forHoppere?.registration?.day || 150} kr` },
    { name: t("forHoppere.pricing.registration.weekend"), price: `${content?.pricing?.forHoppere?.registration?.weekend || 250} kr` },
    { name: t("forHoppere.pricing.registration.week"), price: `${content?.pricing?.forHoppere?.registration?.week || 750} kr` },
  ];
  const equipmentPricing = [
    { name: t("forHoppere.pricing.equipmentItems.rentalRig"), price: `${content?.pricing?.forHoppere?.equipment?.rentalRig || 215} kr` },
    { name: t("forHoppere.pricing.equipmentItems.studentRig"), price: `${content?.pricing?.forHoppere?.equipment?.studentRig || 125} kr` },
    { name: t("forHoppere.pricing.equipmentItems.altimeter"), price: `${content?.pricing?.forHoppere?.equipment?.altimeter || 100} kr` },
    { name: t("forHoppere.pricing.equipmentItems.packing"), price: `${content?.pricing?.forHoppere?.equipment?.packing || 85} kr` },
  ];
  const coursePricing = [
    { name: t("forHoppere.pricing.courseItems.affCourse"), price: `${content?.pricing?.forHoppere?.courses?.affCourse || 18990} kr` },
    { name: t("forHoppere.pricing.courseItems.rejump13"), price: `${content?.pricing?.forHoppere?.courses?.rejump13 || 2070} kr` },
    { name: t("forHoppere.pricing.courseItems.rejump47"), price: `${content?.pricing?.forHoppere?.courses?.rejump47 || 1300} kr` },
    { name: t("forHoppere.pricing.courseItems.level8"), price: `${content?.pricing?.forHoppere?.courses?.level8 || 530} kr` },
    { name: t("forHoppere.pricing.courseItems.checkoutJump"), price: `${content?.pricing?.forHoppere?.courses?.checkoutJump || 1065} kr` },
  ];
  const tandemPricing = [
    { name: t("forHoppere.pricing.tandemItems.weekday"), price: `${content?.pricing?.forHoppere?.tandemPrices?.weekday || 4690} kr` },
    { name: t("forHoppere.pricing.tandemItems.weekend"), price: `${content?.pricing?.forHoppere?.tandemPrices?.weekend || 5190} kr` },
    { name: t("forHoppere.pricing.tandemItems.video"), price: `${content?.pricing?.forHoppere?.tandemPrices?.video || 800} kr` },
    { name: t("forHoppere.pricing.tandemItems.videoPhotos"), price: `${content?.pricing?.forHoppere?.tandemPrices?.videoPhotos || 1290} kr` },
    { name: t("forHoppere.pricing.tandemItems.fullPackage"), price: `${content?.pricing?.forHoppere?.tandemPrices?.fullPackage || 1780} kr` },
  ];
  const openingHours = [
    { day: t("forHoppere.contact.hours.weekday"), hours: "10:00 - 18:00" },
    { day: t("forHoppere.contact.hours.saturday"), hours: "10:00 - 18:00" },
    { day: t("forHoppere.contact.hours.sunday"), hours: "13:00 - 18:00" },
  ];
  const faqs = sanityFAQs.length > 0
    ? sanityFAQs
    : Array.from({ length: 8 }, (_, i) => ({
        question: t(`forHoppere.faq.questions.q${i + 1}.question`),
        answer: t(`forHoppere.faq.questions.q${i + 1}.answer`),
      }));

  return {
    videoUrl,
    heroDescription,
    heroSubDescription,
    seasonInfo,
    quickLinks,
    renewalDescription,
    bunkhouseDescription,
    bunkhousingPricing,
    bunkhouseRules,
    burbleMeDescription,
    burbleMePersonalDetailsDesc,
    burbleMeProfileNote,
    burbleMeCheckInDropzoneDesc,
    burbleMeCheckInFormationDesc,
    burbleMeCheckInRules,
    burbleMeLoadTimeDesc,
    burbleMeOutlandingDesc,
    burbleMeLocationDesc,
    rentalDescription,
    rentalAvailable,
    rentalContactText,
    rentalFeatures,
    rentalRequirements,
    insuranceNorwegianText,
    insuranceForeignIntro,
    insuranceForeignBuy,
    insuranceForeignWarning,
    reportingIntro,
    reportingPolicy,
    reportingSystemDesc,
    reportingSystemPath,
    reportingGroup,
    exitOrder,
    boardingRules,
    inAircraftRules,
    landingPatternRules,
    outlandingRules,
    aircraftIntro,
    aircraftHistory,
    aircraftRenovation,
    pricing,
    registrationFees,
    equipmentPricing,
    coursePricing,
    tandemPricing,
    openingHours,
    faqs,
  };
}
