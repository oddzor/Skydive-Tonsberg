import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration scripts
      "script-src 'self' 'unsafe-inline'",
      // Tailwind/framer-motion use inline styles
      "style-src 'self' 'unsafe-inline'",
      // Images: Sanity CDN, YouTube thumbnails, Facebook CDN, flag icons
      "img-src 'self' data: blob: https://cdn.sanity.io https://img.youtube.com https://*.fbcdn.net https://flagcdn.com",
      // Fonts: Next.js serves fonts from self
      "font-src 'self' data:",
      // API connections: Sanity, Burble, YR weather
      "connect-src 'self' https://*.sanity.io https://api.sanity.io https://*.burblesoft.eu https://*.burblesoft.com https://api.met.no https://www.yr.no https://graph.facebook.com",
      // Videos served from self
      "media-src 'self' blob:",
      // Embeds: YouTube, YR weather widget
      "frame-src 'self' https://www.youtube.com https://youtube.com https://www.yr.no",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
  },
  async rewrites() {
    return [
      { source: '/en/home',        destination: '/en/hjem' },
      { source: '/en/course',      destination: '/en/kurs' },
      { source: '/en/for-jumpers', destination: '/en/for-hoppere' },
      { source: '/en/contact',     destination: '/en/kontakt' },
      { source: '/en/jumpcalendar',destination: '/en/hoppkalender' },
      { source: '/en/privacy',     destination: '/en/personvern' },
    ];
  },
  async redirects() {
    const oldRoutes = [
      { src: 'tandem',       dest: 'tandem' },
      { src: 'kurs',         dest: 'kurs' },
      { src: 'for-hoppere',  dest: 'for-hoppere' },
      { src: 'kontakt',      dest: 'kontakt' },
      { src: 'faq',          dest: 'faq' },
      { src: 'hoppkalender', dest: 'hoppkalender' },
      { src: 'personvern',   dest: 'personvern' },
    ];
    return [
      { source: '/', destination: '/no/hjem', permanent: true },
      { source: '/no', destination: '/no/hjem', permanent: true },
      { source: '/en', destination: '/en/home', permanent: true },
      ...oldRoutes.map(({ src, dest }) => ({
        source: `/${src}`,
        destination: `/no/${dest}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/((?!admin).*)",
        headers: securityHeaders,
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.webp|.*\\.jpg|.*\\.jpeg|.*\\.png|.*\\.svg|.*\\.ico|.*\\.webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
