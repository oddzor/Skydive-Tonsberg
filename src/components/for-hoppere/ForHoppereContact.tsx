'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, Calendar, Smartphone,
  ShoppingBag, FileText, Facebook, Instagram, Youtube, Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { localePath } from '@/lib/locale-href';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereContact() {
  const { t, language } = useLanguage();
  const { openingHours } = useForHoppereData();
  return (
    <section className="py-24 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {t('forHoppere.contact.title')}{' '}
              <span className="text-gradient">{t('forHoppere.contact.titleHighlight')}</span>
            </h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-sky shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{t('forHoppere.contact.address')}</p>
                    <p className="text-muted-foreground">{t('forHoppere.contact.addressValue')}</p>
                    <p className="text-sm text-muted-foreground">{t('forHoppere.contact.orgNumber')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-sky shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{t('forHoppere.contact.phone')}</p>
                    <a href="tel:+4733380670" className="text-muted-foreground hover:text-sky">
                      33 38 06 70
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-sky shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{t('forHoppere.contact.email')}</p>
                    <a href="mailto:info@hoppfallskjerm.no" className="text-muted-foreground hover:text-sky">
                      info@hoppfallskjerm.no
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-sky shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{t('forHoppere.contact.openingHours')}</p>
                    {openingHours.map((item, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {item.day}: {item.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {t('forHoppere.contact.linksTitle')}{' '}
              <span className="text-gradient">{t('forHoppere.contact.linksTitleHighlight')}</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href={localePath(language, 'hoppkalender')}>
                  <Calendar className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.calendar')}</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://dzm.burblesoft.com/jumper_manifest_public?dz_id=551" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.burbleme')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://store.burblesoft.com/?dz_id=551" target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.shop')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://nlf.no/grener/fallskjerm/Medlem/minidrett/" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.minIdrett')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://www.facebook.com/TonsbergFallskjermklubb" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.facebook')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://www.instagram.com/skydivetonsberg" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.instagram')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://www.youtube.com/@skydivetonsberg" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.youtube')}</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <a href="https://www.jarlsbergluftsportssenter.no/" target="_blank" rel="noopener noreferrer">
                  <Info className="w-6 h-6 text-sky" />
                  <span>{t('forHoppere.contact.links.handbook')}</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
