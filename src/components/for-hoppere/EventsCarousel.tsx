'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FacebookEvent {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  cover?: { source: string };
  place?: { name: string };
  attending_count?: number;
  is_canceled?: boolean;
}

export function EventsCarousel() {
  const [events, setEvents] = useState<FacebookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    fetch('/api/facebook-events')
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const width = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  const locale = language === 'en' ? 'en-GB' : 'nb-NO';

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Oslo',
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Oslo',
    });

  if (loading) {
    return (
      <div className="flex gap-6 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="min-w-[300px] h-80 rounded-xl bg-muted animate-pulse shrink-0" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{t('forHoppere.events.empty')}</p>
        <Button asChild variant="outline" className="gap-2">
          <a
            href="https://www.facebook.com/skydivetonsberg/events"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4" />
            {t('forHoppere.events.viewOnFacebook')}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative px-0 sm:px-8">
      {events.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            data-card=""
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="min-w-[280px] sm:min-w-[320px] snap-start shrink-0 flex flex-col"
          >
            <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col${event.is_canceled ? ' opacity-60' : ''}`}>
              {event.cover ? (
                <div className="relative h-40 overflow-hidden shrink-0">
                  <Image
                    src={event.cover.source}
                    alt={event.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                  {event.is_canceled && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="px-3 py-1 bg-destructive text-white text-sm font-semibold rounded-full">
                        {t('forHoppere.events.canceled')}
                      </span>
                    </div>
                  )}
                </div>
              ) : event.is_canceled ? (
                <div className="px-5 pt-5">
                  <span className="px-3 py-1 bg-destructive text-white text-sm font-semibold rounded-full">
                    {t('forHoppere.events.canceled')}
                  </span>
                </div>
              ) : null}
              <CardContent className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-bold text-base leading-snug line-clamp-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-sky">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{formatDate(event.start_time)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{formatTime(event.start_time)}</span>
                </div>
                {event.place && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{event.place.name}</span>
                  </div>
                )}
                {event.attending_count != null && event.attending_count > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>{event.attending_count} {t('forHoppere.events.attending')}</span>
                  </div>
                )}
                {event.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{event.description}</p>
                )}
                <Button
                  asChild
                  size="sm"
                  className="mt-auto bg-gradient-brand hover:opacity-90 text-white gap-2"
                >
                  <a
                    href={`https://www.facebook.com/events/${event.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t('forHoppere.events.viewOnFacebook')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
