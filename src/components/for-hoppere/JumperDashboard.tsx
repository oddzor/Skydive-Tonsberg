'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Wind,
  CloudSun,
  ClipboardList,
  LayoutDashboard,
  ArrowUpFromLine,
  ChevronLeft,
  Maximize2,
  Loader2,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type SectionId = 'manifest' | 'wind' | 'windy' | 'weather' | 'camera';

export function JumperDashboard() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<SectionId | null>(null);
  const [activeTab, setActiveTab] = useState<SectionId>('manifest');
  const [loaded, setLoaded] = useState<Set<SectionId>>(new Set());
  const { t, language } = useLanguage();

  const sections = [
    {
      id: 'manifest' as SectionId,
      icon: ClipboardList,
      label: t('forHoppere.dashboard.manifest'),
      src: '/api/burble-proxy',
    },
    {
      id: 'wind' as SectionId,
      icon: Wind,
      label: t('forHoppere.dashboard.wind'),
      src: '/api/wind-proxy',
    },
    {
      id: 'windy' as SectionId,
      icon: ArrowUpFromLine,
      label: t('forHoppere.dashboard.windAloft'),
      src: '/api/winds-aloft',
    },
    {
      id: 'weather' as SectionId,
      icon: CloudSun,
      label: t('forHoppere.dashboard.weather'),
      src: `/api/yr-embed?lang=${language}`,
    },
  ];

  const cameraSection = { id: 'camera' as SectionId, label: t('forHoppere.dashboard.cameraButton'), src: '/api/camera-proxy' };
  const expandedSection = expanded === 'camera' ? cameraSection : sections.find((s) => s.id === expanded);
  const activeTabSection = sections.find((s) => s.id === activeTab)!;

  const handleClose = () => {
    setOpen(false);
    setExpanded(null);
    setLoaded(new Set());
  };

  const markLoaded = (id: SectionId) =>
    setLoaded((prev) => new Set([...prev, id]));

  const renderFrame = (
    section: { id: SectionId; src: string; label: string },
    className: string,
  ) => (
    <div className="relative w-full h-full">
      {!loaded.has(section.id) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <iframe
        src={section.src}
        className={className}
        title={section.label}
        onLoad={() => markLoaded(section.id)}
      />
    </div>
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 bg-gradient-brand hover:opacity-90 text-white"
      >
        <LayoutDashboard className="w-4 h-4" />
        {t('forHoppere.dashboard.openButton')}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
              <div className="flex items-center gap-2">
                {expanded && (
                  <button
                    onClick={() => setExpanded(null)}
                    className="p-1.5 rounded-full hover:bg-muted/60 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <LayoutDashboard className="w-5 h-5 text-sky" />
                <h2 className="font-bold text-base">
                  {expanded ? expandedSection?.label : t('forHoppere.dashboard.title')}
                </h2>
              </div>
              <div className="flex items-center gap-1">
                {!expanded && (
                  <button
                    onClick={() => setExpanded('camera')}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-brand hover:opacity-90 text-white transition-opacity"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('forHoppere.dashboard.cameraButton')}</span>
                  </button>
                )}
                <button
                  onClick={expanded ? () => setExpanded(null) : handleClose}
                  className="p-1.5 rounded-full hover:bg-muted/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div
                  key={`expanded-${expanded}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-h-0 p-3"
                >
                  {renderFrame(expandedSection!, 'w-full h-full rounded-xl border')}
                </motion.div>
              ) : (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-h-0 flex flex-col"
                >
                  <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-3 flex-1 min-h-0 p-3">
                    {sections.map((section) => (
                      <div key={section.id} className="flex flex-col gap-1 min-h-0">
                        <div className="flex items-center justify-between px-1 shrink-0">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <section.icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="text-xs font-medium">{section.label}</span>
                          </div>
                          <button
                            onClick={() => setExpanded(section.id)}
                            className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border">
                          {renderFrame(section, 'w-full h-full')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex lg:hidden flex-col flex-1 min-h-0">
                    <div className="flex border-b shrink-0">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveTab(section.id)}
                          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                            activeTab === section.id
                              ? 'text-sky border-b-2 border-sky'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <section.icon className="w-5 h-5" />
                          <span className="text-[10px] font-medium hidden sm:block truncate px-1">
                            {section.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 min-h-0 p-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="h-full"
                        >
                          {renderFrame(activeTabSection, 'w-full h-full rounded-xl border')}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
