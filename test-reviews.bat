@echo off
REM Test script for Outscraper Reviews (Windows)
REM Make sure your dev server is running first!

echo.
echo 🧪 Testing Outscraper Reviews Integration
echo ==========================================
echo.

REM Read CRON_SECRET from .env.local
if not exist .env.local (
    echo ❌ .env.local file not found!
    exit /b 1
)

for /f "tokens=2 delims==" %%a in ('findstr "CRON_SECRET" .env.local') do set CRON_SECRET=%%a

if "%CRON_SECRET%"=="" (
    echo ❌ CRON_SECRET not found in .env.local
    exit /b 1
)

echo ✅ Found CRON_SECRET
echo.

REM Test the refresh endpoint
echo 📡 Testing refresh endpoint...
echo URL: http://localhost:3000/api/reviews/refresh?secret=***
echo.

curl -s "http://localhost:3000/api/reviews/refresh?secret=%CRON_SECRET%"

echo.
echo ==========================================
echo.
echo ✅ If you see "success": true above, it worked!
echo 📊 Check public\reviews\cached-reviews.json to see the reviews
echo 🌐 Visit http://localhost:3000 to see them on your website
echo.


