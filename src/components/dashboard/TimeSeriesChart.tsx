
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps,
  Legend
} from 'recharts';
import { Card } from '@/components/ui/card';

interface TimeSeriesChartProps {
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

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, title, className }) => {
  return (
    <div className={className}>
      {title && <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, r: 3, fill: 'white' }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 1, fill: 'hsl(var(--primary))' }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="reported" 
              stroke="hsl(var(--fraud))" 
              strokeWidth={2}
              dot={{ stroke: 'hsl(var(--fraud))', strokeWidth: 1, r: 3, fill: 'white' }}
              activeDot={{ r: 6, stroke: 'hsl(var(--fraud))', strokeWidth: 1, fill: 'hsl(var(--fraud))' }}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
