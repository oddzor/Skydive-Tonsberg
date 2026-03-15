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

export function readReviewsFromFile(): ReviewsData {
  try {
    const fileContent = fs.readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading reviews file:', error);
    return {
      reviews: [],
      lastFetched: 0,
      monthlyApiCalls: 0,
      lastCallReset: Date.now(),
      source: 'fallback',
    };
  }
}

export function writeReviewsToFile(data: ReviewsData): void {
  try {
    const dir = path.dirname(REVIEWS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Reviews successfully written to file');
  } catch (error) {
    console.error('Error writing reviews file:', error);
    throw error;
  }
}

export function shouldResetMonthlyCounter(lastReset: number): boolean {
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  return now - lastReset > oneMonth;
}

export function canMakeApiCall(monthlyApiCalls: number, lastCallReset: number): boolean {
  const MAX_MONTHLY_CALLS = 480;
  if (shouldResetMonthlyCounter(lastCallReset)) {
    return true;
  }
  return monthlyApiCalls < MAX_MONTHLY_CALLS;
}

export function isCacheValid(lastFetched: number): boolean {
  if (!lastFetched || lastFetched === 0) return false;
  const now = Date.now();
  const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000;
  return now - lastFetched < CACHE_DURATION;
}

export function getDaysSinceLastFetch(lastFetched: number): number {
  if (!lastFetched || lastFetched === 0) return Infinity;
  const now = Date.now();
  const diff = now - lastFetched;
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}
