'use client';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereReporting() {
  const { t } = useLanguage();
  const { reportingIntro, reportingPolicy, reportingSystemDesc, reportingSystemPath, reportingGroup } = useForHoppereData();
  return (
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
              {t('forHoppere.reporting.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('forHoppere.reporting.title')}
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
                <h4 className="font-semibold text-foreground mb-3">{t('forHoppere.reporting.systemTitle')}</h4>
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
                    {t('forHoppere.reporting.button')}
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
  );
}
