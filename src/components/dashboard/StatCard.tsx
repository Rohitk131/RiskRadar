
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: number;
  variant?: 'default' | 'fraud' | 'safe' | 'warning';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'fraud':
        return 'border-red-200 dark:border-red-900/30';
      case 'safe':
        return 'border-green-200 dark:border-green-900/30';
      case 'warning':
        return 'border-amber-200 dark:border-amber-900/30';
      default:
        return 'border-border';
    }
  };

  const getTrendBadgeClasses = () => {
    if (!trend) return '';
    
    return trend > 0 
      ? 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      : 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
  };

  const getIconWrapperClasses = () => {
    switch (variant) {
      case 'fraud':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'safe':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <Card className={cn('overflow-hidden hover-scale card-shadow', getVariantClasses(), className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && (
          <div className={cn("p-2 rounded-full", getIconWrapperClasses())}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display tracking-tight">{value}</div>
        <div className="flex items-center mt-2 justify-between">
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend !== undefined && (
            <div className={cn("text-xs font-medium px-2 py-0.5 rounded", getTrendBadgeClasses())}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
