
import React from 'react';
import PreSalesCallsChart from '../charts/PreSalesCallsChart';
import PreSalesSchedulingChart from '../charts/PreSalesSchedulingChart';
import PreSalesNoShowChart from '../charts/PreSalesNoShowChart';
import PreSalesSDRComparisonChart from '../charts/PreSalesSDRComparisonChart';
import PreSalesSDRTable from '../tables/PreSalesSDRTable';

interface PreSalesComponentRendererProps {
  itemKey: string;
  weeklyData: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
  sdrPerformance: Array<{
    name: string;
    calls: number;
    schedulings: number;
    noShow: number;
    conversionRate: number;
  }>;
  isPublicView?: boolean;
  sharedUserId?: string;
}

const PreSalesComponentRenderer: React.FC<PreSalesComponentRendererProps> = ({
  itemKey,
  weeklyData,
  sdrPerformance,
  isPublicView = false,
  sharedUserId
}) => {
  console.log(`🎯 PreSalesComponentRenderer - Rendering: ${itemKey}`, { isPublicView, sharedUserId });

  switch (itemKey) {
    case 'showPreSalesCallsChart':
      return <PreSalesCallsChart data={weeklyData} />;
    case 'showPreSalesSchedulingChart':
      return <PreSalesSchedulingChart data={weeklyData} />;
    case 'showPreSalesNoShowChart':
      return <PreSalesNoShowChart data={weeklyData} />;
    case 'showPreSalesSDRComparisonChart':
      return <PreSalesSDRComparisonChart data={sdrPerformance} />;
    case 'showPreSalesSDRTable':
      return <PreSalesSDRTable data={sdrPerformance} />;
    default:
      console.warn(`⚠️ PreSalesComponentRenderer - Unknown component: ${itemKey}`);
      return null;
  }
};

export default PreSalesComponentRenderer;
