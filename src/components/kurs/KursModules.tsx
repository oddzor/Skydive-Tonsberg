'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKursData } from '@/hooks/useKursData';
export function KursModules() {
  const { t } = useLanguage();
  const { modules } = useKursData();
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('kurs.modules.title')}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-brand flex items-center justify-center">
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center mb-2 text-sm text-muted-foreground font-semibold">
                    {module.duration}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{module.title}</h3>
                  <p className="text-muted-foreground text-center">{module.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
