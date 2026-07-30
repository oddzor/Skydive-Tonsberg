'use client';
import { PageNav } from '@/components/shared/PageNav';

const SECTIONS = [
  { id: 'events', labelKey: 'forHoppere.quickLinks.events' },
  { id: 'fornye',         labelKey: 'forHoppere.quickLinks.renewal' },
  { id: 'handbok',        labelKey: 'forHoppere.quickLinks.handbook' },
  { id: 'bunkhouse',      labelKey: 'forHoppere.quickLinks.bunkhouse' },
  { id: 'fasiliteter',    labelKey: 'forHoppere.quickLinks.facilities' },
  { id: 'burbleme',       labelKey: 'forHoppere.quickLinks.burbleme' },
  { id: 'hoppfeltbrief',  labelKey: 'forHoppere.quickLinks.dropzoneBrief' },
  { id: 'priser',         labelKey: 'forHoppere.quickLinks.pricing' },
  { id: 'rental',         labelKey: 'forHoppere.quickLinks.rental' },
  { id: 'flyet',          labelKey: 'forHoppere.quickLinks.aircraft' },
  { id: 'forsikring',     labelKey: 'forHoppere.quickLinks.insurance' },
  { id: 'varsling',       labelKey: 'forHoppere.quickLinks.reporting' },
  { id: 'grasrotandelen', labelKey: 'forHoppere.quickLinks.grasrotandelen' },
  { id: 'faq',            labelKey: 'forHoppere.quickLinks.faq' },
];

export function ForHoppereNav() {
  return <PageNav sections={SECTIONS} />;
}
