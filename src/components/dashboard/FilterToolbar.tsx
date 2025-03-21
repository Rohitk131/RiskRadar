
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterToolbarProps {
  className?: string;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({ className }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[240px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment Channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Channels</SelectItem>
          <SelectItem value="web">Web</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="pos">POS</SelectItem>
          <SelectItem value="atm">ATM</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payment Modes</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="upi">UPI</SelectItem>
          <SelectItem value="neft">NEFT</SelectItem>
          <SelectItem value="rtgs">RTGS</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gateway Bank" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Banks</SelectItem>
          <SelectItem value="citi">CitiBank</SelectItem>
          <SelectItem value="hdfc">HDFC</SelectItem>
          <SelectItem value="sbi">SBI</SelectItem>
          <SelectItem value="icici">ICICI</SelectItem>
          <SelectItem value="axis">Axis</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="default" size="icon" className="ml-auto">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FilterToolbar;
