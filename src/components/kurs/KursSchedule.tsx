'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '@/components/shared';

export function KursSchedule() {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('kurs.schedule.title')}
          description={t('kurs.schedule.description')}
        />
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground mb-2">
                  <strong>⏰ {t('kurs.schedule.importantTitle')}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('kurs.schedule.importantDesc')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
