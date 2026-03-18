'use client';
import { motion } from 'framer-motion';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereSeasonBar() {
  const { seasonInfo } = useForHoppereData();
  return (
    <section className="py-10 bg-sky text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {seasonInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <info.icon className="w-6 h-6 text-white/80" />
              <div>
                <p className="text-sm text-white/70">{info.label}</p>
                <p className="font-semibold">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
