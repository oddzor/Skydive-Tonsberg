"use client";

import { motion } from "framer-motion";
import { Shield, Mail, Database, Clock, UserCheck, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PersonvernPage() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Database,
      titleKey: "privacy.dataCollection.title",
      contentKey: "privacy.dataCollection.content",
      listKey: "privacy.dataCollection.list",
    },
    {
      icon: FileText,
      titleKey: "privacy.thirdParty.title",
      contentKey: "privacy.thirdParty.content",
      listKey: "privacy.thirdParty.list",
    },
    {
      icon: Clock,
      titleKey: "privacy.dataRetention.title",
      contentKey: "privacy.dataRetention.content",
    },
    {
      icon: UserCheck,
      titleKey: "privacy.yourRights.title",
      contentKey: "privacy.yourRights.content",
      listKey: "privacy.yourRights.list",
    },
    {
      icon: Shield,
      titleKey: "privacy.dataSecurity.title",
      contentKey: "privacy.dataSecurity.content",
    },
    {
      icon: Mail,
      titleKey: "privacy.contact.title",
      contentKey: "privacy.contact.content",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("privacy.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("privacy.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t("privacy.lastUpdated")}: {new Date().toLocaleDateString("no-NO")}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="bg-card rounded-xl p-6 mb-8 border">
              <p className="text-muted-foreground leading-relaxed mb-0">
                {t("privacy.introduction")}
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 border"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4">
                        {t(section.titleKey)}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {t(section.contentKey)}
                      </p>
                      {section.listKey && (
                        <ul className="mt-4 space-y-2">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const item = t(`${section.listKey}.${i}`);
                            if (item === `${section.listKey}.${i}`) return null;
                            return (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-sky mt-1">•</span>
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-8 mt-8 border-2 border-sky/20">
              <h2 className="text-2xl font-bold mb-4">{t("privacy.changes.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.changes.content")}
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 mt-8 border">
              <h2 className="text-2xl font-bold mb-4">{t("privacy.questions.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("privacy.questions.content")}
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Tønsberg Fallskjermklubb</p>
                <p className="text-muted-foreground">Org. nr: 991 021 698</p>
                <p className="text-muted-foreground">Flyplassveien 6, 3170 Sem</p>
                <a
                  href="mailto:info@hoppfallskjerm.no"
                  className="text-sky hover:underline inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@hoppfallskjerm.no
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
