
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Card } from '@/components/ui/card';

interface MetricsChartProps {
  data: {
    name: string;
    predicted: number;
    reported: number;
  }[];
  title?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-background/95 backdrop-blur-md border shadow-lg p-3">
        <p className="font-medium text-sm">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-xs flex items-center">
            <span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded-sm"></span>
            <span>Predicted Fraud: </span>
            <span className="ml-1 font-medium">{payload[0]?.value}</span>
          </p>
          <p className="text-xs flex items-center">
            <span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded-sm"></span>
            <span>Reported Fraud: </span>
            <span className="ml-1 font-medium">{payload[1]?.value}</span>
          </p>
        </div>
      </Card>
    );
  }
  return null;
};

const MetricsChart: React.FC<MetricsChartProps> = ({ data, title, className }) => {
  return (
    <div className={className}>
      {title && <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="predicted" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500} 
              animationEasing="ease-in-out"
              className="hover:opacity-90 transition-opacity"
            />
            <Bar 
              dataKey="reported" 
              fill="hsl(var(--fraud))" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationEasing="ease-in-out"
              animationBegin={300}
              className="hover:opacity-90 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;
