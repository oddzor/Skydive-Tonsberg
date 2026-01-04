#!/usr/bin/env node

/**
 * Direct test of Outscraper API
 * This bypasses Next.js to isolate any framework issues
 * 
 * Run: node test-outscraper-direct.js
 */

const fs = require('fs');
const path = require('path');

// Load .env.local manually
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found at:', envPath);
    return {};
  }
  
  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
      env[key] = value;
    }
  });
  
  return env;
}

async function testOutscraper() {
  console.log('🧪 Direct Outscraper API Test');
  console.log('================================\n');
  
  const env = loadEnv();
  const apiKey = env.OUTSCRAPER_API_KEY;
  
  console.log('📋 Environment Check:');
  console.log('  ✓ .env.local found');
  console.log('  ✓ API Key exists:', !!apiKey);
  console.log('  ✓ API Key length:', apiKey?.length || 0);
  console.log('  ✓ API Key preview:', apiKey?.substring(0, 15) + '...\n');
  
  if (!apiKey) {
    console.error('❌ OUTSCRAPER_API_KEY not found in .env.local');
    console.log('\nMake sure your .env.local looks like:');
    console.log('OUTSCRAPER_API_KEY=your_key_here\n');
    process.exit(1);
  }
  
  // Test with small query first
  const query = 'Skydive Tønsberg';
  const reviewsLimit = 5;
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.app.outscraper.com/maps/reviews-v3?query=${encodedQuery}&reviewsLimit=${reviewsLimit}&sort=newest`;
  
  console.log('📡 API Request:');
  console.log('  URL:', url);
  console.log('  Query:', query);
  console.log('  Limit:', reviewsLimit);
  console.log('  Headers: X-API-KEY: ' + apiKey.substring(0, 10) + '...\n');
  
  console.log('⏳ Fetching... (this may take 10-30 seconds)\n');
  
  try {
    const startTime = Date.now();
    
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': apiKey,
      },
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('📊 Response:');
    console.log('  Status:', response.status);
    console.log('  Status Text:', response.statusText);
    console.log('  Duration:', duration + 's');
    console.log('  Content-Type:', response.headers.get('content-type'));
    console.log();
    
    if (!response.ok) {
      console.error('❌ API Error!');
      const errorText = await response.text();
      console.error('Error:', errorText);
      process.exit(1);
    }
    
    const data = await response.json();
    
    console.log('📦 Response Structure:');
    console.log('  Status:', data.status);
    console.log('  Has data:', !!data.data);
    console.log('  Data length:', data.data?.length || 0);
    
    if (data.data && data.data[0]) {
      const place = data.data[0];
      console.log('\n🏢 Place Info:');
      console.log('  Name:', place.name);
      console.log('  Has reviews:', !!place.reviews_data);
      console.log('  Reviews count:', place.reviews_data?.length || 0);
      
      if (place.reviews_data && place.reviews_data.length > 0) {
        console.log('\n✅ SUCCESS! Found', place.reviews_data.length, 'reviews\n');
        
        console.log('📝 Sample Review:');
        const sample = place.reviews_data[0];
        console.log('  Author:', sample.author_title);
        console.log('  Rating:', sample.review_rating);
        console.log('  Text:', sample.review_text?.substring(0, 100) + '...');
        console.log('  Date:', sample.review_datetime_utc);
        
        console.log('\n🎉 Your Outscraper API is working correctly!');
        console.log('The issue is likely in the Next.js integration.\n');
      } else {
        console.log('\n⚠️  No reviews found in response');
        console.log('This might mean:');
        console.log('  - Business has no reviews');
        console.log('  - Query doesn\'t match the business');
        console.log('  - Try a different query\n');
      }
    } else {
      console.log('\n⚠️  Unexpected response format');
      console.log('Full response:', JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error(error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the test
testOutscraper().catch(console.error);


