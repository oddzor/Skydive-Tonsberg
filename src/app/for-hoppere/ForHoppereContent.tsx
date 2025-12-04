"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Calendar,
  Users,
  Briefcase,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sun,
  Wind,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const hoppfeltbriefImages = [
  {
    src: "/hoppfeltbrief1.webp",
    alt: "Hoppfeltbrief - Luftrom og landingsmønster",
    title: "Luftrom og landingsmønster",
  },
  {
    src: "/hoppfeltbrief2.webp",
    alt: "Hoppfeltbrief - Exitrekkefølge",
    title: "Venteområder og landingsmønster",
  },
  {
    src: "/hoppfeltbrief3.webp",
    alt: "Hoppfeltbrief - Landingsområder",
    title: "Landingsområder",
  },
];

const facilities = [
  {
    title: "Twin Otter LN-JMP",
    description: "Norges største og beste hoppfly med plass til 20 hoppere. Til 12 500 fot på 10 minutter!",
    icon: Plane,
  },
  {
    title: "Bunkhouse",
    description: "16 soveplasser – 7 rom med senger, sengetøy og alt du trenger. Fra 210 kr/natt.",
    icon: Home,
  },
  {
    title: "Gjestehoppere",
    description: "Velkommen til Jarlsberg! Registrer deg i resepsjonen og sett opp BurbleMe.",
    icon: Users,
  },
  {
    title: "Flott beliggenhet",
    description: "Ved E18 utenfor Tønsberg med fantastisk utsikt over Oslofjorden og skjærgården.",
    icon: MapPin,
  },
];

const pricing = [
  { name: "Normalhopp", price: "385 kr", note: "" },
  { name: "Hopperdeal", price: "335 kr", note: "+ 2500 kr innskudd" },
  { name: "Storhopperdeal", price: "285 kr", note: "+ 10 000 kr innskudd" },
  { name: "15 000 fot", price: "+60 kr", note: "" },
];

const registrationFees = [
  { name: "Årsavgift", price: "1 350 kr" },
  { name: "Årsavgift veteraner/studenter", price: "950 kr" },
  { name: "Dagsavgift", price: "150 kr" },
  { name: "Helgeavgift (lør+søn)", price: "250 kr" },
  { name: "Ukesavgift (7 dager)", price: "750 kr" },
];

const equipmentPricing = [
  { name: "Leierigg per hopp", price: "215 kr" },
  { name: "Leierigg elever per hopp", price: "125 kr" },
  { name: "Høydemåler (ARESII), per dag", price: "100 kr" },
  { name: "Pakk sportsrigg", price: "85 kr" },
];

const bunkhousingPricing = [
  { name: "3-manns rom, per natt", price: "210 kr" },
  { name: "Dobbeltrom single, per natt", price: "370 kr" },
  { name: "Dobbeltrom to pers., per natt", price: "520 kr" },
  { name: "Sengetøy og utvask (obligatorisk)", price: "200 kr" },
  { name: "Bobil/vogn med strøm, per døgn", price: "150 kr" },
  { name: "Bobil/vogn med strøm, per uke", price: "600 kr" },
  { name: "Telt/bil/vogn uten strøm, per døgn", price: "80 kr" },
];

const coursePricing = [
  { name: "Fallskjermkurs AFF inkl vindtunnel", price: "18 990 kr" },
  { name: "Omhopp Nivå 1-3", price: "2 070 kr" },
  { name: "Omhopp Nivå 4-7", price: "1 300 kr" },
  { name: "Nivå 8 (inkl riggleie)", price: "530 kr" },
  { name: "Utsjekkshopp Nivå 8", price: "1 065 kr" },
];

const tandemPricing = [
  { name: "Tandem ukedager", price: "4 690 kr" },
  { name: "Tandem lør/søn", price: "5 190 kr" },
  { name: "Video", price: "800 kr" },
  { name: "Video og bilder", price: "1 290 kr" },
  { name: "Full videopakke", price: "1 780 kr" },
];

