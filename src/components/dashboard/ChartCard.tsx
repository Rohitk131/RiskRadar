
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  toolbar?: ReactNode;
  className?: string;
  contentClassName?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  toolbar,
  className,
  contentClassName,
}) => {
  return (
    <Card className={cn('hover-scale card-shadow overflow-hidden', className)}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs mt-1">{description}</CardDescription>
          )}
        </div>
        {toolbar && <div className="ml-auto">{toolbar}</div>}
      </CardHeader>
      <CardContent className={cn('pt-4', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
