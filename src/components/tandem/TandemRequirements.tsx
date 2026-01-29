'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTandemData } from '@/hooks/useTandemData';
export function TandemRequirements() {
  const { t } = useLanguage();
  const { requirements } = useTandemData();
  return (
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
  );
}
