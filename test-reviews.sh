#!/bin/bash

# Test script for Outscraper Reviews
# Make sure your dev server is running first!

echo "🧪 Testing Outscraper Reviews Integration"
echo "=========================================="
echo ""

# Get CRON_SECRET from .env.local
if [ -f .env.local ]; then
    export $(cat .env.local | grep CRON_SECRET | xargs)
else
    echo "❌ .env.local file not found!"
    exit 1
fi

if [ -z "$CRON_SECRET" ]; then
    echo "❌ CRON_SECRET not found in .env.local"
    exit 1
fi

echo "✅ Found CRON_SECRET"
echo ""

# Test the refresh endpoint
echo "📡 Testing refresh endpoint..."
echo "URL: http://localhost:3000/api/reviews/refresh?secret=***"
echo ""

response=$(curl -s "http://localhost:3000/api/reviews/refresh?secret=$CRON_SECRET")

echo "Response:"
echo "$response" | python -m json.tool 2>/dev/null || echo "$response"

echo ""
echo "=========================================="
echo ""

# Check if successful
if echo "$response" | grep -q '"success": true'; then
    echo "✅ SUCCESS! Reviews fetched successfully!"
    echo ""
    echo "📊 Check public/reviews/cached-reviews.json to see the reviews"
    echo "🌐 Visit http://localhost:3000 to see them on your website"
elif echo "$response" | grep -q '"skipped": true'; then
    echo "⏭️  SKIPPED: Reviews were recently updated"
    echo "They're already fresh, no need to refetch!"
elif echo "$response" | grep -q '"error"'; then
    echo "❌ ERROR occurred. Check the response above for details."
else
    echo "⚠️  Unexpected response. Check above for details."
fi

echo ""


