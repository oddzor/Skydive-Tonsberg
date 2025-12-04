import { NextResponse } from "next/server";

/**
 * Google Reviews API endpoint using Outscraper
 * 
 * Rate limiting logic to stay within free tier:
 * - Free tier: 25 requests/month
 * - We cache reviews for 7 days to minimize API calls
 * - Only fetches on cache miss or expiration
 */

interface CachedReviews {
  reviews: Review[];
  lastFetched: number;
}

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

// In-memory cache (in production, use Redis or similar)
let reviewsCache: CachedReviews | null = null;

// Cache duration: 7 days in milliseconds
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

// Maximum reviews to fetch
const MAX_REVIEWS = 20;

// Track monthly API calls (reset manually or use a persistent store)
let monthlyApiCalls = 0;
let lastCallReset = Date.now();
const MAX_MONTHLY_CALLS = 20; // Leave buffer for free tier (25)

function shouldResetMonthlyCounter(): boolean {
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  return now - lastCallReset > oneMonth;
}

function canMakeApiCall(): boolean {
  if (shouldResetMonthlyCounter()) {
    monthlyApiCalls = 0;
    lastCallReset = Date.now();
  }
  return monthlyApiCalls < MAX_MONTHLY_CALLS;
}

function isCacheValid(): boolean {
  if (!reviewsCache) return false;
  const now = Date.now();
  return now - reviewsCache.lastFetched < CACHE_DURATION;
}

async function fetchFromOutscraper(): Promise<Review[]> {
  const apiKey = process.env.OUTSCRAPER_API_KEY;
  
  if (!apiKey) {
    console.log("Outscraper API key not configured");
    return [];
  }

  if (!canMakeApiCall()) {
    console.log("Monthly API call limit reached");
    return reviewsCache?.reviews || [];
  }

  try {
    // Outscraper Google Reviews API
    // Replace with your actual place ID or query
    const placeQuery = "Skydive Tønsberg, Norway";
    const encodedQuery = encodeURIComponent(placeQuery);
    
    const response = await fetch(
      `https://api.app.outscraper.com/maps/reviews-v3?query=${encodedQuery}&reviewsLimit=${MAX_REVIEWS}&sort=newest&language=no`,
      {
        headers: {
          "X-API-KEY": apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error("Outscraper API error:", response.status);
      return reviewsCache?.reviews || [];
    }

    monthlyApiCalls++;
    
    const data = await response.json();
    
    // Parse Outscraper response format
    if (data.data && data.data[0] && data.data[0].reviews_data) {
      const reviews: Review[] = data.data[0].reviews_data.map((review: {
        author_title?: string;
        review_rating?: number;
        review_text?: string;
        review_datetime_utc?: string;
        author_image?: string;
      }) => ({
        author_name: review.author_title || "Anonym",
        rating: review.review_rating || 5,
        text: review.review_text || "",
        time: new Date(review.review_datetime_utc || Date.now()).getTime(),
        profile_photo_url: review.author_image,
      }));

      // Filter out reviews without text
      return reviews.filter((r) => r.text && r.text.length > 10);
    }

    return [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return reviewsCache?.reviews || [];
  }
}

export async function GET() {
  try {
    // Check cache first
    if (isCacheValid() && reviewsCache) {
      return NextResponse.json({
        reviews: reviewsCache.reviews,
        cached: true,
        cacheAge: Date.now() - reviewsCache.lastFetched,
      });
    }

    // Fetch fresh reviews
    const reviews = await fetchFromOutscraper();

    if (reviews.length > 0) {
      // Update cache
      reviewsCache = {
        reviews,
        lastFetched: Date.now(),
      };

      return NextResponse.json({
        reviews,
        cached: false,
        monthlyCallsRemaining: MAX_MONTHLY_CALLS - monthlyApiCalls,
      });
    }

    // Return cached data if available, even if expired
    if (reviewsCache) {
      return NextResponse.json({
        reviews: reviewsCache.reviews,
        cached: true,
        stale: true,
      });
    }

    // No reviews available
    return NextResponse.json({
      reviews: [],
      error: "No reviews available",
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}




