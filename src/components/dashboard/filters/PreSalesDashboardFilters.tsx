
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <Card className="mb-6 bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4 bg-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros do Dashboard Pré-vendas
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
          />
          <SDRSalespersonFilter
            selectedSalespeople={selectedSalespeople}
            onSelectionChange={onSalespeopleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreSalesDashboardFilters;
