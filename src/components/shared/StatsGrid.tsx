'use client';
import { Card, CardContent } from '@/components/ui/card';
interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  className?: string;
}
export function StatsGrid({ 
  stats, 
  columns = 3,
  className = '' 
}: StatsGridProps) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];
  return (
    <div className={`grid ${gridColsClass} gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            {stat.icon && <div className="mb-2 flex justify-center">{stat.icon}</div>}
            <p className="text-3xl font-bold text-sky mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
