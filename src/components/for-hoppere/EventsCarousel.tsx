'use client';
import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FacebookEvent {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  place?: { name: string };
  attending_count?: number;
  is_canceled?: boolean;
}

const CARD_WIDTH_DESKTOP = 256;
const CARD_GAP = 24;

export function EventsCarousel() {
  const [events, setEvents] = useState<FacebookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { t, language } = useLanguage();

  useEffect(() => {
    fetch('/api/facebook-events')
      .then((r) => r.json())
      .then((d) => {
        const sorted = (d.events ?? []).sort(
          (a: FacebookEvent, b: FacebookEvent) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        );
        setEvents(sorted);
        if (d.error === 'token_expired') setTokenExpired(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [events]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = (card ? card.offsetWidth : CARD_WIDTH_DESKTOP) + CARD_GAP;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
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
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 shrink-0" />
        <div className="flex-1 flex gap-6 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-64 h-48 rounded-xl bg-muted animate-pulse shrink-0" />
          ))}
        </div>
        <div className="w-9 h-9 shrink-0" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          {tokenExpired ? t('forHoppere.events.tokenExpired') : t('forHoppere.events.empty')}
        </p>
        <Button asChild variant="outline" className="gap-2">
          <a href="https://www.facebook.com/skydivetonsberg/events" target="_blank" rel="noopener noreferrer">
            {t('forHoppere.events.viewOnFacebook')}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex shrink-0 w-9 h-9 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-accent transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div
          ref={scrollRef}
          className="flex-1 flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event) => (
            <a
              key={event.id}
              data-card=""
              href={`https://www.facebook.com/events/${event.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-60 sm:w-64 shrink-0 snap-start"
            >
              <div className={`h-full rounded-xl border border-border bg-card shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col p-4 gap-2 cursor-pointer${event.is_canceled ? ' opacity-60' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm leading-snug sm:line-clamp-2">{event.name}</h3>
                  {event.is_canceled && (
                    <span className="shrink-0 px-2 py-0.5 bg-destructive text-white text-[10px] font-semibold rounded-full">
                      {t('forHoppere.events.canceled')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sky">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs">{formatDate(event.start_time)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs">{formatTime(event.start_time)}</span>
                </div>
                {event.place && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs truncate">{event.place.name}</span>
                  </div>
                )}
                {event.attending_count != null && event.attending_count > 0 && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs">{event.attending_count} {t('forHoppere.events.attending')}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex shrink-0 w-9 h-9 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-accent transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        <div className="relative w-10 h-2 rounded-full bg-muted-foreground/20 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 h-2 rounded-full bg-sky transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
}
