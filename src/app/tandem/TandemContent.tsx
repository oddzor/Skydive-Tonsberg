'use client';
import {
  TandemHero,
  TandemGallery,
  TandemHighlights,
  TandemPricing,
  TandemRequirements,
  TandemJumpDay,
  TandemFAQ,
  TandemCTA,
} from '@/components/tandem';
export function TandemContent() {
  return (
    <>
      <TandemHero />
      <TandemGallery />
      <TandemHighlights />
      <TandemPricing />
      <TandemRequirements />
      <TandemJumpDay />
      <TandemFAQ />
      <TandemCTA />
    </>
  );
}
