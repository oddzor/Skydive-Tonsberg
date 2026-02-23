'use client';
import { useCMSContent } from '@/hooks/useCMSContent';
import {
  KursHero,
  KursModules,
  KursSchedule,
  KursIncluded,
  KursRequirements,
  KursFAQ,
  KursPayment,
  KursProgression,
  KursALicense,
  PhotoCarousel,
} from '@/components/kurs';
import { localImageSrc } from '@/components/kurs/imageHelpers';

export function KursContent() {
  const { content } = useCMSContent();

  const groupPhotos = [
    {
      src: localImageSrc(content?.course?.images?.groupPhoto1, '/course-group-1.webp'),
      alt: 'AFF Students in Airplane',
      objectPosition: 'top',
    },
    {
      src: localImageSrc(content?.course?.images?.groupPhoto2, '/course-group-2.webp'),
      alt: 'Student After Successful Jump',
      objectPosition: 'center',
    },
    {
      src: localImageSrc(content?.course?.images?.groupPhoto3, '/course-group-3.webp'),
      alt: 'AFF Training Session',
      objectPosition: 'center',
    },
  ];

  return (
    <>
      <KursHero />

      <KursModules />

      <KursSchedule />

      <KursIncluded />

      {/* Desktop group photos — rendered before the payment section */}
      <section className="hidden md:block py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <PhotoCarousel photos={groupPhotos} height={300} columns={3} animation="zoom" />
        </div>
      </section>

      <KursPayment />

      {/* Mobile group photos — rendered after the payment section */}
      <div className="md:hidden py-8 px-4">
        <PhotoCarousel photos={groupPhotos} height={300} columns={3} animation="zoom" />
      </div>

      <KursProgression />

      <KursALicense />

      <KursRequirements />

      <KursFAQ />
    </>
  );
}
