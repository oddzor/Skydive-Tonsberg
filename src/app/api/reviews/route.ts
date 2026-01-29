import { NextResponse } from "next/server";
import {
  readReviewsFromFile,
  isCacheValid,
  getDaysSinceLastFetch,
} from "@/lib/reviews-storage";
export async function GET() {
  try {
    const data = readReviewsFromFile();
    const cacheValid = isCacheValid(data.lastFetched);
    const daysSinceLastFetch = getDaysSinceLastFetch(data.lastFetched);
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
    return NextResponse.json({
      reviews: [],
      error: "Failed to fetch reviews",
      info: "Using fallback data",
    });
  }
}
