'use client';
import {
  TandemHero,
  TandemFeaturedImage,
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
      <TandemFeaturedImage />
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
