
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
  const [isStartOpen, setIsStartOpen] = React.useState(false);
  const [isEndOpen, setIsEndOpen] = React.useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Período</label>
      <div className="flex space-x-2">
        <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal bg-white hover:bg-gray-50 border-gray-300",
                !startDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy") : "Data inicial"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                onDateChange(date, endDate);
                setIsStartOpen(false);
              }}
              initialFocus
              className="p-3 pointer-events-auto bg-white"
            />
          </PopoverContent>
        </Popover>

        <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal bg-white hover:bg-gray-50 border-gray-300",
                !endDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy") : "Data final"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                onDateChange(startDate, date);
                setIsEndOpen(false);
              }}
              initialFocus
              className="p-3 pointer-events-auto bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangeFilter;
