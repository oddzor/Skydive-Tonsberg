# Skydive Tønsberg

Modern website for Skydive Tønsberg - a skydiving club based at Tønsberg Airport (Jarlsberg), Norway.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Reviews:** Outscraper API (Google Reviews)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/skydive-tonsberg.git
cd skydive-tonsberg
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Outscraper API key to `.env.local` (optional, for Google Reviews)

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── reviews/       # Google Reviews API endpoint
│   ├── for-hoppere/       # For Jumpers page
│   ├── kontakt/           # Contact page
│   ├── kurs/              # Courses page
│   ├── layout.tsx         # Root layout with header/footer
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, About, etc.)
│   └── ui/                # shadcn/ui components
└── lib/
    └── utils.ts           # Utility functions
```

## Pages

- **Home (`/`)** - Landing page with hero, about, services, testimonials, FAQ, and CTA
- **Kurs (`/kurs`)** - Information about AFF course and training
- **For Hoppere (`/for-hoppere`)** - Information for experienced skydivers
- **Kontakt (`/kontakt`)** - Contact form and information

## Required Media Files

Add the following media files to the `public/` folder:

### Videos
- `herovideo.webm` / `herovideo.mp4` - Hero section background video
- `hero-poster.webp` - Video poster image

### Images
- `about-1.webp` to `about-4.webp` - About section images
- `service-tandem.webp` - Tandem service image
- `service-aff.webp` - AFF course image
- `service-experienced.webp` - Experienced jumpers image
- `cta-background.webp` - CTA section background
- `kurs-hero.webp` - Course page hero
- `aff-training.webp` - AFF training image
- `for-hoppere-hero.webp` - For Jumpers page hero
- `jumpers-1.webp` to `jumpers-4.webp` - Jumper photos
- `dropzone-aerial.webp` - Aerial view of dropzone
- `map-location.webp` - Location map image
- `og-image.jpg` - Open Graph image (1200x630)
- `og-kurs.jpg` - Course page OG image
- `og-for-hoppere.jpg` - For Jumpers page OG image
- `og-kontakt.jpg` - Contact page OG image

### Icons
- `icon-192.png` - PWA icon 192x192
- `icon-512.png` - PWA icon 512x512
- `apple-touch-icon.png` - Apple touch icon

## External Links

The following external services are integrated:

- **Booking:** https://bookings.burblesoft.eu/551/18
- **Calendar:** https://www.skydivetonsberg.no/hoppkalender-1
- **Shop:** https://store.burblesoft.com/?dz_id=551
- **Instagram:** https://instagram.com/skydivetonsberg
- **YouTube:** https://www.youtube.com/@skydivetnsberg9501

## Google Reviews (Outscraper)

Reviews are fetched from Google using the Outscraper API with built-in rate limiting:

- Cache duration: 7 days
- Monthly limit: 20 API calls (to stay in free tier)
- Fallback reviews provided if API is unavailable

To enable:
1. Get an API key from [Outscraper](https://outscraper.com/)
2. Add to `.env.local`: `OUTSCRAPER_API_KEY=your_key`

## SEO Features

- ✅ Semantic HTML structure
- ✅ Meta tags and Open Graph
- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Manifest for PWA (`/manifest.json`)
- ✅ Structured data ready
- ✅ Responsive images with Next.js Image
- ✅ Performance optimized

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is proprietary to Skydive Tønsberg.
