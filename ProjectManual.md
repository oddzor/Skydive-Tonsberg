I'm going to create a website for my skydiving club.

I want to create a React + NextJS project using shadcn for components and Framer Motion to make the site come alive with scrolling effects and some movement. Responsive design for ALL browsers and devices.

The page is mainly informational with some links to booking service (through burbleMe) and our jumping calendar which is a google calendar

I want to maintain professional and modern design aesthetic with a loose feel, as thats what skydiving is all about.

Some specifics that MUST be included are:

Landing Page with sections
Kurs/Course Page
For Hoppere/For Jumpers Page
Contact Page
Header
Footer
Navigation Bar
Testimonials (Google Reviews) through outscraper (with a built in logic to ensure that this is only done enough to ensure we still stay in the free tier, this should be sorted from newest to oldest)

The color scheme is flexible, but the logo colors are the same as the logo that is in the root directory.

I want to use framer to make the components come alive, especially in the landing section and when scrolling through the different sections, but not over the top.


There should be ample space for images and videos, just add placeholder names like herovideo.webm, landingsection1.webp etc for now, i will add this later.

You can use logic to create the individual sections and information, but dont add any specifics like prices, contact information etc.

Very important that the page follows ALL recommended best practices for SEO and Lighthouse Performance Metrics. I need the page to have 100 average on those metrics. 

Another very important thing is that the page must be crawlable, indexable and reviewable through google search console and analytics.


These links are mandatory:

https://www.skydivetonsberg.no/hoppkalender-1
https://bookings.burblesoft.eu/551/18
https://store.burblesoft.com/?dz_id=551
instagram.com/skydivetonsberg
https://www.youtube.com/@skydivetnsberg9501

## Content Management System (CMS)

The website includes a custom CMS that allows non-technical users to update content without code changes.

### Features:
- **Monthly rotating passwords** for security (password changes automatically every month)
- **Tab-based interface** organized by page: Home, Tandem, Kurs, For Hoppere
- **User-friendly forms** with clear labels for editing content
- **Real-time updates** - changes take effect immediately after saving

### What Can Be Edited:
- Prices and fees (tandem, courses, jump prices, equipment rentals)
- FAQ sections on all pages
- Customer testimonials
- Course inclusions and descriptions
- Contact information
- Accommodation rules and pricing

### What Cannot Be Edited:
- Page layouts and design
- Images and videos
- Main headlines and section structure
- Website navigation

### Documentation:
- `CMS_SETUP.md` - Quick setup guide for first-time configuration
- `CMS_DOCUMENTATION.md` - Comprehensive documentation for users and developers
- `get-cms-password.js` - Utility script to get current/future passwords

### Technical Details:
- Content stored in: `/public/cms/content.json`
- CMS interface: `/cms` route
- Authentication: Token-based with monthly rotating passwords
- Password generation: SHA-256 hash of `CMS_SECRET + YYYY-MM`

### Setup:
1. Create `.env.local` with `CMS_SECRET=your-secret-here`
2. Run `node get-cms-password.js` to get current password
3. Access CMS at `/cms` route
4. See `CMS_SETUP.md` for detailed instructions

