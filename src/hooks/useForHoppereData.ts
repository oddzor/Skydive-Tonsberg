import { useLanguage } from "@/contexts/LanguageContext";
import { useCMSContent } from "./useCMSContent";
import { Sun, Wind, Calendar, Smartphone } from "lucide-react";
export function useForHoppereData() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
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
    { name: t("forHoppere.bunkhouse.pricing.threeMan"), price: `${content?.pricing?.forHoppere?.bunkhouse?.threeMan || 210} kr` },
    { name: t("forHoppere.bunkhouse.pricing.doubleSingle"), price: `${content?.pricing?.forHoppere?.bunkhouse?.doubleSingle || 370} kr` },
    { name: t("forHoppere.bunkhouse.pricing.doubleTwo"), price: `${content?.pricing?.forHoppere?.bunkhouse?.doubleTwo || 520} kr` },
    { name: t("forHoppere.bunkhouse.pricing.bedding"), price: `${content?.pricing?.forHoppere?.bunkhouse?.bedding || 200} kr` },
    { name: t("forHoppere.bunkhouse.pricing.rvPower"), price: `${content?.pricing?.forHoppere?.bunkhouse?.rvPower || 150} kr` },
    { name: t("forHoppere.bunkhouse.pricing.rvPowerWeek"), price: `${content?.pricing?.forHoppere?.bunkhouse?.rvPowerWeek || 600} kr` },
    { name: t("forHoppere.bunkhouse.pricing.tentNoPower"), price: `${content?.pricing?.forHoppere?.bunkhouse?.tentNoPower || 80} kr` },
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
  const faqs = content?.faqs?.forHoppere || [
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
