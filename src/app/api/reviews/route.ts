import { NextResponse } from "next/server";
import {
  readReviewsFromFile,
  isCacheValid,
  getDaysSinceLastFetch,
  type Review,
} from "@/lib/reviews-storage";

/**
 * Google Reviews API endpoint
 * 
 * This endpoint serves cached reviews from persistent storage.
 * Reviews are updated monthly via cron job to stay within Outscraper free tier.
 * 
 * - Free tier: 25 requests/month
 * - We fetch once per month (1 call/month)
 * - Cache duration: 30 days
 * - Manual refresh available at /api/reviews/refresh
 */


export async function GET() {
  try {
    // Read reviews from persistent storage
    const data = readReviewsFromFile();

    const cacheValid = isCacheValid(data.lastFetched);
    const daysSinceLastFetch = getDaysSinceLastFetch(data.lastFetched);

    // Return cached reviews (they're updated monthly via cron)
    return NextResponse.json({
      reviews: data.reviews,
      cached: true,
      cacheValid,
      daysSinceLastFetch,
      lastFetched: data.lastFetched,
      source: data.source,
      monthlyApiCalls: data.monthlyApiCalls,
      info: cacheValid 
        ? 'Reviews are up to date' 
        : 'Reviews may be stale - waiting for monthly update',
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    
    // Return fallback reviews if file read fails
    return NextResponse.json({
      reviews: [],
      error: "Failed to fetch reviews",
      info: "Using fallback data",
    });
  }
}













