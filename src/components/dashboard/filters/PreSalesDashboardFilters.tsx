
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';
import SDRSalespersonFilter from './SDRSalespersonFilter';

interface PreSalesDashboardFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedSalespeople: string[];
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onSalespeopleChange: (salespeople: string[]) => void;
  onReset: () => void;
}

const PreSalesDashboardFilters: React.FC<PreSalesDashboardFiltersProps> = ({
  startDate,
  endDate,
  selectedSalespeople,
  onDateChange,
  onSalespeopleChange,
  onReset
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 items-end">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
          />
          
          <SDRSalespersonFilter
            selectedSalespeople={selectedSalespeople}
            onSelectionChange={onSalespeopleChange}
          />
          
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreSalesDashboardFilters;
