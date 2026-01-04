import { NextRequest, NextResponse } from "next/server";
import {
  readReviewsFromFile,
  writeReviewsToFile,
  canMakeApiCall,
  shouldResetMonthlyCounter,
  getDaysSinceLastFetch,
  type Review,
  type ReviewsData,
} from "@/lib/reviews-storage";

/**
 * Reviews Refresh Endpoint
 * 
 * This endpoint fetches fresh reviews from Outscraper and updates the cache.
 * 
 * Security:
 * - Protected by secret key (CRON_SECRET)
 * - Can be triggered by:
 *   1. Vercel Cron (monthly automated)
 *   2. Manual admin refresh
 * 
 * Usage:
 * GET /api/reviews/refresh?secret=YOUR_CRON_SECRET
 */

const MAX_REVIEWS = 250;

async function fetchFromOutscraper(): Promise<Review[]> {
  const apiKey = process.env.OUTSCRAPER_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Outscraper API key not configured");
    throw new Error("Outscraper API key not configured");
  }

  try {
    // Your Skydive Tønsberg Google Place
    const placeQuery = "Skydive Tønsberg, Flyplassveien 6, 3170 Sem, Norway";
    const encodedQuery = encodeURIComponent(placeQuery);
    
    console.log("🔍 Fetching reviews from Outscraper...");
    
    const response = await fetch(
      `https://api.app.outscraper.com/maps/reviews-v3?query=${encodedQuery}&reviewsLimit=${MAX_REVIEWS}&sort=newest&language=no`,
      {
        headers: {
          "X-API-KEY": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Outscraper API error:", response.status, errorText);
      throw new Error(`Outscraper API error: ${response.status}`);
    }
    
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

      // Filter out reviews without text and sort by newest
      const filteredReviews = reviews
        .filter((r) => r.text && r.text.length > 10)
        .sort((a, b) => b.time - a.time);

      console.log(`✅ Fetched ${filteredReviews.length} reviews from Outscraper`);
      return filteredReviews;
    }

    console.warn("⚠️ No reviews found in Outscraper response");
    return [];
  } catch (error) {
    console.error("❌ Error fetching from Outscraper:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Security: Verify secret key
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const CRON_SECRET = process.env.CRON_SECRET;

    if (!CRON_SECRET) {
      console.error("❌ CRON_SECRET not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (secret !== CRON_SECRET) {
      console.warn("⚠️ Unauthorized refresh attempt");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Read current data
    const currentData = readReviewsFromFile();

    // Check if we need to reset monthly counter
    if (shouldResetMonthlyCounter(currentData.lastCallReset)) {
      console.log("🔄 Resetting monthly API call counter");
      currentData.monthlyApiCalls = 0;
      currentData.lastCallReset = Date.now();
    }

    // Check if we can make API call (free tier protection)
    if (!canMakeApiCall(currentData.monthlyApiCalls, currentData.lastCallReset)) {
      console.warn("⚠️ Monthly API call limit reached");
      return NextResponse.json({
        success: false,
        error: "Monthly API call limit reached",
        monthlyApiCalls: currentData.monthlyApiCalls,
        monthlyLimit: 480,
        message: "Waiting for monthly reset",
      }, { status: 429 });
    }

    // Check if we fetched recently (prevent duplicate fetches)
    const daysSinceLastFetch = getDaysSinceLastFetch(currentData.lastFetched);
    if (daysSinceLastFetch < 28) {
      console.log(`⏳ Reviews were fetched ${daysSinceLastFetch} days ago. Skipping.`);
      return NextResponse.json({
        success: false,
        skipped: true,
        message: "Reviews recently updated",
        daysSinceLastFetch,
        nextUpdateIn: 30 - daysSinceLastFetch,
      });
    }

    // Fetch fresh reviews from Outscraper
    console.log("📡 Fetching fresh reviews...");
    const reviews = await fetchFromOutscraper();

    if (reviews.length === 0) {
      console.warn("⚠️ No reviews fetched, keeping old data");
      return NextResponse.json({
        success: false,
        error: "No reviews returned from API",
        keptOldReviews: true,
        reviewCount: currentData.reviews.length,
      });
    }

    // Update data
    const newData: ReviewsData = {
      reviews,
      lastFetched: Date.now(),
      monthlyApiCalls: currentData.monthlyApiCalls + 1,
      lastCallReset: currentData.lastCallReset,
      source: 'outscraper',
    };

    // Save to file
    writeReviewsToFile(newData);

    console.log("✅ Reviews successfully updated!");

    return NextResponse.json({
      success: true,
      reviewCount: reviews.length,
      monthlyApiCalls: newData.monthlyApiCalls,
      monthlyCallsRemaining: 480 - newData.monthlyApiCalls,
      monthlyLimit: 480,
      lastFetched: new Date(newData.lastFetched).toISOString(),
      message: "Reviews successfully updated",
    });

  } catch (error) {
    console.error("❌ Refresh endpoint error:", error);
    return NextResponse.json(
      { 
        error: "Failed to refresh reviews",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

