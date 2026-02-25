type FAQ = { question: string; answer: string };

const buildFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Home page FAQs
const homeFAQs: FAQ[] = [
  {
    question: "Hva er aldersgrensen for tandemhopp?",
    answer: "Du må ha fylt 18 år for å hoppe tandem. Er du mellom 15 og 18 år må du ha med skriftlig aksept fra begge foresatte. Er du over 80 år må du ha med godkjent legeerklæring.",
  },
  {
    question: "Hvor høyt hopper vi fra?",
    answer: "Vi hopper fra 4000 meter! Dette gir deg ca. 40 sekunder i fritt fall i rundt 200 km/t før tandeminstruktøren utløser skjermen på 1500 meter. Under skjermturen på ca. 5 minutter kan du nyte utsikten over Oslofjorden og Tønsbergs skjærgård.",
  },
  {
    question: "Hva er maksimal vekt for tandemhopp?",
    answer: "Maksimal vekt er 110 kg. I enkelte tilfeller kan vi tillate noe over 100 kg, men dette er avhengig av din fysiske form og vurderes av instruktøren i hvert tilfelle.",
  },
  {
    question: "Hva skjer hvis været er dårlig?",
    answer: "Vi hopper ikke når det regner, er for mye vind (mer enn 11 m/s bakkevind), eller hvis skydekket er lavt eller tett. Dersom vi må kansellere på grunn av været, varsler vi deg på SMS samme dag. Du kan da booke et nytt tidspunkt kostnadsfritt, eller få refundert alt utenom depositumet.",
  },
  {
    question: "Hvor lang tid tar et tandemhopp?",
    answer: "Fra du møter til hoppet er gjennomført går det vanligvis 1-3 timer. Dette inkluderer video-briefing, utfylling av skjema, påkledning av utstyr og gjennomgang med din tandeminstruktør.",
  },
  {
    question: "Hva koster tandemhopp?",
    answer: "Tandemhopp koster 4690 kr på ukedager og 5190 kr i helger. Prisene inkluderer alt av avgifter, medlemskap og forsikring. Video koster 800 kr, video og bilder 1290 kr, og full videopakke med egen kameraperson koster 1780 kr.",
  },
  {
    question: "Kan jeg ta med kamera?",
    answer: "Av sikkerhetsmessige årsaker er det ikke tillatt å ha med eget kamera under hoppet. Vi anbefaler å bestille video og bilder når du booker.",
  },
  {
    question: "Hvordan kan jeg bli selvstendig fallskjermhopper?",
    answer: "Ta vårt AFF grunnkurs (Accelerated Freefall)! Kurset inkluderer 10 timer bakkekurs, 10 min vindtunell på Gardermoen, og 7 hopp med instruktører. Etter kurset (Nivå 1-7) gjør du 13 hopp alene før du kan ta A-lisens. Komplett kurs koster 18 990 kr.",
  },
  {
    question: "Hvor lenge er gavekortet gyldig?",
    answer: "Gavekort er gyldig i 12 måneder fra kjøpsdato. Du kan gi det videre til andre hvis du ikke benytter det selv.",
  },
  {
    question: "Kan jeg hoppe sammen med venner eller familie?",
    answer: "Ja! Dere vil være på samme fly, inntil 4 samtidig, og hopper ut med ca. 10 sekunders mellomrom. Dere lander på samme sted med kort mellomrom.",
  },
];

// Tandem page FAQs
const tandemFAQs: FAQ[] = [
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
    answer: "I enkelte tilfeller tillater vi over 100 kg, men det er avhengig av din fysiske tilstand/form, og vurderes av instruktøren i hvert tilfelle. Maksgrense er 110 kg.",
  },
  {
    question: "Kan jeg hoppe sammen med andre?",
    answer: "Ja! Dere vil være på samme fly, inntil 4 samtidig, og hopper ut med ca. 10 sekunders mellomrom. Dere lander på samme sted med kort mellomrom.",
  },
  {
    question: "Hva skjer hvis hoppet mitt blir kansellert?",
    answer: "Dersom vi må kansellere pga vær eller andre årsaker, booker vi deg kostnadsfritt på et nytt tidspunkt. Eller vi refunderer det du har betalt, bortsett fra depositumet.",
  },
  {
    question: "Hvor lenge er gavekortet gyldig?",
    answer: "Gavekortet er gyldig i 12 måneder fra kjøpsdato. Du kan gi det videre til andre hvis du ikke benytter det selv.",
  },
  {
    question: "Jeg har ikke fått link til filmen fra hoppet!",
    answer: "Sjekk spamfilteret ditt. Avsender er skydive-tonsberg.wetransfer.com. Du kan også søke på 'wetransfer' på PC-en din.",
  },
  {
    question: "Hvor lang tid i forveien bør jeg bestille?",
    answer: "Høysesongen er fra mai til ut oktober. De populære tidspunktene fylles fort opp, spesielt lørdager og søndager. Book så tidlig som mulig for å sikre ønsket tidspunkt.",
  },
];

// Kurs page FAQs
const kursFAQs: FAQ[] = [
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

// For Hoppere page FAQs
const forHoppereFAQs: FAQ[] = [
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
    answer: "Norske hoppere er dekket gjennom NLF. Utenlandske må ha gyldig tredjeparts ansvarsforsikring. Uten dokumentasjon kan du kjøpe NLFs forsikring for 503 NOK (30 dager).",
  },
  {
    question: "Hva er reglene for tracking og wingsuit?",
    answer: "Maks 3 horisontale grupper per løft: Maks 2 Angle (tracking) + Maks 1 WS/Tracksuit. Sjekk Jumper Manifest Display før du manifesterer deg.",
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

export const homeFAQSchema = buildFAQSchema(homeFAQs);
export const tandemFAQSchema = buildFAQSchema(tandemFAQs);
export const kursFAQSchema = buildFAQSchema(kursFAQs);
export const forHoppereFAQSchema = buildFAQSchema(forHoppereFAQs);

// Combined schema for the dedicated /faq page — all Q&As in one place
export const allFAQSchema = buildFAQSchema([
  ...homeFAQs,
  ...tandemFAQs,
  ...kursFAQs,
  ...forHoppereFAQs,
]);
