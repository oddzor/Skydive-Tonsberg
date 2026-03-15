'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export interface PageNavSection {
  id: string;
  labelKey: string;
}

interface PageNavProps {
  sections: PageNavSection[];
}

export function PageNav({ sections }: PageNavProps) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0]?.id ?? '';
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [sections]);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-stretch"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 16, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 16, width: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="bg-background/95 backdrop-blur-md border border-r-0 border-border shadow-xl rounded-l-xl py-2 h-full flex flex-col justify-center">
              {sections.map(({ id, labelKey }) => {
                const isActive = id === activeId;
                return (
                  <button
                    key={id}
                    onClick={() => navigate(id)}
                    className={cn(
                      'flex items-center gap-2 w-full text-left px-4 py-1.5 text-xs transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-sky font-semibold'
                        : 'text-foreground/60 hover:text-foreground'
                    )}
                  >
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full shrink-0 transition-colors',
                      isActive ? 'bg-sky' : 'bg-border'
                    )} />
                    {t(labelKey)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(v => !v)}
        aria-label="Page navigation"
        className="flex flex-col items-center justify-center gap-1 md:gap-1.5 bg-background/95 backdrop-blur-md border border-r-0 border-border shadow-lg rounded-l-lg md:rounded-l-xl px-1.5 md:px-2.5 py-2 md:py-3 transition-colors hover:bg-accent"
      >
        {sections.map(({ id }) => {
          const isActive = id === activeId;
          return (
            <span
              key={id}
              className={cn(
                'block rounded-full transition-all duration-300',
                isActive
                  ? 'w-3 md:w-4 h-px md:h-0.5 bg-sky'
                  : 'w-2 md:w-2.5 h-px bg-foreground/25'
              )}
            />
          );
        })}
      </button>
    </div>
  );
}
