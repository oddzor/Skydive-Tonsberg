# CMS Quick Setup Guide

## Initial Setup (First Time Only)

### Step 1: Create Environment File

Create a file named `.env.local` in the project root with the following content:

```bash
# CMS Configuration
CMS_SECRET=your-strong-random-secret-here-change-this-in-production
```

**Important:** 
- Replace `your-strong-random-secret-here-change-this-in-production` with a long, random string
- This should be at least 32 characters long
- Keep this value secret and secure
- Never commit this file to git (it's already in .gitignore)

### Step 2: Get Your First Password

Run the password generator script:

```bash
node get-cms-password.js
```

This will display the current month's password that you'll use to log into the CMS.

### Step 3: Access the CMS

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/cms`

3. Enter the password from Step 2

4. Start editing content!

## Getting the Password Later

### Development Mode

Option 1: Visit `http://localhost:3000/api/cms/auth` in your browser (only works in dev mode)

Option 2: Run the script:
```bash
node get-cms-password.js
```

### Production Mode

Run the password generator script on the server:
```bash
node get-cms-password.js
```

Or get next month's password in advance:
```bash
node get-cms-password.js --next
```

## Password Schedule

The password automatically changes on the 1st of each month at midnight UTC.

Examples:
- December 2024: One password for the entire month
- January 2025: New password starting January 1st
- February 2025: New password starting February 1st

## Sharing Passwords with Team Members

Since the password is the same for everyone during the month:

1. One admin generates the password using the script
2. Share it securely with team members (encrypted message, password manager, etc.)
3. Everyone uses the same password for that month
4. Password automatically rotates next month

## Security Best Practices

✅ **DO:**
- Keep the CMS_SECRET secure
- Use a long, random secret (32+ characters)
- Log out when finished editing
- Share passwords through secure channels only

❌ **DON'T:**
- Commit .env.local to git
- Share the CMS_SECRET (share passwords instead)
- Use simple or short secrets in production
- Leave your session logged in on shared computers

## Troubleshooting

### "Wrong password" error
- The password changed (new month started)
- Run `node get-cms-password.js` to get the current password

### Script doesn't work
- Make sure you have Node.js installed
- Make sure you're in the project directory
- Make sure .env.local exists with CMS_SECRET

### Changes not saving
- Check browser console for errors
- Verify you're still logged in
- Try refreshing and logging in again

## For more detailed information, see [CMS_DOCUMENTATION.md](./CMS_DOCUMENTATION.md)




