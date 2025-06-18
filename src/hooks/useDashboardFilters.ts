
import { useState, useEffect } from 'react';

interface DashboardFilters {
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedSalespeople: string[];
}

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    startDate: undefined,
    endDate: undefined,
    selectedSalespeople: ['all']
  });

  const updateDateRange = (startDate: Date | undefined, endDate: Date | undefined) => {
    console.log('🔵 useDashboardFilters - Updating date range:', { startDate, endDate });
    setFilters(prev => ({
      ...prev,
      startDate,
      endDate
    }));
  };

  const updateSalespeople = (selectedSalespeople: string[]) => {
    console.log('🔵 useDashboardFilters - Updating salespeople:', selectedSalespeople);
    setFilters(prev => ({
      ...prev,
      selectedSalespeople
    }));
  };

  const resetFilters = () => {
    console.log('🔵 useDashboardFilters - Resetting filters');
    setFilters({
      startDate: undefined,
      endDate: undefined,
      selectedSalespeople: ['all']
    });
  };

  // Log filter changes for debugging
  useEffect(() => {
    console.log('🔵 useDashboardFilters - Current filters:', filters);
  }, [filters]);

  return {
    filters,
    updateDateRange,
    updateSalespeople,
    resetFilters
  };
};
