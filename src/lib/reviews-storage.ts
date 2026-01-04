import fs from 'fs';
import path from 'path';

export interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export interface ReviewsData {
  reviews: Review[];
  lastFetched: number;
  monthlyApiCalls: number;
  lastCallReset: number;
  source: 'outscraper' | 'fallback' | 'cache';
}

const REVIEWS_FILE_PATH = path.join(process.cwd(), 'public', 'reviews', 'cached-reviews.json');

/**
 * Read reviews from persistent storage
 */
export function readReviewsFromFile(): ReviewsData {
  try {
    const fileContent = fs.readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading reviews file:', error);
    // Return default structure
    return {
      reviews: [],
      lastFetched: 0,
      monthlyApiCalls: 0,
      lastCallReset: Date.now(),
      source: 'fallback',
    };
  }
}

/**
 * Write reviews to persistent storage
 */
export function writeReviewsToFile(data: ReviewsData): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(REVIEWS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Reviews successfully written to file');
  } catch (error) {
    console.error('❌ Error writing reviews file:', error);
    throw error;
  }
}

/**
 * Check if monthly API call counter should be reset
 */
export function shouldResetMonthlyCounter(lastReset: number): boolean {
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  return now - lastReset > oneMonth;
}

/**
 * Check if we can make an API call (within free tier limits)
 */
export function canMakeApiCall(monthlyApiCalls: number, lastCallReset: number): boolean {
  const MAX_MONTHLY_CALLS = 480; // Stay under Outscraper's 500/month free tier (20 buffer)

  // Reset counter if needed
  if (shouldResetMonthlyCounter(lastCallReset)) {
    return true; // Counter will be reset, so we can make a call
  }

  return monthlyApiCalls < MAX_MONTHLY_CALLS;
}

/**
 * Check if cache is still valid (less than 30 days old)
 */
export function isCacheValid(lastFetched: number): boolean {
  if (!lastFetched || lastFetched === 0) return false;
  
  const now = Date.now();
  const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
  return now - lastFetched < CACHE_DURATION;
}

/**
 * Get days since last fetch
 */
export function getDaysSinceLastFetch(lastFetched: number): number {
  if (!lastFetched || lastFetched === 0) return Infinity;
  
  const now = Date.now();
  const diff = now - lastFetched;
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}

/**
 * Get days until monthly reset
 */
export function getDaysUntilReset(lastCallReset: number): number {
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const nextReset = lastCallReset + oneMonth;
  const diff = nextReset - now;
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