const exitOrder = [
  "Trackinggruppe 1",
  "FS/Mage-grupper",
  "Freefly",
  "AFF Nivå 8",
  "AFF Nivå 1-7",
  "Trackinggruppe 2",
  "Tandem",
  "Trekke høyt (maks 5000 fot)",
  "Wingsuit/trackingsuit, øst",
  "Wingsuit med TL1, øst",
];

const seasonInfo = [
  { label: "Sesongstart", value: "17. april", icon: Sun },
  { label: "Sesongslutt", value: "Medio oktober", icon: Wind },
  { label: "Åpent", value: "4-7 dager/uke", icon: Calendar },
  { label: "App", value: "BurbleMe", icon: Smartphone },
];

const openingHours = [
  { day: "Mandag - Fredag", hours: "10:00 - 18:00" },
  { day: "Lørdag", hours: "10:00 - 18:00" },
  { day: "Søndag", hours: "13:00 - 18:00" },
];

const faqs = [
  {
    question: "Hvordan fornyer jeg medlemskapet?",
    answer: "Gå til nlf.no/grener/fallskjerm/Medlem/minidrett/ for å fornye medlemskap, forsikring og kompetansebevis.",
  },
  {
    question: "Jeg har ikke hoppet på en stund, hva må jeg gjøre?",
    answer: "Det avhenger av hvilket kompetansebevis du hadde sist du hoppet, og hvor lenge det er siden. Se tabell i Håndboka del 300, fallskjermlisenser.",
  },
  {
    question: "Hva er vedlikeholdskravene for kompetansebeviset mitt?",
    answer: "A-bevis: 20 hopp siste år. B-bevis: 20 hopp siste år. C-bevis: 40 hopp siste år. D-bevis: 40 hopp siste år. Se Håndboka del 300 for alle detaljer.",
  },
  {
    question: "Kan jeg sette inn penger på min Burblekonto på Internett?",
    answer: "Nei, ikke enda. Du må sette inn penger i resepsjonen (debetkort eller cash), eller overføre til vår konto 1594.16.71664.",
  },
  {
    question: "Hva med forsikring for utenlandske hoppere?",
    answer: "Norske hoppere er dekket gjennom NLF. Utenlandske må ha gyldig tredjeparts ansvarsforsikring. Uten dokumentasjon kan du kjøpe NLFs forsikring for 503 NOK (30 dager). For hoppere utenfor EU/EØS anbefaler vi sterkt reiseforsikring som dekker medisinsk behandling i Norge.",
  },
  {
    question: "Hva er reglene for tracking og wingsuit?",
    answer: "Maks 3 horisontale grupper per løft: Maks 2 Angle (tracking) + Maks 1 WS/Tracksuit. Sjekk Jumper Manifest Display før du manifesterer deg. Må du tracke når det allerede er to grupper må du koordinere eller finne på noe annet. Bruk 'Angle' under Formation, ikke 'Tracking'.",
  },
  {
    question: "Jeg sliter med Min Idrett. Hva kan jeg gjøre?",
    answer: "Se tips fra NLF på deres hjemmesider. Husk at det nå heter 'kompetansebevis' og ikke 'lisens' eller 'sertifikat'. Ordet 'lisens' i MinIdrett betyr 'forsikring'.",
  },
  {
    question: "Hvor finner jeg Driftshåndbok JLS?",
    answer: "Driftshåndboka finner du på jarlsbergluftsportssenter.no. Når du registrerer deg på Skydive Tønsberg må du signere på at du har gjort deg kjent med denne.",
  },
];

