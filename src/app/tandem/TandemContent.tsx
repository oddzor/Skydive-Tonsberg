"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Camera,
  Gift,
  MapPin,
  AlertCircle,
  Heart,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const highlights = [
  {
    title: "Desidert nærmest Oslo",
    description: "Ved E18 utenfor Tønsberg, enkelt tilgjengelig fra hele østlandet.",
    icon: MapPin,
  },
  {
    title: "Vakker utsikt",
    description: "Fantastisk panorama over Oslofjorden og Tønsbergs skjærgård.",
    icon: Heart,
  },
  {
    title: "Norges beste fly",
    description: "Twin Otter med plass til 20 hoppere – det største og beste hoppflyet i Norge.",
    icon: Plane,
  },
  {
    title: "Erfarne instruktører",
    description: "Våre tandeminstruktører er blant landets mest erfarne og tar deg trygt gjennom hoppet.",
    icon: Users,
  },
];

const pricing = [
  {
    name: "Tandemhopp ukedag",
    price: "4 690",
    description: "Mandag - Fredag",
    popular: false,
  },
  {
    name: "Tandemhopp helg",
    price: "5 190",
    description: "Lørdag - Søndag",
    popular: true,
  },
];

const mediaPackages = [
  {
    name: "Video",
    price: "800 kr",
    description: "Profesjonell video av hoppet ditt",
  },
  {
    name: "Video og bilder",
    price: "1 290 kr",
    description: "Video + stillbilder fra fritt fall og landing",
  },
  {
    name: "Full videopakke",
    price: "1 780 kr",
    description: "Egen kameraperson + video fra instruktørens arm + bilder",
  },
];

const requirements = [
  "Fylt 18 år – eller fra 16 år med skriftlig aksept fra begge foresatte",
  "Godkjent legeerklæring hvis du er over 80 år",
  "Maksimal vekt 110 kg",
  "Ikke påvirket av rusmidler",
];

const jumpDaySteps = [
  {
    step: 1,
    title: "Ankomst og registrering",
    description: "Meld deg i resepsjonen, se sikkerhetsvideo og fyll ut skjema.",
  },
  {
    step: 2,
    title: "Briefing med instruktør",
    description: "Du får hoppdress, seletøy og gjennomgang med din tandeminstruktør.",
  },
  {
    step: 3,
    title: "Flytur til 4000 meter",
    description: "10-12 minutter opp med fantastisk utsikt over Tønsbergs skjærgård.",
  },
  {
    step: 4,
    title: "Fritt fall!",
    description: "Ca. 40 sekunder i fritt fall i rundt 200 km/t – ren adrenalin!",
  },
  {
    step: 5,
    title: "Skjermtur",
    description: "5 minutter under skjerm fra 1500 meter – kanskje du får styre litt?",
  },
  {
    step: 6,
    title: "Myk landing",
    description: "Instruktøren lander deg trygt på landingsområdet.",
  },
];

const faqs = [
  {
    question: "Hoppet skal være en overraskelse – hva gjør jeg?",
    answer: "Når du booker for andre, og det skal være en overraskelse, oppgi DIN e-post og DITT mobilnr – da kommuniserer vi bare med deg. Våre regler sier at den som hopper skal varsles minst 48 timer før hoppet.",
  },
  {
    question: "Værmeldinga er dårlig, blir det hopping?",
    answer: "Vi hopper ikke når det regner, er for mye vind (mer enn 11 m/s), eller hvis skydekket er lavt eller tett. Dersom vi må kansellere varsler vi deg på SMS samme dag. Hører du ikke fra oss er det bare å komme!",
  },
  {
    question: "Jeg veier over 100 kg, kan jeg hoppe?",
    answer: "I enkelte tilfeller tillater vi over 100 kg, men det er avhengig av din fysiske tilstand/form, og vurderes av instruktøren i hvert tilfelle. Maksgrense er 110 kg. Vær- og vindforhold spiller også inn.",
  },
  {
    question: "Kan jeg hoppe sammen med andre?",
    answer: "Ja! Dere vil være på samme fly, inntil 4 samtidig, og hopper ut med ca. 10 sekunders mellomrom. Dere lander på samme sted med kort mellomrom. Har du en venn som er fallskjermhopper kan han/hun hoppe sammen med deg hvis instruktøren godkjenner det.",
  },
  {
    question: "Hva skjer hvis hoppet mitt blir kansellert?",
    answer: "Dersom vi må kansellere pga vær eller andre årsaker, booker vi deg kostnadsfritt på et nytt tidspunkt. Eller vi refunderer det du har betalt, bortsett fra depositumet. Opp til deg!",
  },
  {
    question: "Hvor lenge er gavekortet gyldig?",
    answer: "Gavekortet er gyldig i 12 måneder fra kjøpsdato. Du kan gi det videre til andre hvis du ikke benytter det selv.",
  },
  {
    question: "Jeg har ikke fått link til filmen fra hoppet!",
    answer: "Sjekk spamfilteret ditt. Avsender er skydive-tonsberg.wetransfer.com. Du kan også søke på 'wetransfer' på PC-en din. Finner du den fremdeles ikke – kontakt oss!",
  },
  {
    question: "Hvor lang tid i forveien bør jeg bestille?",
    answer: "Høysesongen er fra mai til ut oktober. De populære tidspunktene fylles fort opp, spesielt lørdager og søndager. Book så tidlig som mulig for å sikre ønsket tidspunkt. På hverdager er det mer romslig med plass.",
  },
];

