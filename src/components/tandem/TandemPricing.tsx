'use client';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSContent } from '@/hooks/useCMSContent';
import { SectionHeader } from '@/components/shared';
export function TandemPricing() {
  const { t } = useLanguage();
  const { content } = useCMSContent();
  const getPricing = () => [
    {
      name: t('tandem.pricing.weekday.name'),
      price: String(content?.pricing?.tandem?.weekday || 4690),
      description: t('tandem.pricing.weekday.description'),
      popular: false,
    },
    {
      name: t('tandem.pricing.weekend.name'),
      price: String(content?.pricing?.tandem?.weekend || 5190),
      description: t('tandem.pricing.weekend.description'),
      popular: true,
    },
  ];
  const getMediaPackages = () => [
    {
      name: t('tandem.pricing.media.video.name'),
      price: `${content?.pricing?.tandem?.video || 800} kr`,
      description: t('tandem.pricing.media.video.description'),
    },
    {
      name: t('tandem.pricing.media.videoPhotos.name'),
      price: `${content?.pricing?.tandem?.videoPhotos || 1290} kr`,
      description: t('tandem.pricing.media.videoPhotos.description'),
    },
    {
      name: t('tandem.pricing.media.fullPackage.name'),
      price: `${content?.pricing?.tandem?.fullPackage || 1780} kr`,
      description: t('tandem.pricing.media.fullPackage.description'),
    },
  ];
  const pricing = getPricing();
  const mediaPackages = getMediaPackages();
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('tandem.pricing.badge')}
          title={t('tandem.pricing.title')}
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className={`relative h-full ${plan.popular ? 'border-sky shadow-xl' : ''}`}>
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
                    {plan.price}{' '}
                    <span className="text-lg font-normal text-muted-foreground">kr</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t('tandem.pricing.media.title')}
          </h3>
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
  );
}
