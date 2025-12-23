# CMS Documentation

## Overview

The CMS (Content Management System) allows non-technical users to update website content including prices, FAQs, testimonials, and course information. The system is organized into tabs that match the main sections of the website.

## Security System

### Monthly Rotating Passwords

The CMS uses a **monthly rotating password system** for security:

- The password automatically changes every month
- It's generated using a secure hash of a secret key + the current month/year
- The password is the same for all administrators during that month
- No password database is required - the system generates it deterministically

### Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set a strong secret:
```
CMS_SECRET=your-strong-random-secret-here
```

**Important Security Notes:**
- Keep the `CMS_SECRET` value private and secure
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Use a long, random string for production (at least 32 characters)
- If you change the secret, all passwords will change immediately

### Getting the Current Password

#### Development Mode

In development, you can get the current password by visiting:
```
http://localhost:3000/api/cms/auth
```

This endpoint is **only available in development mode** and will return:
```json
{
  "password": "ABC123DEF456",
  "note": "This endpoint only works in development mode"
}
```

#### Production Mode

In production, you have several options:

1. **Create a separate admin utility** - Add a small Node.js script that uses the same password generation logic
2. **Manual calculation** - Use the same crypto hash function with your secret + current month
3. **Share via secure channel** - One admin can get the password and share it securely with others

**Example utility script** (`get-password.js`):
```javascript
const crypto = require('crypto');

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

console.log('Current CMS Password:', generateMonthlyPassword());
```

Run with:
```bash
node get-password.js
```

## CMS Structure

The CMS is organized into four main tabs:

### 1. 🏠 Hjem (Home)
Edit content for the homepage:
- **Anmeldelser (Testimonials)**: Customer reviews displayed on the homepage
  - Name and role
  - Review text
- **FAQ**: Frequently asked questions
  - Question and answer pairs

### 2. ✈️ Tandem
Edit content for the tandem page:
- **Priser (Pricing)**: 
  - Base tandem jump price
  - Video add-on price
  - Photo add-on price
- **FAQ**: Tandem-specific questions and answers

### 3. 🎓 Kurs (Courses)
Edit content for the AFF course page:
- **Kurspriser (Course Pricing)**: Full course price
- **Inkludert i kurset (Included)**: List of what's included in the course
- **FAQ**: Course-related questions and answers

### 4. 👥 For Hoppere (For Jumpers)
Edit content for experienced jumpers:
- **Kontaktinformasjon (Contact Info)**: Email, phone, address
- **Hoppriser (Jump Prices)**: Regular jumps, jump deals, altitude add-ons
- **Registreringsavgifter (Registration Fees)**: Annual fees, day fees, etc.
- **Utstyrspriser (Equipment Pricing)**: Rental equipment prices
- **Bunkhouse Priser (Accommodation)**: Overnight stay prices
- **Bunkhouse Regler (Rules)**: Accommodation rules

## Usage Instructions

### Logging In

1. Navigate to `/cms` on your website
2. Enter the current month's password
3. Click "Logg inn"

The session will remain active until you log out or close the browser.

### Editing Content

1. Select the appropriate tab for the content you want to edit
2. Make your changes in the form fields
3. Click "Lagre endringer" (Save Changes) at the top
4. Wait for the success message: "✓ Endringer lagret!"

**Tips:**
- Changes are saved to `public/cms/content.json`
- All changes take effect immediately on the website
- Use clear, concise language for better user experience
- Always proofread before saving

### Best Practices

1. **Before Making Changes:**
   - Review the current content
   - Plan your updates
   - Have all new pricing/info ready

2. **While Editing:**
   - Save frequently
   - Check for typos and grammar
   - Be consistent with formatting (e.g., "4690 kr" not "4690kr")

3. **After Saving:**
   - Visit the actual page on the website to verify changes
   - Test on both desktop and mobile if possible

### Logging Out

Always click "Logg ut" (Log Out) when finished, especially on shared computers.

## What Can and Cannot Be Edited

### ✅ Can Edit:
- All prices and fees
- FAQ questions and answers
- Testimonial text and names
- Contact information
- Course inclusions
- Accommodation rules and prices

### ❌ Cannot Edit:
- Page layouts and design
- Images and videos
- Main headlines and section titles
- Website structure and navigation
- Static informational content

## Troubleshooting

### "Feil passord" (Wrong Password)
- Check that you're using the current month's password
- Passwords change on the 1st of each month
- Contact the administrator for the current password

### Changes Not Appearing
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Wait a few seconds and refresh the page
- Check that you clicked "Lagre endringer"

### Lost Session
- If you see the login screen again, simply log back in
- Your unsaved changes will be lost
- Save frequently to prevent data loss

## Technical Details

### File Structure
- CMS Interface: `/src/app/cms/page.tsx`
- Authentication API: `/src/app/api/cms/auth/route.ts`
- Content API: `/src/app/api/cms/content/route.ts`
- Content Storage: `/public/cms/content.json`

### Password Algorithm
```
password = SHA256(CMS_SECRET + YYYY-MM).substring(0, 12).toUpperCase()
```

### Security Features
- Monthly rotating passwords
- Token-based session authentication
- No database required
- Server-side validation
- Session storage for tokens

## Support

For technical issues or questions about the CMS, contact the web development team.

For content-related questions, refer to the club's content guidelines or contact the club administrator.




