
import { basicMetrics } from './basicMetrics';
import { ticketMetrics } from './ticketMetrics';
import { gapMetrics } from './gapMetrics';
import { goalMetrics } from './goalMetrics';
import { revenueMetrics } from './revenueMetrics';
import { activityMetrics } from './activityMetrics';

export const allMetricsCards = [
  ...basicMetrics,
  ...ticketMetrics,
  ...gapMetrics,
  ...goalMetrics,
  ...revenueMetrics,
  ...activityMetrics
];

// Export individual metric categories for specific use cases
export {
  basicMetrics,
  ticketMetrics,
  gapMetrics,
  goalMetrics,
  revenueMetrics,
  activityMetrics
};
