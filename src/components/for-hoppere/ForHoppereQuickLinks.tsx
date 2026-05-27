'use client';
import { useForHoppereData } from '@/hooks/useForHoppereData';
export function ForHoppereQuickLinks() {
  const { quickLinks } = useForHoppereData();
  return (
    <section className="py-8 bg-muted/50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground bg-background rounded-full border hover:border-sky transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
