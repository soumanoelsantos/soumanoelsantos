
import { useState } from 'react';

export interface DashboardFilters {
  startDate: string;
  endDate: string;
  selectedSalespeople: string[];
}

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    startDate: '',
    endDate: '',
    selectedSalespeople: [],
  });

  const updateDateRange = (startDate: string, endDate: string) => {
    setFilters(prev => ({ ...prev, startDate, endDate }));
  };

  const updateSalespeople = (selectedSalespeople: string[]) => {
    setFilters(prev => ({ ...prev, selectedSalespeople }));
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
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
