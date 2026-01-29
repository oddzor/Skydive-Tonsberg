'use client';
interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  centered?: boolean;
}
export function SectionHeader({ 
  badge, 
  title, 
  highlight, 
  description,
  className = '',
  centered = true
}: SectionHeaderProps) {
  const alignmentClass = centered ? 'text-center' : '';
  const marginClass = centered ? 'mx-auto' : '';
  return (
    <div className={`max-w-3xl mb-16 ${alignmentClass} ${marginClass} ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 text-sm font-medium text-sky bg-sky/10 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
        {title}
        {highlight && <span className="text-gradient"> {highlight}</span>}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
