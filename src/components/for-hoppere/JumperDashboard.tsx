'use client';
import { useState, useEffect } from 'react';
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
  const [cameraOpen, setCameraOpen] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (open) document.body.classList.add('dashboard-open');
    else document.body.classList.remove('dashboard-open');
    return () => document.body.classList.remove('dashboard-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setExpanded(null);
      setCameraOpen(false);
      setLoaded(new Set());
    }, 60_000);
    return () => clearTimeout(timer);
  }, [open]);

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
    {
      id: 'camera' as SectionId,
      icon: Camera,
      label: t('forHoppere.dashboard.cameraButton'),
      src: '/api/camera-proxy',
    },
  ];

  const desktopSections = sections.filter((s) => s.id !== 'camera');
  const cameraSection = sections.find((s) => s.id === 'camera')!;
  const expandedSection = sections.find((s) => s.id === expanded);
  const activeTabSection = sections.find((s) => s.id === activeTab)!;

  const handleClose = () => {
    setOpen(false);
    setExpanded(null);
    setCameraOpen(false);
    setLoaded(new Set());
  };

  const markLoaded = (id: SectionId) =>
    setLoaded((prev) => new Set([...prev, id]));

  const renderFrame = (
    section: { id: SectionId; src: string; label: string },
    className: string,
    scale = 1,
  ) => {
    const isScaled = scale < 1;
    return (
      <div className="relative w-full h-full overflow-hidden">
        {!loaded.has(section.id) && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl z-10">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <iframe
          src={section.src}
          className={isScaled ? 'absolute rounded-xl border' : className}
          style={isScaled ? {
            top: '50%',
            left: '50%',
            width: `${(1 / scale) * 100}%`,
            height: `${(1 / scale) * 100}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
          } : undefined}
          title={section.label}
          onLoad={() => markLoaded(section.id)}
        />
      </div>
    );
  };

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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCameraOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground text-sm"
                >
                  <Camera className="w-4 h-4" />
                  {cameraSection.label}
                </button>
                <button
                  onClick={handleClose}
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
                  <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-3 flex-1 min-h-0 p-3">
                    {desktopSections.map((section) => (
                      <div key={section.id} className="flex flex-col gap-1 h-full">
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
                          className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors ${
                            activeTab === section.id
                              ? 'text-sky border-b-2 border-sky'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <section.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col p-3 gap-2">
                      <div className="flex items-center justify-between px-1 shrink-0">
                        <div className="flex items-center gap-1.5 text-foreground">
                          <activeTabSection.icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-xs font-medium">{activeTabSection.label}</span>
                        </div>
                        <button
                          onClick={() => setExpanded(activeTab)}
                          className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex-1 min-h-0">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="h-full"
                          >
                            {renderFrame(activeTabSection, 'w-full h-full rounded-xl border', 0.65)}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {cameraOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center p-4"
                  onClick={() => setCameraOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-background rounded-xl overflow-hidden flex flex-col w-full max-w-5xl h-[90vh] shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-sky" />
                        <span className="font-medium text-sm">{cameraSection.label}</span>
                      </div>
                      <button
                        onClick={() => setCameraOpen(false)}
                        className="p-1.5 rounded-full hover:bg-muted/60 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 p-3">
                      {renderFrame(cameraSection, 'w-full h-full rounded-xl')}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
