"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Plane,
  Shield,
  Target,
  Wind,
  Home,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const courseModules = [
  {
    title: "Bakkekurs",
    description:
      "10 timer teori og praktisk trening. Lær om aerodynamikk, utstyr, nødprosedyrer og sikkerhet fordelt over 1,5 dager.",
    icon: BookOpen,
    duration: "10 timer",
  },
  {
    title: "Vindtunell",
    description:
      "10 minutter i vindtunellen på Gardermoen for å øve på kroppskontroll og fallstilling før ditt første hopp.",
    icon: Wind,
    duration: "10 min",
  },
  {
    title: "Nivå 1-3",
    description:
      "Dine første 3 hopp med to instruktører som holder grep i deg. Fokus på kroppskontroll, prøvetrekk og selvstendig trekk.",
    icon: Users,
    duration: "2 instruktører",
  },
  {
    title: "Nivå 4-7",
    description:
      "4 hopp med én instruktør. Progressive øvelser med svinger, saltoer og solo exit inntil du mestrer solo-hopp.",
    icon: Plane,
    duration: "1 instruktør",
  },
];

const progressionLevels = [
  {
    level: "Nivå 1",
    title: "Kroppskontroll",
    instructors: 2,
    goals: "Tre prøvetrekk, korrekt fallstilling, selvstendig trekk",
    altitude: "12 500 fot",
    freefall: "45 sek",
  },
  {
    level: "Nivå 2",
    title: "Kroppskontroll +",
    instructors: 2,
    goals: "90° sving høyre og venstre, fremoverbevegelse",
    altitude: "12 500 fot",
    freefall: "45 sek",
  },
  {
    level: "Nivå 3",
    title: "Selvstendighetshoppet",
    instructors: 2,
    goals: "Fly alene, korrigere heading, instruktører slipper",
    altitude: "12 500 fot",
    freefall: "45 sek",
  },
  {
    level: "Nivå 4",
    title: "90° svinger",
    instructors: 1,
    goals: "Fly alene, svinger og fremoverbevegelse",
    altitude: "12 500 fot",
    freefall: "50 sek",
  },
  {
    level: "Nivå 5",
    title: "360° svinger",
    instructors: 1,
    goals: "360° sving høyre og venstre, fremoverbevegelse",
    altitude: "12 500 fot",
    freefall: "50 sek",
  },
  {
    level: "Nivå 6",
    title: "Solo exit",
    instructors: 1,
    goals: "Uassistert utsprang, baklengs salto, marsj",
    altitude: "12 500 fot",
    freefall: "50 sek",
  },
  {
    level: "Nivå 7",
    title: "Solohoppet",
    instructors: 1,
    goals: "Solo dykkende exit, forlengs salto, marsj",
    altitude: "12 500 fot",
    freefall: "50 sek",
  },
];

const included = [
  "10 timer bakkekurs",
  "10 min i vindtunell (Gardermoen)",
  "Alt nødvendig utstyr under kurset",
  "Goggles, loggbok, hansker, høydemåler",
  "Hoppdress og fallskjermrigg",
  "3 hopp med to instruktører",
  "4 hopp med én instruktør",
  "Pakkebonger og pakkekurs",
  "A-kurs",
  "Video på ett hopp",
  "Gratis overnatting kursuka (køyeseng)",
];

const requirements = [
  "Fylt 18 år (eller 16 år med skriftlig aksept fra begge foresatte)",
  "Godkjent legeerklæring (må fremvises ved fremmøte)",
  "Maksimal vekt 100 kg",
  "Signere egenerklæring om fysisk helse",
  "Motivasjon og dedikasjon",
];

