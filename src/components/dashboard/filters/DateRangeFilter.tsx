
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onDateChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Período</label>
      <div className="flex space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy") : "Data inicial"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                onDateChange(date, endDate);
                setIsOpen(false);
              }}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy") : "Data final"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={(date) => onDateChange(startDate, date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangeFilter;
