
import React from 'react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { ItemRenderer } from '../renderers/ItemRenderer';

interface BasicMetricsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const BasicMetricsSection: React.FC<BasicMetricsSectionProps> = ({ config, orderedItems }) => {
  // Seção removida pois não há mais indicadores básicos
  return null;
};

export default BasicMetricsSection;
