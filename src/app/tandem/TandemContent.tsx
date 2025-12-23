"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeroVideo } from "@/components/ui/hero-video";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTandemData } from "@/hooks/useTandemData";

const getPricing = (t: (key: string) => string) => [
  {
    name: t('tandem.pricing.weekday.name'),
    price: "4 690",
    description: t('tandem.pricing.weekday.description'),
    popular: false,
  },
  {
    name: t('tandem.pricing.weekend.name'),
    price: "5 190",
    description: t('tandem.pricing.weekend.description'),
    popular: true,
  },
];

const getMediaPackages = (t: (key: string) => string) => [
  {
    name: t('tandem.pricing.media.video.name'),
    price: "800 kr",
    description: t('tandem.pricing.media.video.description'),
  },
  {
    name: t('tandem.pricing.media.videoPhotos.name'),
    price: "1 290 kr",
    description: t('tandem.pricing.media.videoPhotos.description'),
  },
  {
    name: t('tandem.pricing.media.fullPackage.name'),
    price: "1 780 kr",
    description: t('tandem.pricing.media.fullPackage.description'),
  },
];

export function TandemContent() {
  const { t } = useLanguage();
  const { highlights, requirements, jumpDaySteps, faqData } = useTandemData();
  const pricing = getPricing(t);
  const mediaPackages = getMediaPackages(t);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroVideo
            desktopSrc="/tandemhopp-optimized.webm"
            mobileSrc="/tandemhopp-mobile.webm"
            poster="/tandemhopp-landing.webp"
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-sky/20 rounded-full mb-4 text-white backdrop-blur-sm">
                {t('tandem.hero.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                {t('tandem.hero.title')}{" "}
                <span className="text-gradient-bright">{t('tandem.hero.titleHighlight')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                {t('tandem.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-2xl"
                >
                  <a
                    href="https://bookings.burblesoft.eu/551/18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {t('tandem.hero.bookNow')}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg"
                >
                  <a href="#pricing">{t('tandem.hero.learnMore')}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jump Specs Bar */}
      <section className="py-10 bg-sky text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">4000m</p>
                <p className="text-sm text-white/70">{t('tandem.hero.altitude')}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">40 sek</p>
                <p className="text-sm text-white/70">{t('tandem.hero.freefall')}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">5 min</p>
                <p className="text-sm text-white/70">{t('tandem.hero.canopy')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Jump With Us */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t('tandem.highlights.badge')}
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-brand flex items-center justify-center">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-leaf bg-leaf/10 rounded-full mb-4">
              {t('tandem.pricing.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('tandem.pricing.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {pricing.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className={`relative h-full ${plan.popular ? "border-sky shadow-xl" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-brand text-white text-sm font-semibold px-4 py-1 rounded-full">
                        {t('tandem.pricing.weekend.popular')}
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-6">
                      {plan.price} <span className="text-lg font-normal text-muted-foreground">kr</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Media Packages */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">{t('tandem.pricing.media.title')}</h3>
            <div className="grid gap-4">
              {mediaPackages.map((pkg) => (
                <Card key={pkg.name}>
                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-4">
                      <Camera className="w-8 h-8 text-sky" />
                      <div>
                        <h4 className="font-semibold">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{pkg.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {t('tandem.requirements.title')}
            </h2>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg"
                >
                  <CheckCircle2 className="w-6 h-6 text-sky shrink-0 mt-1" />
                  <span className="text-lg">{req}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jump Day Timeline */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('tandem.jumpDay.title')}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {jumpDaySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xl font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('tandem.faq.title')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-sky to-leaf text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('tandem.hero.bookNow')}
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 py-6 text-lg"
            >
              <a
                href="https://bookings.burblesoft.eu/551/18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mx-auto w-fit"
              >
                <ExternalLink className="w-5 h-5" />
                {t('tandem.hero.bookNow')}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

