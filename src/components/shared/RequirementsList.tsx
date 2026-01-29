'use client';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface RequirementsListProps {
  requirements: string[];
  title?: string;
  className?: string;
}
export function RequirementsList({ 
  requirements, 
  title = 'Requirements',
  className = '' 
}: RequirementsListProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{requirement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
