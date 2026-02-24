"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays } from "lucide-react";

export default function HoppkalenderPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-sky/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-leaf/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-sky/10 rounded-full text-sky border border-sky/20"
            >
              {t("nav.forJumpers")}
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t("nav.jumpCalendar")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
              <CalendarDays className="w-5 h-5 shrink-0" />
              {t("hoppkalender.description")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-border"
          >
            <iframe
              src="https://calendar.google.com/calendar/embed?src=76b6jvu0epjnnl0i6q32llunkg%40group.calendar.google.com&ctz=Europe%2FOslo&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&mode=MONTH"
              className="w-full"
              style={{ height: "700px", border: 0 }}
              title="Hoppkalender"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