const faqs = [
  {
    question: "Hva koster omhopp hvis jeg ikke består et nivå?",
    answer: "De 7 hoppene på kurset har hver sine ferdighetskrav. Hvis du får et nivå underkjent må du gjøre det om igjen. Omhopp med instruktører betales i tillegg til kursprisen. Se prisliste på hoppfeltet.",
  },
  {
    question: "Hva skjer etter kurset (Nivå 1-7)?",
    answer: "Etter kurset er du elev på Nivå 8. Du skal gjøre 13 nivå 8-hopp alene, hvorav 2 FS-utsjekker og 2 lavhopp med instruktør. Deretter kan du ta A-lisens gjennom skriftlig eksamen, pakkekurs og A-kurs.",
  },
  {
    question: "Hvor farlig er fallskjermhopping?",
    answer: "Det er alltid en risiko med fallskjermhopping. Men gjør du som du blir fortalt og instruert, er du trygg. Virker ikke hovedskjermen din som den skal, kvitter du deg med den og trekker reserveskjermen. Du har også en nødåpner som åpner reserven automatisk i en viss høyde.",
  },
  {
    question: "Hva hvis jeg ikke tør hoppe?",
    answer: "Hvis du allerede er i flyet blir du med flyet ned igjen. Du må allikevel betale for instruktørene og din egen plass i flyet.",
  },
  {
    question: "Hvor lang tid i forveien bør jeg melde meg på?",
    answer: "De første kursene fylles opp først. Meld deg på så fort du har funnet et kurs med datoer som passer deg! Vi kjører 13 kurs i sesongen fra slutten av april til medio oktober.",
  },
  {
    question: "Hva trenger jeg ha med på kurs?",
    answer: "Ta med treningsklær, joggesko, varmt tøy (spesielt vår og høst), gjerne noe å notere på, og godt humør! Ulltrøye innerst er lurt, og noen dager trenger du tights eller stillongs under hoppdressen.",
  },
];

