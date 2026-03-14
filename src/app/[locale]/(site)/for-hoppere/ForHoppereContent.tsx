"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale-href";
import { useForHoppereData } from "@/hooks/useForHoppereData";
import { useCMSContent } from "@/hooks/useCMSContent";
import { ForHoppereNav } from "@/components/for-hoppere/ForHoppereNav";
import { VideoEmbed } from "@/components/shared";
import {
  Plane,
  Calendar,
  Users,
  Briefcase,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Clock,
  ShoppingBag,
  Home,
  CreditCard,
  Shield,
  FileText,
  AlertCircle,
  Smartphone,
  X,
  ZoomIn,
  Phone,
  Mail,
  Heart,
  Camera,
  CloudSun,
  Bell,
  MessageCircle,
  Facebook,
  Info,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const getHoppfeltbriefImages = (t: (key: string) => string) => [
  {
    src: "/hoppfeltbrief1.webp",
    alt: t("forHoppere.hoppfeltbrief.images.airspaceAlt"),
    title: t("forHoppere.hoppfeltbrief.images.airspace"),
  },
  {
    src: "/hoppfeltbrief2.webp",
    alt: t("forHoppere.hoppfeltbrief.images.exitOrderAlt"),
    title: t("forHoppere.hoppfeltbrief.images.exitOrder"),
  },
  {
    src: "/hoppfeltbrief3.webp",
    alt: t("forHoppere.hoppfeltbrief.images.landingAreasAlt"),
    title: t("forHoppere.hoppfeltbrief.images.landingAreas"),
  },
];
export function ForHoppereContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const { content } = useCMSContent();
  const {
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
  } = useForHoppereData();
  const hoppfeltbriefImages = getHoppfeltbriefImages(t);
  return (
    <>
      <ForHoppereNav />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] cursor-default"
            >
              <Image
                src={selectedImage}
                alt="Hoppfeltbrief"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-leaf/10 rounded-full text-leaf border border-leaf/30">
                {t("forHoppere.hero.badge")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                {t("forHoppere.hero.title")}{" "}
                <span className="text-gradient">{t("forHoppere.hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {heroDescription}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mt-4">
                {heroSubDescription}
              </p>
            </div>

            <VideoEmbed
              videoId={videoUrl}
              title={t("forHoppere.hero.title")}
              className="mb-8"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <Calendar className="w-10 h-10 text-sky mb-3" />
                  <h3 className="font-bold text-lg mb-2">{t('forHoppere.cards.calendar.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('forHoppere.cards.calendar.desc')}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link href={localePath(language, 'hoppkalender')}>
                      <ExternalLink className="mr-2 w-4 h-4" />
                      {t('forHoppere.cards.calendar.button')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <DollarSign className="w-10 h-10 text-sky mb-3" />
                  <h3 className="font-bold text-lg mb-2">{t('forHoppere.cards.pricing.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('forHoppere.cards.pricing.desc')}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a href="#priser">
                      {t('forHoppere.cards.pricing.button')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-sky text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seasonInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <info.icon className="w-6 h-6 text-white/80" />
                <div>
                  <p className="text-sm text-white/70">{info.label}</p>
                  <p className="font-semibold">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground bg-background rounded-full border hover:border-sky transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="fornye" className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.renewal.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("forHoppere.renewal.title")} <span className="text-gradient">{t("forHoppere.renewal.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {renewalDescription}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
            >
              <a
                href="https://nlf.no/grener/fallskjerm/Medlem/minidrett/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 w-5 h-5" />
                {t("forHoppere.renewal.button")}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="bunkhouse" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t("forHoppere.bunkhouse.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.bunkhouse.title")} <span className="text-gradient">{t("forHoppere.bunkhouse.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {bunkhouseDescription}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
            >
              <a
                href="https://www.supersaas.com/schedule/SkydiveTonsberg/Bunkhouse"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Home className="mr-2 w-5 h-5" />
                {t("forHoppere.bunkhouse.bookButton")}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <Card className="border-0 shadow-lg flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-sky" />
                    {t("forHoppere.bunkhouse.rulesTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-3">
                    {bunkhouseRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      {t("forHoppere.bunkhouse.contactText")}{" "}
                      <a href="mailto:info@hoppfallskjerm.no" className="text-sky hover:underline">
                        info@hoppfallskjerm.no
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <Card className="border-0 shadow-lg flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky" />
                    {t("forHoppere.bunkhouse.pricingTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bunkhousingPricing.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-semibold text-sky">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      {t("forHoppere.bunkhouse.warningText")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="burbleme" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.burbleMe.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.burbleMe.title")} <span className="text-gradient">{t("forHoppere.burbleMe.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              {burbleMeDescription}
            </p>
            <Button
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold"
            >
              <a
                href="https://dzm.burblesoft.eu/jmp?dz_id=551"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="mr-2 w-5 h-5" />
                {t("forHoppere.burbleMe.openButton")}
              </a>
            </Button>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-sky" />
                    {t("forHoppere.burbleMe.profileSetup.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.profileSetup.personalDetails")}</h4>
                    <p className="text-sm text-muted-foreground">{burbleMePersonalDetailsDesc}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.profileSetup.editCredentials")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>{t("forHoppere.burbleMe.profileSetup.licenceType")}</strong></li>
                      <li>• <strong>{t("forHoppere.burbleMe.profileSetup.licenceNumber")}</strong></li>
                      <li>• <strong>{t("forHoppere.burbleMe.profileSetup.memberNumber")}</strong></li>
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                    {burbleMeProfileNote}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-sky" />
                    {t("forHoppere.burbleMe.checkIn.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.checkIn.dropzone")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {burbleMeCheckInDropzoneDesc}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.checkIn.formation")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {burbleMeCheckInFormationDesc}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">{t("forHoppere.burbleMe.checkIn.trackingRules")}</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {burbleMeCheckInRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="w-5 h-5 text-sky" />
                    {t("forHoppere.burbleMe.notifications.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.notifications.loadTime")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {burbleMeLoadTimeDesc}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.notifications.outlanding")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {burbleMeOutlandingDesc}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.burbleMe.notifications.location")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {burbleMeLocationDesc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="hoppfeltbrief" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t("forHoppere.hoppfeltbrief.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.hoppfeltbrief.title")} <span className="text-gradient">{t("forHoppere.hoppfeltbrief.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("forHoppere.hoppfeltbrief.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {hoppfeltbriefImages.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedImage(image.src)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative aspect-4/3 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium text-center">
                    {image.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-12">
            {t("forHoppere.hoppfeltbrief.clickToZoom")}
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("forHoppere.hoppfeltbrief.exitOrderTitle")}</h3>
              <Card className="border-0 shadow-lg flex-1">
                <CardContent className="p-6">
                  <ol className="space-y-2">
                    {exitOrder.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-sky text-white text-sm flex items-center justify-center font-semibold shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                    {t("forHoppere.hoppfeltbrief.exitOrderNote")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("forHoppere.hoppfeltbrief.proceduresTitle")}</h3>
              <Card className="border-0 shadow-lg flex-1">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.hoppfeltbrief.boarding.title")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {boardingRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.hoppfeltbrief.inAircraft.title")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {inAircraftRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.hoppfeltbrief.landingPattern.title")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {landingPatternRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.hoppfeltbrief.outlanding.title")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {outlandingRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="priser" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.pricing.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.pricing.title")} <span className="text-gradient">{t("forHoppere.pricing.titleHighlight")}</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            <Card className="border-0 shadow-lg overflow-hidden p-0">
              <CardHeader className="bg-sky text-white">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  {t("forHoppere.pricing.jumpPrices")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6">
                <ul className="space-y-3">
                  {pricing.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-foreground">{item.name}</span>
                        {item.note && (
                          <span className="block text-xs text-muted-foreground">{item.note}</span>
                        )}
                      </div>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

              <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-sky" />
                  {t("forHoppere.pricing.registrationFees")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {registrationFees.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-sky" />
                  {t("forHoppere.pricing.equipment")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {equipmentPricing.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-sky" />
                  {t("forHoppere.pricing.tandem")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tandemPricing.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-sky" />
                  {t("forHoppere.pricing.courses")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {coursePricing.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-sky" />
                  {t("forHoppere.pricing.misc")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{t("forHoppere.pricing.miscItems.membership")}</span>
                    <span className="font-semibold text-sky">{content?.pricing?.forHoppere?.misc?.tofskMembership || 350} kr</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{t("forHoppere.pricing.miscItems.withdrawal")}</span>
                    <span className="font-semibold text-sky">{content?.pricing?.forHoppere?.misc?.burbleWithdrawal || 100} kr</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{t("forHoppere.pricing.miscItems.referTandem")}</span>
                    <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.recruiterReward || "2 gratishopp"}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{t("forHoppere.pricing.miscItems.referAFF")}</span>
                    <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.recruiterReward || "2 gratishopp"}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">{t("forHoppere.pricing.miscItems.familyDiscount")}</span>
                    <span className="font-semibold text-leaf">{content?.pricing?.forHoppere?.misc?.familyDiscount || 500} kr</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-sky shadow-lg">
              <CardHeader className="bg-sky text-white">
                <CardTitle>{t("forHoppere.pricing.deals.title")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-muted rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.pricing.deals.dealTitle")}</h4>
                    <p className="text-2xl font-bold text-sky mb-2">{t("forHoppere.pricing.deals.dealPrice")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("forHoppere.pricing.deals.dealDesc")}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">{t("forHoppere.pricing.deals.bigDealTitle")}</h4>
                    <p className="text-2xl font-bold text-sky mb-2">{t("forHoppere.pricing.deals.bigDealPrice")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("forHoppere.pricing.deals.bigDealDesc")}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-foreground">
                    <AlertCircle className="w-4 h-4 inline mr-2 text-destructive" />
                    {t("forHoppere.pricing.deals.warning")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="rental" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.rental.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.rental.title")} <span className="text-gradient">{t("forHoppere.rental.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {rentalDescription}
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-sky" />
                    {t("forHoppere.rental.included")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {rentalAvailable}
                  </p>
                  <ul className="space-y-3">
                    {rentalFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-foreground mb-3">{t("forHoppere.rental.requirements")}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {rentalRequirements.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky" />
                    {t("forHoppere.pricing.equipment")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-foreground">{t("forHoppere.rental.pricing.rental")}</span>
                        <span className="text-2xl font-bold text-sky">{content?.pricing?.forHoppere?.equipment?.rentalRig || 215} kr</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t("forHoppere.rental.pricing.perJump")}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-foreground">{t("forHoppere.rental.pricing.student")}</span>
                        <span className="text-2xl font-bold text-sky">{content?.pricing?.forHoppere?.equipment?.studentRig || 125} kr</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t("forHoppere.rental.pricing.perJump")}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-sky/10 rounded-xl border border-sky/20">
                    <p className="text-sm text-foreground">
                      <Info className="w-4 h-4 inline mr-2" />
                      {rentalContactText}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-semibold"
                  >
                    <a
                      href="https://www.supersaas.com/schedule/SkydiveTonsberg/Rental_Rigs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Briefcase className="mr-2 w-5 h-5" />
                      {t("forHoppere.rental.bookButton")}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="flyet" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.aircraft.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("forHoppere.aircraft.title")} <span className="text-gradient">{t("forHoppere.aircraft.titleHighlight")}</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {aircraftIntro}
              </p>
              <p className="text-muted-foreground mb-6">
                {aircraftHistory}
              </p>
              <p className="text-muted-foreground mb-6">
                {aircraftRenovation}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">20</p>
                  <p className="text-sm text-muted-foreground">{t("forHoppere.aircraft.stats.jumpers")}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">10 min</p>
                  <p className="text-sm text-muted-foreground">{t("forHoppere.aircraft.stats.climbTime")}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">22 000+</p>
                  <p className="text-sm text-muted-foreground">{t("forHoppere.aircraft.stats.hours")}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">1968</p>
                  <p className="text-sm text-muted-foreground">{t("forHoppere.aircraft.stats.year")}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                {t("forHoppere.aircraft.care")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/ln-jmp.webp"
                alt={t("forHoppere.aircraft.alt")}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="forsikring" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t("forHoppere.insurance.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("forHoppere.insurance.title")} <span className="text-gradient">{t("forHoppere.insurance.titleHighlight")}</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-leaf" />
                    {t("forHoppere.insurance.norwegianTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {insuranceNorwegianText}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-sky" />
                    {t("forHoppere.insurance.foreignTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {insuranceForeignIntro}
                  </p>
                  <p className="text-muted-foreground">
                    {insuranceForeignBuy}
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      {insuranceForeignWarning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="varsling" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
                {t("forHoppere.reporting.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("forHoppere.reporting.title")}
              </h2>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  {reportingIntro}
                </p>
                <p className="text-muted-foreground mb-6">
                  {reportingPolicy}
                </p>
                <div className="p-6 bg-muted rounded-xl mb-6">
                  <h4 className="font-semibold text-foreground mb-3">{t("forHoppere.reporting.systemTitle")}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {reportingSystemDesc}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {reportingSystemPath}
                  </p>
                  <Button asChild variant="outline">
                    <a
                      href="https://www.idrettsforbundet.no/tema/varsling/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 w-4 h-4" />
                      {t("forHoppere.reporting.button")}
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reportingGroup}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="vaer" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t("forHoppere.weather.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("forHoppere.weather.title")} <span className="text-gradient">{t("forHoppere.weather.titleHighlight")}</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <Camera className="w-12 h-12 text-sky mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{t("forHoppere.weather.webcam")}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t("forHoppere.weather.webcamDesc")}
                  </p>
                  <Button asChild variant="outline">
                    <a href="http://79.161.215.227/Cam2/ENJB01.htm" target="_blank" rel="noopener noreferrer">
                      {t("forHoppere.weather.webcamButton")}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <CloudSun className="w-12 h-12 text-sky mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{t("forHoppere.weather.forecast")}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t("forHoppere.weather.forecastDesc")}
                  </p>
                  <Button asChild variant="outline">
                    <a href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-211102/Norge/Vestfold%20og%20Telemark/T%C3%B8nsberg/Jarlsberg" target="_blank" rel="noopener noreferrer">
                      {t("forHoppere.weather.forecastButton")}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-leaf shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-leaf mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{t("forHoppere.weather.grassroots.title")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t("forHoppere.weather.grassroots.desc")}
                </p>
                <Button asChild className="bg-leaf hover:bg-leaf/90 text-white">
                  <a href="https://www.norsk-tipping.no/grasrotandelen" target="_blank" rel="noopener noreferrer">
                    {t("forHoppere.weather.grassroots.button")}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t("forHoppere.faq.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("forHoppere.faq.title")} <span className="text-gradient">{t("forHoppere.faq.titleHighlight")}</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {t("forHoppere.contact.title")} <span className="text-gradient">{t("forHoppere.contact.titleHighlight")}</span>
              </h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-sky shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("forHoppere.contact.address")}</p>
                      <p className="text-muted-foreground">{t("forHoppere.contact.addressValue")}</p>
                      <p className="text-sm text-muted-foreground">{t("forHoppere.contact.orgNumber")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-sky shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("forHoppere.contact.phone")}</p>
                      <a href="tel:+4733380670" className="text-muted-foreground hover:text-sky">
                        33 38 06 70
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-sky shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("forHoppere.contact.email")}</p>
                      <a href="mailto:info@hoppfallskjerm.no" className="text-muted-foreground hover:text-sky">
                        info@hoppfallskjerm.no
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-sky shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("forHoppere.contact.openingHours")}</p>
                      {openingHours.map((item, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {item.day}: {item.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {t("forHoppere.contact.linksTitle")} <span className="text-gradient">{t("forHoppere.contact.linksTitleHighlight")}</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Link href={localePath(language, 'hoppkalender')}>
                    <Calendar className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.calendar")}</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://dzm.burblesoft.eu/jmp?dz_id=551" target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.burbleme")}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://store.burblesoft.com/?dz_id=551" target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.shop")}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://nlf.no/grener/fallskjerm/Medlem/minidrett/" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.minIdrett")}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://www.facebook.com/TonsbergFallskjermklubb" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.facebook")}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://www.jarlsbergluftsportssenter.no/" target="_blank" rel="noopener noreferrer">
                    <Info className="w-6 h-6 text-sky" />
                    <span>{t("forHoppere.contact.links.handbook")}</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-brand">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <Plane className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Vi sees i lufta!
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Sjekk hoppkalenderen og bli med oss for noen fantastiske hopp over Vestfold.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold px-8"
              >
                <Link href={localePath(language, 'hoppkalender')}>
                  <Calendar className="mr-2 w-5 h-5" />
                  {t("forHoppere.cta.calendarButton")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href={localePath(language, 'kontakt')}>
                  {t("forHoppere.cta.contactButton")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
