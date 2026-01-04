import { NextResponse } from "next/server";

/**
 * Test endpoint to verify environment variables are loaded
 * Access at: http://localhost:3000/api/test-env
 */
export async function GET() {
  const hasOutscraperKey = !!process.env.OUTSCRAPER_API_KEY;
  const hasCronSecret = !!process.env.CRON_SECRET;
  
  return NextResponse.json({
    outscraper_api_key_exists: hasOutscraperKey,
    outscraper_api_key_length: process.env.OUTSCRAPER_API_KEY?.length || 0,
    outscraper_api_key_preview: process.env.OUTSCRAPER_API_KEY?.substring(0, 10) + '...',
    cron_secret_exists: hasCronSecret,
    env_keys_found: Object.keys(process.env).filter(k => 
      k.includes('OUTSCRAPER') || k.includes('CRON')
    ),
    node_env: process.env.NODE_ENV,
  });
}