export function KursContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/kurs-hero.webp"
            className="w-full h-full object-cover"
          >
            <source src="/kurs-hero.webm" type="video/webm" />
            <source src="/kurs-hero.mp4" type="video/mp4" />
          </video>
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
              className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-sky/20 backdrop-blur-sm rounded-full text-white border border-sky/30"
            >
              AFF Grunnkurs
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Bli selvstendig{" "}
              <span className="text-gradient">fallskjermhopper</span>
            </h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              Drømmer du om å falle fritt – og etterpå lande trygt med fallskjerm? 
              Etter 10 timer bakkekurs, vindtunell og 7 hopp med instruktører hopper du på egen hånd.
            </p>
            <p className="text-lg text-white/80 mb-8 italic">
              &ldquo;Vi realiserer drømmen din!&rdquo;
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
                  Book kurs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a href="#course-details">Les mer</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Banner */}
      <section className="bg-sky text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-black/70 text-sm font-medium mb-1">Komplett kurs</p>
              <p className="text-4xl font-bold">18 990 kr</p>
              <p className="text-black/70 text-sm">2000 kr depositum ved påmelding</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-2xl font-bold">10 timer</p>
                <p className="text-black/70 text-sm">Bakkekurs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10 min</p>
                <p className="text-black/70 text-sm">Vindtunell</p>
              </div>
              <div>
                <p className="text-2xl font-bold">7 hopp</p>
                <p className="text-black/70 text-sm">Med instruktører</p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-sky hover:bg-white/90 font-semibold"
            >
              <a
                href="https://www.skydivetonsberg.no/hoppkalender-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Se kursdatoer
                <Calendar className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section id="course-details" className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* What is AFF */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
                Hva er AFF?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Aksellerert Fritt Fall – den{" "}
                <span className="text-gradient">raskeste veien</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                AFF (Accelerated Freefall) er den raskeste og beste måten å bli 
                fallskjermhopper på. I motsetning til tradisjonell statisk 
                line-utdanning, hopper du i fritt fall fra full høyde allerede 
                første hopp – sammen med instruktører.
              </p>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Tønsberg Fallskjermklubb holder til på Jarlsberg flyplass ved E18 
                utenfor Tønsberg. Vi har sesong fra slutten av april til medio 
                oktober, med 4-7 dager åpent i uka og 13 kurs per sesong. Vi 
                opererer Norges største og beste fly for fallskjermhopping!
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-sky/10 rounded-xl">
                  <Shield className="w-10 h-10 text-sky flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Sikkerhet først</p>
                    <p className="text-sm text-foreground/70">
                      Sertifiserte instruktører
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-leaf/10 rounded-xl">
                  <Home className="w-10 h-10 text-leaf flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Gratis overnatting</p>
                    <p className="text-sm text-foreground/70">
                      Bunkhouse på feltet
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/aff-trening.webp"
                  alt="AFF trening"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-sky/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-leaf/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>

          {/* Course Modules */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
                Kursoppbygging
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Fra bakkekurs til <span className="text-gradient">solo-hopp</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Kurset er delt inn i progressive moduler. Ofte gjennomfører man 
                nivå 1-7 på to dager, men vi anbefaler å sette av fire dager.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courseModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center text-white mb-4">
                        <module.icon className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-sky mb-2">
                        {module.duration}
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{module.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progression Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
                Progresjon
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Nivå for <span className="text-gradient">nivå</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Her er målene og innholdet for hvert av de 7 nivåene på kurset.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-sky text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Nivå</th>
                    <th className="px-6 py-4 text-left font-semibold">Navn</th>
                    <th className="px-6 py-4 text-center font-semibold">Instruktører</th>
                    <th className="px-6 py-4 text-left font-semibold">Mål</th>
                    <th className="px-6 py-4 text-center font-semibold">Fritt fall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {progressionLevels.map((level, index) => (
                    <tr 
                      key={level.level}
                      className={index % 2 === 0 ? "bg-muted/30" : "bg-card"}
                    >
                      <td className="px-6 py-4 font-bold text-sky">{level.level}</td>
                      <td className="px-6 py-4 font-medium">{level.title}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1">
                          {level.instructors}
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground/70">{level.goals}</td>
                      <td className="px-6 py-4 text-center">{level.freefall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-foreground/70 mt-6">
              Etter Nivå 7 er du på <strong>Nivå 8</strong> – 13 solohopp + 2 utsjekkshopp før A-lisens!
            </p>
          </motion.div>

          {/* What's Included & Requirements */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <CheckCircle2 className="w-6 h-6 text-leaf" />
                    Dette er inkludert i kursprisen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-foreground/80 mt-6 p-4 bg-muted/50 rounded-lg">
                    I tillegg må du betale medlemskap i klubb og forbund, samt forsikring.
                    Se <a href="https://nlf.no/medlemsservice/kontingentkalkulator/" target="_blank" rel="noopener noreferrer" className="text-sky underline">NLF kontingent-kalkulator</a>.
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
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Users className="w-6 h-6 text-sky" />
                    Krav til deltakelse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-sky/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-sky">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-foreground/80 mb-2">
                      <strong>Egenerklæring:</strong> &ldquo;Jeg erklærer at jeg er fysisk 
                      normal og at jeg ikke lider av hjertefeil, diabetes, epilepsi, 
                      besvimelsesanfall, nervøse lidelser, nyresykdom, eller høyt/lavt 
                      blodtrykk. Jeg er kjent med risikoen knyttet til fallskjermhopping.&rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              Spørsmål om kurs?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Vanlige <span className="text-gradient">spørsmål</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Fremdeles i tvil? Send e-post til{" "}
              <a href="mailto:kurs@hoppfallskjerm.no" className="text-sky underline">
                kurs@hoppfallskjerm.no
              </a>{" "}
              eller ring oss på tlf 333 80 670.
            </p>
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
                  <AccordionContent className="text-foreground/70 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-sky" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Klar for å starte din reise?
            </h2>
            <p className="text-xl text-background/80 mb-4">
              Vi lover deg en livslang opplevelse fylt av adrenalin, høy puls, 
              litt frykt og enorm glede.
            </p>
            <p className="text-lg text-background/60 mb-10 italic">
              Er du skikkelig ivrig blir du et par uker, tar en liten pause 
              kanskje og så kommer du tilbake igjen, og igjen, og igjen…
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  Se kursdatoer
                  <Calendar className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/30 bg-background/10 text-background hover:bg-background/20"
              >
                <Link href="/kontakt">
                  Kontakt oss
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
