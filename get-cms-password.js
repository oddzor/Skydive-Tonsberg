#!/usr/bin/env node

/**
 * CMS Password Generator
 * 
 * This script generates the current month's CMS password.
 * Make sure you have the CMS_SECRET environment variable set.
 * 
 * Usage:
 *   node get-cms-password.js
 * 
 * Or with a specific secret:
 *   CMS_SECRET=your-secret node get-cms-password.js
 */

const crypto = require('crypto');

// Load from .env.local if available
try {
  const fs = require('fs');
  const path = require('path');
  const envPath = path.join(__dirname, '.env.local');
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (key.trim() === 'CMS_SECRET' && !process.env.CMS_SECRET) {
          process.env.CMS_SECRET = value;
        }
      }
    });
  }
} catch (error) {
  // Ignore errors reading .env.local
}

function generateMonthlyPassword() {
  const secret = process.env.CMS_SECRET || "default-secret-change-me";
  const now = new Date();
  const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const hash = crypto
    .createHash('sha256')
    .update(`${secret}-${monthYear}`)
    .digest('hex');
  
  return hash.substring(0, 12).toUpperCase();
}

function generatePasswordForMonth(year, month) {
  const secret = process.env.CMS_SECRET || "default-secret-change-me";
  const monthYear = `${year}-${String(month).padStart(2, '0')}`;
  
  const hash = crypto
    .createHash('sha256')
    .update(`${secret}-${monthYear}`)
    .digest('hex');
  
  return hash.substring(0, 12).toUpperCase();
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  // Show current month's password
  const now = new Date();
  const password = generateMonthlyPassword();
  
  console.log('╔═══════════════════════════════════════╗');
  console.log('║      CMS Password Generator           ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('');
  console.log(`  Month: ${now.toLocaleString('no-NO', { month: 'long', year: 'numeric' })}`);
  console.log(`  Password: ${password}`);
  console.log('');
  console.log('  This password is valid for the entire month.');
  console.log('  It will automatically change on the 1st of next month.');
  console.log('');
  
  if (!process.env.CMS_SECRET || process.env.CMS_SECRET === 'default-secret-change-me') {
    console.log('  ⚠️  WARNING: Using default secret!');
    console.log('  Please set CMS_SECRET in .env.local for production.');
    console.log('');
  }
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log('CMS Password Generator');
  console.log('');
  console.log('Usage:');
  console.log('  node get-cms-password.js              Show current month\'s password');
  console.log('  node get-cms-password.js --next       Show next month\'s password');
  console.log('  node get-cms-password.js YYYY MM      Show password for specific month');
  console.log('  node get-cms-password.js --help       Show this help message');
  console.log('');
} else if (args[0] === '--next') {
  // Show next month's password
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const password = generatePasswordForMonth(nextMonth.getFullYear(), nextMonth.getMonth() + 1);
  
  console.log('╔═══════════════════════════════════════╗');
  console.log('║      Next Month\'s CMS Password        ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('');
  console.log(`  Month: ${nextMonth.toLocaleString('no-NO', { month: 'long', year: 'numeric' })}`);
  console.log(`  Password: ${password}`);
  console.log('');
  console.log(`  This password will be active starting ${nextMonth.toLocaleDateString('no-NO')}`);
  console.log('');
} else if (args.length === 2) {
  // Show password for specific month
  const year = parseInt(args[0]);
  const month = parseInt(args[1]);
  
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    console.error('Error: Invalid year or month. Use format: YYYY MM');
    console.error('Example: node get-cms-password.js 2025 12');
    process.exit(1);
  }
  
  const password = generatePasswordForMonth(year, month);
  const date = new Date(year, month - 1, 1);
  
  console.log('╔═══════════════════════════════════════╗');
  console.log('║      CMS Password Generator           ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('');
  console.log(`  Month: ${date.toLocaleString('no-NO', { month: 'long', year: 'numeric' })}`);
  console.log(`  Password: ${password}`);
  console.log('');
} else {
  console.error('Error: Invalid arguments. Use --help for usage information.');
  process.exit(1);
}




