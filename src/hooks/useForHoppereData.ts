import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Wind, Calendar, Smartphone } from "lucide-react";

export function useForHoppereData() {
  const { t } = useLanguage();

  const seasonInfo = [
    { label: t("forHoppere.seasonInfo.seasonStart"), value: t("forHoppere.seasonInfo.startDate"), icon: Sun },
    { label: t("forHoppere.seasonInfo.seasonEnd"), value: t("forHoppere.seasonInfo.endDate"), icon: Wind },
    { label: t("forHoppere.seasonInfo.open"), value: t("forHoppere.seasonInfo.openDays"), icon: Calendar },
    { label: t("forHoppere.seasonInfo.app"), value: "BurbleMe", icon: Smartphone },
  ];

  const quickLinks = [
    { label: t("forHoppere.quickLinks.renewal"), href: "#fornye" },
    { label: t("forHoppere.quickLinks.bunkhouse"), href: "#bunkhouse" },
    { label: t("forHoppere.quickLinks.burbleme"), href: "#burbleme" },
    { label: t("forHoppere.quickLinks.dropzoneBrief"), href: "#hoppfeltbrief" },
    { label: t("forHoppere.quickLinks.pricing"), href: "#priser" },
    { label: t("forHoppere.quickLinks.aircraft"), href: "#flyet" },
    { label: t("forHoppere.quickLinks.insurance"), href: "#forsikring" },
    { label: t("forHoppere.quickLinks.reporting"), href: "#varsling" },
    { label: t("forHoppere.quickLinks.weather"), href: "#vaer" },
  ];

  const bunkhousingPricing = [
    { name: t("forHoppere.bunkhouse.pricing.threeMan"), price: "210 kr" },
    { name: t("forHoppere.bunkhouse.pricing.doubleSingle"), price: "370 kr" },
    { name: t("forHoppere.bunkhouse.pricing.doubleTwo"), price: "520 kr" },
    { name: t("forHoppere.bunkhouse.pricing.bedding"), price: "200 kr" },
    { name: t("forHoppere.bunkhouse.pricing.rvPower"), price: "150 kr" },
    { name: t("forHoppere.bunkhouse.pricing.rvPowerWeek"), price: "600 kr" },
    { name: t("forHoppere.bunkhouse.pricing.tentNoPower"), price: "80 kr" },
  ];

  const bunkhouseRules = [
    t("forHoppere.bunkhouse.rules.checkin"),
    t("forHoppere.bunkhouse.rules.rooms"),
    t("forHoppere.bunkhouse.rules.noParty"),
    t("forHoppere.bunkhouse.rules.bedding"),
    t("forHoppere.bunkhouse.rules.billing"),
    t("forHoppere.bunkhouse.rules.girlsRoom"),
  ];

  const exitOrder = [
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

  const pricing = [
    { name: t("forHoppere.pricing.jumps.normal"), price: "385 kr", note: "" },
    { name: t("forHoppere.pricing.jumps.deal"), price: "335 kr", note: t("forHoppere.pricing.jumps.dealNote") },
    { name: t("forHoppere.pricing.jumps.bigDeal"), price: "285 kr", note: t("forHoppere.pricing.jumps.bigDealNote") },
    { name: t("forHoppere.pricing.jumps.highAlt"), price: "+60 kr", note: "" },
  ];

  const registrationFees = [
    { name: t("forHoppere.pricing.registration.annual"), price: "1 350 kr" },
    { name: t("forHoppere.pricing.registration.annualVeteran"), price: "950 kr" },
    { name: t("forHoppere.pricing.registration.day"), price: "150 kr" },
    { name: t("forHoppere.pricing.registration.weekend"), price: "250 kr" },
    { name: t("forHoppere.pricing.registration.week"), price: "750 kr" },
  ];

  const equipmentPricing = [
    { name: t("forHoppere.pricing.equipmentItems.rentalRig"), price: "215 kr" },
    { name: t("forHoppere.pricing.equipmentItems.studentRig"), price: "125 kr" },
    { name: t("forHoppere.pricing.equipmentItems.altimeter"), price: "100 kr" },
    { name: t("forHoppere.pricing.equipmentItems.packing"), price: "85 kr" },
  ];

  const coursePricing = [
    { name: t("forHoppere.pricing.courseItems.affCourse"), price: "18 990 kr" },
    { name: t("forHoppere.pricing.courseItems.rejump13"), price: "2 070 kr" },
    { name: t("forHoppere.pricing.courseItems.rejump47"), price: "1 300 kr" },
    { name: t("forHoppere.pricing.courseItems.level8"), price: "530 kr" },
    { name: t("forHoppere.pricing.courseItems.checkoutJump"), price: "1 065 kr" },
  ];

  const tandemPricing = [
    { name: t("forHoppere.pricing.tandemItems.weekday"), price: "4 690 kr" },
    { name: t("forHoppere.pricing.tandemItems.weekend"), price: "5 190 kr" },
    { name: t("forHoppere.pricing.tandemItems.video"), price: "800 kr" },
    { name: t("forHoppere.pricing.tandemItems.videoPhotos"), price: "1 290 kr" },
    { name: t("forHoppere.pricing.tandemItems.fullPackage"), price: "1 780 kr" },
  ];

  const openingHours = [
    { day: t("forHoppere.contact.hours.weekday"), hours: "10:00 - 18:00" },
    { day: t("forHoppere.contact.hours.saturday"), hours: "10:00 - 18:00" },
    { day: t("forHoppere.contact.hours.sunday"), hours: "13:00 - 18:00" },
  ];

  const faqs = [
    {
      question: t("forHoppere.faq.questions.q1.question"),
      answer: t("forHoppere.faq.questions.q1.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q2.question"),
      answer: t("forHoppere.faq.questions.q2.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q3.question"),
      answer: t("forHoppere.faq.questions.q3.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q4.question"),
      answer: t("forHoppere.faq.questions.q4.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q5.question"),
      answer: t("forHoppere.faq.questions.q5.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q6.question"),
      answer: t("forHoppere.faq.questions.q6.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q7.question"),
      answer: t("forHoppere.faq.questions.q7.answer"),
    },
    {
      question: t("forHoppere.faq.questions.q8.question"),
      answer: t("forHoppere.faq.questions.q8.answer"),
    },
  ];

  return {
    seasonInfo,
    quickLinks,
    bunkhousingPricing,
    bunkhouseRules,
    exitOrder,
    pricing,
    registrationFees,
    equipmentPricing,
    coursePricing,
    tandemPricing,
    openingHours,
    faqs,
  };
}