export function ForHoppereContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Image Modal */}
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/for-hoppere-hero.webp"
            alt="Erfarne hoppere i formasjon"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-leaf/20 backdrop-blur-sm rounded-full text-white border border-leaf/30"
            >
              For erfarne hoppere
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Kom og få sol, sommer og{" "}
              <span className="text-gradient">fallskjermhopp!</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Velkommen til Skydive Tønsberg på Jarlsberg flyplass – 
              med Norges største og beste hoppfly, Twin Otter LN-JMP!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8"
              >
                <a
                  href="https://www.skydivetonsberg.no/hoppkalender-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hoppkalender
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a
                  href="https://dzm.burblesoft.eu/jmp?dz_id=551"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Smartphone className="mr-2 w-5 h-5" />
                  BurbleMe
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Season Info Bar */}
      <section className="py-8 bg-sky text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seasonInfo.map((info, index) => (
              <motion.div
                key={info.label}
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

      {/* Quick Links Navigation */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Slik fornyer du", href: "#fornye" },
              { label: "Bunkhouse", href: "#bunkhouse" },
              { label: "BurbleMe", href: "#burbleme" },
              { label: "Hoppfeltbrief", href: "#hoppfeltbrief" },
              { label: "Priser", href: "#priser" },
              { label: "Flyet", href: "#flyet" },
              { label: "Forsikring", href: "#forsikring" },
              { label: "Varsling", href: "#varsling" },
              { label: "Vær & Kamera", href: "#vaer" },
            ].map((link) => (
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

      {/* Slik fornyer du */}
      <section id="fornye" className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Medlemskap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Slik fornyer du <span className="text-gradient">medlemskapet</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Forny medlemskap, forsikring og kompetansebevis via Min Idrett.
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
                Gå til Min Idrett
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bunkhouse Section */}
      <section id="bunkhouse" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              Overnatting
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Bunkhouse – <span className="text-gradient">16 soveplasser</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Vi har 7 rom tilgjengelig for hoppere. Book i resepsjonen eller via e-post.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-sky" />
                    Regler for Bunkhouse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Innsjekk og utsjekk i resepsjonen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>5 rom med enkeltseng + køyeseng, 2 rom med dobbelseng (140 cm)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Dette er til soving, ikke party – festen foregår et annet sted</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Vi holder madrass, dyne, pute og sengetøy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Vi trekker deg i Burble for overnattingen(e)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Rom nr. 3 er kun for jenter</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Kommer du utenom åpningstid? Send oss en e-post til{" "}
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
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky" />
                    Priser overnatting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bunkhousingPricing.map((item) => (
                      <li key={item.name} className="flex justify-between items-center">
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-semibold text-sky">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      All overnatting skal forhåndsregistreres i resepsjonen. Brudd på dette medfører 500 kr i gebyr.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BurbleMe Section */}
      <section id="burbleme" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Manifestering
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              BurbleMe – <span className="text-gradient">manifester deg selv!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Du trenger BurbleMe for å hoppe på Skydive Tønsberg. Last ned fra AppStore eller Google Play.
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
                Åpne BurbleMe Web
              </a>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Setup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-sky" />
                    Sett opp profilen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Personal Details</h4>
                    <p className="text-sm text-muted-foreground">Fyll ut all personalia. Husk å trykke Update nederst.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Edit Credentials</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Licence Type:</strong> Velg ditt kompetansebevis</li>
                      <li>• <strong>Licence number:</strong> I2, AFF-I, MK, Demo osv.</li>
                      <li>• <strong>Member Number:</strong> Din Personid fra Min Idrett (6-7 siffer)</li>
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                    OBS! Du får ikke manifestert deg før profilen er riktig satt opp og vi har godkjent deg i resepsjonen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Check In & Formation */}
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
                    Check In & Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Dropzone & Check In</h4>
                    <p className="text-sm text-muted-foreground">
                      Velg "Skydive Tønsberg" som Dropzone øverst i appen, deretter Check In før du manifesterer.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Velg Formation først!</h4>
                    <p className="text-sm text-muted-foreground">
                      Velg alltid Formation før du velger løft. Hoppmester og TøFSK liker å vite hva du skal gjøre.
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Tracking / WS regler:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Maks 2 Angle (tracking) grupper</li>
                      <li>• Maks 1 WS/Tracksuit gruppe</li>
                      <li>• Bruk "Angle", ikke "Tracking" under Formation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications & Safety */}
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
                    Varsling & Sikkerhet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Load Time varsler</h4>
                    <p className="text-sm text-muted-foreground">
                      Still inn Badge og Alarm for å få varsel på 5 og 10 min call.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Ved utelanding</h4>
                    <p className="text-sm text-muted-foreground">
                      Bruk "Contact DZ/Emergency" så manifest vet hvor du er. Ha Manifest Notifications påslått!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Location tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Slå på "Allow Burble to track my location when I am on a load" under Settings for ekstra sikkerhet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hoppfeltbrief & Exit Order */}
      <section id="hoppfeltbrief" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              Du skal kunne hoppfeltbriefen!
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hoppfeltbrief & <span className="text-gradient">prosedyrer</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Lokale forhold og bestemmelser for hopping på Jarlsberg flyplass.
            </p>
          </motion.div>

          {/* Hoppfeltbrief Images */}
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
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium text-center">
                    {image.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-12">
            Klikk på bildene for å se dem i full størrelse
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Exit Order */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Exitrekkefølge</h3>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <ol className="space-y-2">
                    {exitOrder.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-sky text-white text-sm flex items-center justify-center font-semibold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                    Tid mellom gruppene er ca 7-9 sekunder hvis ikke annet er sagt av hoppmester.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Procedures */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Prosedyrer</h3>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Boarding (10 min call)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Møt Hoppmester ved innlastningsområdet, ferdig påselet</li>
                      <li>• Still deg opp med din frittfallgruppe</li>
                      <li>• Planlagte høyhastighetslandinger: Meld fra til HM</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">I flyet</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Alle fastspent med hjelm på til 1500 fot</li>
                      <li>• Sett deg oppreist i ryggen så alle får plass</li>
                      <li>• Gi elever/tandemer plass fra 9000 fot</li>
                      <li>• Rød lampe = åpne døra, Grønn = hopp!</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Landingsmønster</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Runet går alltid rett sør eller nord, parallelt med stripa</li>
                      <li>• Maks 90° sving for landing mot nord eller sør</li>
                      <li>• Ikke kryss stripa under 300 fot (i forlengelsen: 1000 fot)</li>
                      <li>• Maks trekkhøyde: 5000 fot (delt luftrom med Torp)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Utelanding</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Meld fra med BurbleMe så vi vet hvor du er</li>
                      <li>• Følg traktorspor, tråkk ned minst mulig! (500 kr gebyr)</li>
                      <li>• Pass opp for kuene i nordenden – de kan være farlige!</li>
                      <li>• Meld fra til HFL straks du er tilbake</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="priser" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Priser 2025
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Priser, dealer og <span className="text-gradient">avgifter</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Hop prices */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-sky text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Hoppriser
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {pricing.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
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

            {/* Registration fees */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-sky" />
                  Registreringsavgift
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {registrationFees.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-sky" />
                  Utstyr
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {equipmentPricing.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tandem */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-sky" />
                  Tandem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tandemPricing.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course prices */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-sky" />
                  Kurs / Elever
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {coursePricing.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="text-foreground text-sm">{item.name}</span>
                      <span className="font-semibold text-sky">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Misc */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-sky" />
                  Diverse / Verving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Medlemsavgift TøFSK</span>
                    <span className="font-semibold text-sky">350 kr</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Uttak Burble</span>
                    <span className="font-semibold text-sky">100 kr</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Verve tandem</span>
                    <span className="font-semibold text-leaf">2 gratishopp</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Verve AFF-elev</span>
                    <span className="font-semibold text-leaf">2 gratishopp</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-foreground text-sm">Familierabatt tandem</span>
                    <span className="font-semibold text-leaf">500 kr</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Hopper Deals */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-sky shadow-lg">
              <CardHeader className="bg-sky text-white">
                <CardTitle>Hopperdealer – spar penger!</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-muted rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Hopperdeal</h4>
                    <p className="text-2xl font-bold text-sky mb-2">335 kr/hopp</p>
                    <p className="text-sm text-muted-foreground">
                      Innskudd kr 2 500 → 50 kr avslag på hvert hopp. 
                      Break even ved 50 hopp.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Storhopperdeal</h4>
                    <p className="text-2xl font-bold text-sky mb-2">285 kr/hopp</p>
                    <p className="text-sm text-muted-foreground">
                      Innskudd kr 10 000 → 100 kr avslag på hvert hopp. 
                      Break even ved 100 hopp. Lønner seg ved 150+ hopp.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-foreground">
                    <AlertCircle className="w-4 h-4 inline mr-2 text-destructive" />
                    <strong>OBS!</strong> Du kjøper hopperdealer på egen risiko! Ved arrangementer med høyere slotpriser gjelder ikke dealene. 
                    Får du legeattest på at du ikke kan hoppe mer denne sesongen, gjør vi om til normalpris.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Twin Otter Section */}
      <section id="flyet" className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Flyet
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Twin Otter – <span className="text-gradient">verdens beste hoppfly!</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Vi er svært stolte av flyet vårt – <strong>LN-JMP</strong> – en nyoverhalt Twin Otter med plass til 20 hoppere. 
                Flytypen heter DHC6-200, og JMP ble produsert på De Havilland-fabrikken i Canada i 1968.
              </p>
              <p className="text-muted-foreground mb-6">
                JMP kom til Jarlsberg i 2006 og er nå eid av Hoppfly AS, hvor TøFSK har 10% og hovedeier er Per Kølner.
              </p>
              <p className="text-muted-foreground mb-6">
                Før sesongen 2016 ble JMP totalrenovert for over <strong>10 millioner kroner</strong>, med nye instrumenter, 
                ny lakk, og ikke minst nye motorer av typen PT6A-34 med støysvake firebladspropeller.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">20</p>
                  <p className="text-sm text-muted-foreground">hoppere</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">10 min</p>
                  <p className="text-sm text-muted-foreground">til 12 500 fot</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">22 000+</p>
                  <p className="text-sm text-muted-foreground">timer logget</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-bold text-sky">1968</p>
                  <p className="text-sm text-muted-foreground">byggeår</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Vi ber deg hjelpe til å ta vare på JMP. Behandle Den Hvite Svane med nennsomhet og kjærlighet!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/twin-otter.webp"
                alt="Twin Otter LN-JMP"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section id="forsikring" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              Forsikring
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Forsikring for <span className="text-gradient">besøkende hoppere</span>
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
                    Norske hoppere
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Er dekket gjennom NLF og trenger ikke ytterligere forsikring.
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
                    Utenlandske hoppere
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Du må ha gyldig <strong>tredjeparts ansvarsforsikring</strong>.
                  </p>
                  <p className="text-muted-foreground">
                    Kan du ikke dokumentere dette, kan du kjøpe NLFs forsikring for <strong>503 NOK (30 dager)</strong> via klubben.
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      For hoppere fra land <strong>utenfor EU/EØS</strong> anbefaler vi sterkt at du har en reiseforsikring 
                      som dekker medisinsk behandling i Norge.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Varsling / Trygg Idrett */}
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
                Trygg Idrett
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Varsling
              </h2>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Vi ønsker at Tønsberg Fallskjermklubb skal være en trygg idrettsarena for alle våre medlemmer, 
                  elever og besøkende. Dette innebærer trygghet under hoppvirksomheten og i de sosiale settingene.
                </p>
                <p className="text-muted-foreground mb-6">
                  I norsk idrett skal alle være trygge. Det er <strong>nulltoleranse</strong> for diskriminering, 
                  mobbing og trakassering. Ved å varsle gir du oss mulighet til å håndtere kritikkverdige forhold.
                </p>
                
                <div className="p-6 bg-muted rounded-xl mb-6">
                  <h4 className="font-semibold text-foreground mb-3">MittVarsel</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vi benytter MittVarsel, en digital portal for trygg og sikker varsling. Du kan varsle med navn eller anonymt.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Velg: <strong>"Idrettslag & Idrettsråd"</strong> → <strong>"Vestfold og Telemark"</strong> → <strong>"Tønsberg Fallskjermklubb"</strong>
                  </p>
                  <Button asChild variant="outline">
                    <a
                      href="https://www.idrettsforbundet.no/tema/varsling/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Gå til varslingssiden
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Varslingsgruppe:</strong> Leder: Odd Pedersen. Medlemmer: Anna Fasting og Silje Søraas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Weather & Camera */}
      <section id="vaer" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              Praktisk
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Kamera & <span className="text-gradient">Vær</span>
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">Webkamera</h3>
                  <p className="text-muted-foreground mb-4">
                    Sjekk forholdene på Jarlsberg i sanntid.
                  </p>
                  <Button asChild variant="outline">
                    <a href="https://www.skydivetonsberg.no" target="_blank" rel="noopener noreferrer">
                      Se webkamera
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">Værmelding</h3>
                  <p className="text-muted-foreground mb-4">
                    Værvarsel for Jarlsberg flyplass fra Yr.no.
                  </p>
                  <Button asChild variant="outline">
                    <a href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-211102/Norge/Vestfold%20og%20Telemark/T%C3%B8nsberg/Jarlsberg" target="_blank" rel="noopener noreferrer">
                      Se værmelding
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Grasrotandelen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-leaf shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-leaf mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Grasrotandelen</h3>
                <p className="text-muted-foreground mb-4">
                  Registrer Tønsberg Fallskjermklubb som mottaker av Grasrotandelen når du spiller på Norsk Tipping. 
                  Klubben kan motta inntil 7% av det du spiller for!
                </p>
                <Button asChild className="bg-leaf hover:bg-leaf/90 text-white">
                  <a href="https://www.norsk-tipping.no/grasrotandelen" target="_blank" rel="noopener noreferrer">
                    Registrer Grasrotandelen
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Spørsmål?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Vanlige <span className="text-gradient">spørsmål</span>
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

      {/* Contact & Links Section */}
      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Kontakt <span className="text-gradient">oss</span>
              </h2>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-sky flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Adresse</p>
                      <p className="text-muted-foreground">Flyplassveien 6, 3170 Sem</p>
                      <p className="text-sm text-muted-foreground">Org nr: 991 021 698</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-sky flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Telefon</p>
                      <a href="tel:+4733380670" className="text-muted-foreground hover:text-sky">
                        333 80 670
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-sky flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">E-post</p>
                      <a href="mailto:info@hoppfallskjerm.no" className="text-muted-foreground hover:text-sky">
                        info@hoppfallskjerm.no
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-sky flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Åpningstider</p>
                      {openingHours.map((item) => (
                        <p key={item.day} className="text-muted-foreground text-sm">
                          {item.day}: {item.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Nyttige <span className="text-gradient">lenker</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://www.skydivetonsberg.no/hoppkalender-1" target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-6 h-6 text-sky" />
                    <span>Hoppkalender</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://dzm.burblesoft.eu/jmp?dz_id=551" target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-6 h-6 text-sky" />
                    <span>BurbleMe</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://store.burblesoft.com/?dz_id=551" target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="w-6 h-6 text-sky" />
                    <span>Nettbutikk</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://nlf.no/grener/fallskjerm/Medlem/minidrett/" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-6 h-6 text-sky" />
                    <span>Min Idrett</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://www.facebook.com/TonsbergFallskjermklubb" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-6 h-6 text-sky" />
                    <span>Facebook</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                  <a href="https://www.jarlsbergluftsportssenter.no/" target="_blank" rel="noopener noreferrer">
                    <Info className="w-6 h-6 text-sky" />
                    <span>JLS Driftshåndbok</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                <a
                  href="https://www.skydivetonsberg.no/hoppkalender-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Hoppkalender
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/kontakt">
                  Kontakt oss
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
