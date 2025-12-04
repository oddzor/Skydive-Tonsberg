"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hva er aldersgrensen for tandemhopp?",
    answer:
      "Du må ha fylt 18 år for å hoppe tandem. Er du mellom 16 og 18 år må du ha med skriftlig aksept fra begge foresatte. Er du over 80 år må du ha med godkjent legeerklæring.",
  },
  {
    question: "Hvor høyt hopper vi fra?",
    answer:
      "Vi hopper fra 4000 meter! Dette gir deg ca. 40 sekunder i fritt fall i rundt 200 km/t før tandeminstruktøren utløser skjermen på 1500 meter. Under skjermturen på ca. 5 minutter kan du nyte utsikten over Oslofjorden og Tønsbergs skjærgård.",
  },
  {
    question: "Hva er maksimal vekt for tandemhopp?",
    answer:
      "Maksimal vekt er 110 kg. I enkelte tilfeller kan vi tillate noe over 100 kg, men dette er avhengig av din fysiske form og vurderes av instruktøren i hvert tilfelle.",
  },
  {
    question: "Hva skjer hvis været er dårlig?",
    answer:
      "Vi hopper ikke når det regner, er for mye vind (mer enn 11 m/s bakkevind), eller hvis skydekket er lavt eller tett. Dersom vi må kansellere på grunn av været, varsler vi deg på SMS samme dag. Du kan da booke et nytt tidspunkt kostnadsfritt, eller få refundert alt utenom depositumet.",
  },
  {
    question: "Hvor lang tid tar et tandemhopp?",
    answer:
      "Fra du møter til hoppet er gjennomført går det vanligvis 1-3 timer. Dette inkluderer video-briefing, utfylling av skjema, påkledning av utstyr og gjennomgang med din tandeminstruktør. Legg gjerne inn litt ekstra tid da vær og vind kan påvirke tidsplanen.",
  },
  {
    question: "Kan jeg ta med kamera?",
    answer:
      "Av sikkerhetsmessige årsaker er det ikke tillatt å ha med eget kamera under hoppet. Vi anbefaler å bestille video og bilder når du booker – det er mest sannsynlig at du gjør dette kun én gang i ditt liv, så det er fint å ha gode minner!",
  },
  {
    question: "Hva koster tandemhopp?",
    answer:
      "Tandemhopp koster 4690 kr på ukedager og 5190 kr i helger. Prisene inkluderer alt av avgifter, medlemskap og forsikring. Video koster 800 kr, video og bilder 1290 kr, og full videopakke med egen kameraperson koster 1780 kr.",
  },
  {
    question: "Hvordan kan jeg bli selvstendig fallskjermhopper?",
    answer:
      "Ta vårt AFF grunnkurs (Accelerated Freefall)! Kurset inkluderer 10 timer bakkekurs, 10 min vindtunell på Gardermoen, og 7 hopp med instruktører. Etter kurset (Nivå 1-7) gjør du 13 hopp alene før du kan ta A-lisens. Komplett kurs koster 18 990 kr.",
  },
  {
    question: "Hvor lenge er gavekortet gyldig?",
    answer:
      "Gavekort er gyldig i 12 måneder fra kjøpsdato. Du kan gi det videre til andre hvis du ikke benytter det selv.",
  },
  {
    question: "Kan jeg hoppe sammen med venner eller familie?",
    answer:
      "Ja! Dere vil være på samme fly, inntil 4 samtidig, og hopper ut med ca. 10 sekunders mellomrom. Dere lander på samme sted med kort mellomrom. Har du en venn som er fallskjermhopper kan han/hun også hoppe sammen med deg hvis tandeminstruktøren godkjenner det.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
            Spørsmål?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ofte stilte <span className="text-gradient">spørsmål</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Her finner du svar på de vanligste spørsmålene vi får. 
            Ikke nøl med å kontakte oss hvis du lurer på noe annet!
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
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
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}