export function TandemContent() {
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
            poster="/tandemhopp-landing.webp"
            className="w-full h-full object-cover"
          >
            <source src="/tandemhopp.webm" type="video/webm" />
            <source src="/tandemhopp.mp4" type="video/mp4" />
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
              Tandemhopp
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Opplev{" "}
              <span className="text-gradient">frihet i fritt fall</span>
            </h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              Lyst på en luftetur og et adrenalinkick av de sjeldne? Kjenne spenningen 
              når du faller fritt mot moder jord? Da er et tandemhopp noe for deg!
            </p>
            <p className="text-lg text-white/70 mb-8">
              Fra <span className="text-2xl font-bold text-white">4000 meter</span> får du 
              ca. <span className="text-2xl font-bold text-white">40 sekunder</span> fritt fall 
              før instruktøren utløser fallskjermen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8"
              >
                <a
                  href="https://bookings.burblesoft.eu/551/18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Tandemhopp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a
                  href="https://bookings.burblesoft.eu/551/18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Gift className="mr-2 w-5 h-5" />
                  Kjøp Gavekort
                </a>
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
              <p className="text-black/70 text-sm font-medium mb-1">Fra kun</p>
              <p className="text-4xl font-bold">4 690 kr!</p>
              <p className="text-black/70 text-sm">Inkl. alt av avgifter, medlemskap og forsikring</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-2xl font-bold">4000m</p>
                <p className="text-black/70 text-sm">Hopphøyde</p>
              </div>
              <div>
                <p className="text-2xl font-bold">40 sek</p>
                <p className="text-black/70 text-sm">Fritt fall</p>
              </div>
              <div>
                <p className="text-2xl font-bold">200 km/t</p>
                <p className="text-black/70 text-sm">Hastighet</p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-sky hover:bg-white/90 font-semibold"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book nå
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Hvorfor velge oss?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Norges beste <span className="text-gradient">tandemopplevelse</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-4">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Se hva som venter deg!
              </h3>
              <p className="text-foreground/70">
                Under ser du et eksempel på en typisk tandemvideo
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/8s2Z2td60OI"
                title="Tandemhopp video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              Priser
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Våre <span className="text-gradient">priser</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Prisene inkluderer alt av avgifter, medlemskap og forsikring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
            {pricing.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border-2 ${item.popular ? "border-sky shadow-xl" : "border-border"}`}>
                  {item.popular && (
                    <div className="bg-sky text-white text-center py-2 text-sm font-medium">
                      Mest populær
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4">{item.description}</p>
                    <p className="text-4xl font-bold text-foreground mb-4">
                      {item.price} <span className="text-lg font-normal">kr</span>
                    </p>
                    <Button
                      asChild
                      className={`w-full ${item.popular ? "bg-gradient-brand hover:opacity-90 text-white" : ""}`}
                      variant={item.popular ? "default" : "outline"}
                    >
                      <a
                        href="https://bookings.burblesoft.eu/551/18"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book nå
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Media Packages */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="text-center mb-8">
              <Camera className="w-10 h-10 mx-auto mb-4 text-sky" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Video & Bilder
              </h3>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Det er mest sannsynlig at du gjør dette kun én gang i ditt liv. 
                Vi tar vare på minnene for deg! Vi anbefaler å velge bilder og håndkamera.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {mediaPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg text-center">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-1">{pkg.name}</h4>
                      <p className="text-2xl font-bold text-sky mb-2">{pkg.price}</p>
                      <p className="text-sm text-foreground/70">{pkg.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-foreground/60 mt-6">
              * Full videopakke kommer med egen kameraperson, bilder og videokamera på instruktørens arm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jump Day Timeline */}
      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              Hoppdagen
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hva skjer <span className="text-gradient">hoppdagen?</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Fra du møter til hoppet er gjennomført går det vanligvis 1-3 timer.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jumpDaySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-full bg-sky text-white flex items-center justify-center font-bold mb-4">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                      <p className="text-sm text-foreground/70">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 p-6 bg-card rounded-2xl shadow-lg border border-border"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-sky flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Praktisk informasjon</h4>
                <ul className="text-sm text-foreground/70 space-y-2">
                  <li>• Kle deg komfortabelt og etter værforholdene – ulltrøye innerst anbefales vår/høst</li>
                  <li>• Ha på gode sko med knyting, helst joggesko</li>
                  <li>• Legg inn slakk i tidsplanen – været kan påvirke forsinkelser</li>
                  <li>• For de som skal se på: Ta med ekstra klær. Vi har kafeteria og bord/benker på feltet</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
                Krav og betingelser
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Før du <span className="text-gradient">hopper</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-foreground/80">
                  <strong>Betaling:</strong> Når du booker betaler du kr 400 i depositum. 
                  Alt du har betalt, bortsett fra depositumet, er refunderbart dersom hoppet 
                  ikke blir gjennomført. Vi har betalingsterminal (kort) og tar kontant.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/tandemhopp-landing.webp"
                alt="Tandemhopp landing"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-gradient-hero">
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
            <Plane className="w-16 h-16 mx-auto mb-6 text-sky" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Klar for å ta spranget?
            </h2>
            <p className="text-xl text-background/80 mb-4">
              Book ditt tandemhopp i dag – vi hopper 4-6 dager i uka fra slutten av april til medio oktober.
            </p>
            <p className="text-lg text-background/60 mb-10 italic">
              &ldquo;Kanskje du får styre litt også? Gled deg!&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8"
              >
                <a
                  href="https://bookings.burblesoft.eu/551/18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Tandemhopp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/30 bg-background/10 text-background hover:bg-background/20"
              >
                <a
                  href="https://bookings.burblesoft.eu/551/18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Gift className="mr-2 w-5 h-5" />
                  Kjøp Gavekort
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


