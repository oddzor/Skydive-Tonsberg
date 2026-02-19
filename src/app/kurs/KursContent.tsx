'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  CheckCircle2, 
  FileText, 
  CreditCard, 
  Smartphone, 
  RefreshCw, 
  AlertTriangle, 
  X, 
  ClipboardList, 
  GraduationCap, 
  PartyPopper 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import {
  KursHero,
  KursModules,
  KursSchedule,
  KursIncluded,
  KursRequirements,
  KursFAQ,
} from '@/components/kurs';
function localImageSrc(cmsPath: string | undefined, fallback: string): string {
  return cmsPath && typeof cmsPath === 'string' && cmsPath.startsWith('/') ? cmsPath : fallback;
}

export function KursContent() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const progressionSoloSrc = localImageSrc(content?.course?.images?.soloStudent, '/aff-solo-student.webp');
  const progressionCoachingSrc = localImageSrc(content?.course?.images?.instructorCoaching, '/happy-aff-student.webp');
  return (
    <>

      <KursHero />

      <KursModules />

      <KursSchedule />

      <KursIncluded /><section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src={content?.course?.images?.groupPhoto1 || '/students-in-airplane.webp'}
                alt="AFF Students in Airplane"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src={content?.course?.images?.groupPhoto2 || '/student-after-jump.webp'}
                alt="Student After Successful Jump"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src={content?.course?.images?.groupPhoto3 || '/aff-trening.webp'}
                alt="AFF Training Session"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('kurs.payment.title')}
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">{t('kurs.payment.priceTitle')}</h3>
                <div className="text-4xl font-bold text-sky mb-2">
                  18 990 kr
                </div>
                <p className="text-muted-foreground mb-6">{t('kurs.payment.completeCourse')}</p>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky" />
                      {t('kurs.payment.bookingTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.payment.bookingDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-sky" />
                      {t('kurs.payment.startTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.payment.startDesc')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-sky" />
                      {t('kurs.payment.vippsTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.payment.vippsDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">{t('kurs.payment.rejumpTitle')}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-sky" />
                      {t('kurs.payment.rejumpSubtitle')}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('kurs.payment.rejumpDesc1')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.payment.rejumpDesc2')} <a href="/for-hoppere#priser" className="text-sky hover:underline">{t('nav.forJumpers')}</a>.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-semibold mb-2 text-amber-900 dark:text-amber-100 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {t('kurs.payment.membershipTitle')}
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      {t('kurs.payment.membershipDesc')}
                    </p>
                    <a 
                      href="https://nlf.no/medlemsservice/kontingentkalkulator/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-sky hover:underline mt-2 inline-block"
                    >
                      {t('kurs.payment.membershipLink')} →
                    </a>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <X className="w-4 h-4 text-destructive" />
                      {t('kurs.payment.cancellationTitle')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('kurs.payment.cancellationDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('kurs.progression.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('kurs.progression.description')}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-6">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{t('kurs.progression.level1Title')}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                          <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-3">
                        <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level1Goal')}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('kurs.progression.level1Desc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{t('kurs.progression.level2Title')}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                          <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-3">
                        <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level2Goal')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{t('kurs.progression.level3Title')}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Instructors')}</strong> 2</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Altitude')}</strong> 12 500 fot</p>
                          <p className="text-muted-foreground"><strong>{t('kurs.progression.level1Deploy')}</strong> 5 500 fot</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Freefall')}</strong> {t('kurs.progression.level1FreefallTime')}</p>
                          <p className="text-muted-foreground mb-1"><strong>{t('kurs.progression.level1Canopy')}</strong> {t('kurs.progression.level1CanopyTime')}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-3">
                        <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level3Goal')}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('kurs.progression.level3Desc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 my-12"
            >
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={progressionSoloSrc}
                  alt="Solo AFF Student Flying"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={progressionCoachingSrc}
                  alt="Instructor Coaching Student in Freefall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-lg font-bold">
                        4
                      </div>
                      <h3 className="text-lg font-bold">{t('kurs.progression.level4Title')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>1 {t('kurs.progression.level1Instructors').toLowerCase()}</strong> | 12 500 fot | {t('kurs.progression.level47FreefallTime')} {t('kurs.progression.level1Freefall').toLowerCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level4Goal')}
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
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-lg font-bold">
                        5
                      </div>
                      <h3 className="text-lg font-bold">{t('kurs.progression.level5Title')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>1 {t('kurs.progression.level1Instructors').toLowerCase()}</strong> | 12 500 fot | {t('kurs.progression.level47FreefallTime')} {t('kurs.progression.level1Freefall').toLowerCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level5Goal')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-lg font-bold">
                        6
                      </div>
                      <h3 className="text-lg font-bold">{t('kurs.progression.level6Title')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>1 {t('kurs.progression.level1Instructors').toLowerCase()}</strong> | 12 500 fot | {t('kurs.progression.level47FreefallTime')} {t('kurs.progression.level1Freefall').toLowerCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level6Goal')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white text-lg font-bold">
                        7
                      </div>
                      <h3 className="text-lg font-bold">{t('kurs.progression.level7Title')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>1 {t('kurs.progression.level1Instructors').toLowerCase()}</strong> | 12 500 fot | {t('kurs.progression.level1Deploy')}: 4 000 fot
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('kurs.requirements.title')}:</strong> {t('kurs.progression.level7Goal')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-sky shadow-xl bg-linear-to-br from-sky/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-sky flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      8
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{t('kurs.progression.level8Title')}</h3>
                      <p className="text-muted-foreground mb-4">
                        {t('kurs.progression.level8Desc')}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-background rounded-lg">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-sky" />
                            {t('kurs.progression.level8Requirements')}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {t('kurs.progression.level8Req1')}</li>
                            <li>• {t('kurs.progression.level8Req2')}</li>
                            <li>• {t('kurs.progression.level8Req3')}</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-background rounded-lg">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-sky" />
                            {t('kurs.progression.level8NextSection')}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {t('kurs.progression.level8Next1')}</li>
                            <li>• {t('kurs.progression.level8Next2')}</li>
                            <li>• {t('kurs.progression.level8Next3')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('kurs.aLicense.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('kurs.aLicense.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-lg h-[450px] mx-auto rounded-2xl overflow-hidden shadow-2xl mb-12"
          >
            <Image
              src={content?.course?.images?.packingCourse || "/packing-course.webp"}
              alt="Student Learning to Pack Parachute"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.progressionTitle')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.soloJumps')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.soloJumpsDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.checkouts')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.checkoutsDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.lowJumps')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.lowJumpsDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
                    {t('kurs.aLicense.tempoDesc')}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">{t('kurs.aLicense.beforeLicenseTitle')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.packingCourse')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.packingCourseDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.packingExam')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.packingExamDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.aCourse')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.aCourseDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.aExam')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.aExamDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-leaf shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{t('kurs.aLicense.renUtover')}</p>
                        <p className="text-sm text-muted-foreground">{t('kurs.aLicense.renUtoverDesc')} <a href="https://renutover.no" target="_blank" rel="noopener noreferrer" className="text-sky hover:underline">renutover.no</a></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="border-2 border-leaf shadow-xl bg-linear-to-br from-leaf/5 to-transparent">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                  <PartyPopper className="w-6 h-6 text-leaf" />
                  {t('kurs.aLicense.congratulations')}
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {t('kurs.aLicense.congratsDesc')}
                </p>
                <p className="text-muted-foreground">
                  {t('kurs.aLicense.totalJumps')}
                </p>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl mt-12"
            >
              <Image
                src={content?.course?.images?.licenseCelebration || "/a-license-celebration.webp"}
                alt="New A-License Graduate Celebrating"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <KursRequirements />

      <KursFAQ />
    </>
  );
}
