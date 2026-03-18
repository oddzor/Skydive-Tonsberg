'use client';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereBurbleMe() {
  const { t } = useLanguage();
  const {
    burbleMeDescription,
    burbleMePersonalDetailsDesc,
    burbleMeProfileNote,
    burbleMeCheckInDropzoneDesc,
    burbleMeCheckInFormationDesc,
    burbleMeCheckInRules,
    burbleMeLoadTimeDesc,
    burbleMeOutlandingDesc,
    burbleMeLocationDesc,
  } = useForHoppereData();
  return (
    <section id="burbleme" className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            {t('forHoppere.burbleMe.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('forHoppere.burbleMe.title')}{' '}
            <span className="text-gradient">{t('forHoppere.burbleMe.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {burbleMeDescription}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-sky" />
                  {t('forHoppere.burbleMe.profileSetup.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.profileSetup.personalDetails')}</h4>
                  <p className="text-sm text-muted-foreground">{burbleMePersonalDetailsDesc}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.profileSetup.editCredentials')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>{t('forHoppere.burbleMe.profileSetup.licenceType')}</strong></li>
                    <li>• <strong>{t('forHoppere.burbleMe.profileSetup.licenceNumber')}</strong></li>
                    <li>• <strong>{t('forHoppere.burbleMe.profileSetup.memberNumber')}</strong></li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                  {burbleMeProfileNote}
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
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-sky" />
                  {t('forHoppere.burbleMe.checkIn.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.checkIn.dropzone')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {burbleMeCheckInDropzoneDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.checkIn.formation')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {burbleMeCheckInFormationDesc}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">{t('forHoppere.burbleMe.checkIn.trackingRules')}</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {burbleMeCheckInRules.map((rule, i) => (
                      <li key={i}>• {rule}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5 text-sky" />
                  {t('forHoppere.burbleMe.notifications.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.notifications.loadTime')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {burbleMeLoadTimeDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.notifications.outlanding')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {burbleMeOutlandingDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('forHoppere.burbleMe.notifications.location')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {burbleMeLocationDesc}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
