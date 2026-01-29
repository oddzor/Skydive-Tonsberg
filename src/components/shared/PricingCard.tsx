'use client';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface PricingCardProps {
  title: string;
  price: string | number;
  description?: string;
  features?: string[];
  popular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onCTA?: () => void;
  className?: string;
  priceUnit?: string;
}
export function PricingCard({ 
  title,
  price,
  description,
  features,
  popular = false,
  ctaText,
  ctaLink,
  onCTA,
  className = '',
  priceUnit = 'kr'
}: PricingCardProps) {
  const cardClasses = cn(
    'relative',
    popular && 'border-2 border-sky shadow-xl',
    className
  );
  return (
    <Card className={cardClasses}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-sky text-white px-3 py-1 rounded-full text-xs font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-sky">
              {typeof price === 'number' ? price.toLocaleString('nb-NO') : price}
            </span>
            <span className="text-muted-foreground">{priceUnit}</span>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {(ctaText || onCTA) && (
          <div className="pt-4">
            {ctaLink ? (
              <Button asChild className="w-full bg-gradient-brand hover:opacity-90">
                <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                  {ctaText}
                </a>
              </Button>
            ) : (
              <Button 
                onClick={onCTA} 
                className="w-full bg-gradient-brand hover:opacity-90"
              >
                {ctaText}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
