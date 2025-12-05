"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

// Fallback reviews in case API fails or for development
const fallbackReviews: Review[] = [
  {
    author_name: "Maria Johansen",
    rating: 5,
    text: "Fantastisk opplevelse! Instruktørene var utrolig profesjonelle og fikk meg til å føle meg trygg hele veien. Anbefales på det sterkeste!",
    time: Date.now() - 86400000 * 7,
  },
  {
    author_name: "Erik Hansen",
    rating: 5,
    text: "Gjorde mitt første tandemhopp her og det var helt utrolig. Fra briefing til landing var alt perfekt organisert. Kommer tilbake!",
    time: Date.now() - 86400000 * 14,
  },
  {
    author_name: "Silje Andersen",
    rating: 5,
    text: "Tok AFF-kurset her og kan ikke anbefale det nok. Lærte masse og føler meg godt forberedt på å fortsette hoppingen. Topp instruktører!",
    time: Date.now() - 86400000 * 21,
  },
  {
    author_name: "Thomas Berg",
    rating: 5,
    text: "Skydive Tønsberg har et fantastisk miljø. Alle er velkomne og stemningen er alltid god. Perfekt sted for både nybegynnere og erfarne.",
    time: Date.now() - 86400000 * 30,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews from API (with rate limiting built into the API route)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            // Sort by newest first
            const sortedReviews = data.reviews.sort(
              (a: Review, b: Review) => b.time - a.time
            );
            setReviews(sortedReviews);
          }
        }
      } catch (error) {
        console.log("Using fallback reviews");
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
            Anmeldelser
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hva våre <span className="text-gradient">hoppere</span> sier
          </h2>
          <p className="text-lg text-muted-foreground">
            Les om opplevelsene til de som allerede har tatt spranget med oss.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Desktop: Show 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={`${review.author_name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {/* Mobile: Show 1 card */}
          <div className="lg:hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewCard review={reviews[currentIndex]} />
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full"
              aria-label="Forrige anmeldelse"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-gradient-brand"
                      : "bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Gå til anmeldelse ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full"
              aria-label="Neste anmeldelse"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/maps/place/Skydive+Tønsberg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={16}
              height={16}
              className="opacity-70"
            />
            Se alle anmeldelser på Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Card className="h-full border-0 shadow-lg bg-card">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote Icon */}
        <Quote className="w-10 h-10 text-sky/20 mb-4" />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-foreground/80 leading-relaxed flex-1 mb-6">
          "{review.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold">
            {review.author_name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{review.author_name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(review.time)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}






