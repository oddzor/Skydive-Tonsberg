"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMSContent } from "@/hooks/useCMSContent";
import { HelpCircle, Plane, GraduationCap, Users } from "lucide-react";

export default function FAQPage() {
  const { t } = useLanguage();
  const { content } = useCMSContent();

  const faqCategories = [
    {
      id: "tandem",
      label: t('nav.tandem'),
      icon: Plane,
      badge: "Tandem",
      color: "text-sky",
      bgColor: "bg-sky/10",
      faqs: content?.faqs?.tandem || []
    },
    {
      id: "course",
      label: t('nav.courses'),
      icon: GraduationCap,
      badge: "AFF Kurs",
      color: "text-leaf",
      bgColor: "bg-leaf/10",
      faqs: content?.faqs?.kurs || []
    },
    {
      id: "experienced",
      label: t('nav.forJumpers'),
      icon: Users,
      badge: "For Hoppere",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      faqs: content?.faqs?.forHoppere || []
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/20 to-background">
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
              {t('home.faq.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('home.faq.title')} <span className="text-gradient">{t('home.faq.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('home.faq.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="tandem" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-muted">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 py-3 data-[state=active]:bg-background"
                    >
                      <Icon className={`w-4 h-4 ${category.color}`} />
                      <span className="hidden sm:inline">{category.label}</span>
                      <span className="sm:hidden">{category.badge}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    <div className={`flex items-center gap-3 p-4 rounded-lg ${category.bgColor} border border-${category.color.split('-')[1]}-200`}>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{category.label}</h2>
                        <p className="text-sm text-muted-foreground">
                          {category.faqs.length} {category.faqs.length === 1 ? 'spørsmål' : 'spørsmål'}
                        </p>
                      </div>
                    </div>

                    {category.faqs.length > 0 ? (
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq: { question: string; answer: string }, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <AccordionItem
                              value={`item-${index}`}
                              className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                                <span className="flex items-start gap-3">
                                  <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 ${category.color}`} />
                                  <span>{faq.question}</span>
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed pl-8">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-12 bg-card rounded-xl border border-border">
                        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Ingen spørsmål tilgjengelig for denne kategorien.</p>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
