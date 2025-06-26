
import { useState } from 'react';

export interface DashboardFilters {
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedSalespeople: string[];
}

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    startDate: undefined,
    endDate: undefined,
    selectedSalespeople: [],
  });

  const updateDateRange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setFilters(prev => ({ ...prev, startDate, endDate }));
  };

  const updateSalespeople = (selectedSalespeople: string[]) => {
    setFilters(prev => ({ ...prev, selectedSalespeople }));
  };

  const resetFilters = () => {
    setFilters({
      startDate: undefined,
      endDate: undefined,
      selectedSalespeople: [],
    });
  };

  return {
    filters,
    updateDateRange,
    updateSalespeople,
    resetFilters,
  };
};
