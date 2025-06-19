
import React from 'react';
import PreSalesCallsChart from '../charts/PreSalesCallsChart';
import PreSalesSchedulingChart from '../charts/PreSalesSchedulingChart';
import PreSalesNoShowChart from '../charts/PreSalesNoShowChart';
import PreSalesSDRComparisonChart from '../charts/PreSalesSDRComparisonChart';
import PreSalesSDRTable from '../tables/PreSalesSDRTable';

interface WeeklyData {
  date: string;
  calls: number;
  schedulings: number;
  noShow: number;
}

interface SDRPerformance {
  name: string;
  calls: number;
  schedulings: number;
  noShow: number;
  conversionRate: number;
}

interface PreSalesComponentRendererProps {
  itemKey: string;
  weeklyData: WeeklyData[];
  sdrPerformance: SDRPerformance[];
}

const PreSalesComponentRenderer: React.FC<PreSalesComponentRendererProps> = ({ 
  itemKey, 
  weeklyData, 
  sdrPerformance 
}) => {
  console.log('🔍 PreSalesComponentRenderer - Rendering component:', itemKey);
  
  switch (itemKey) {
    case 'showPreSalesCallsChart':
      return <PreSalesCallsChart key={itemKey} data={weeklyData} />;

    case 'showPreSalesSchedulingChart':
      return <PreSalesSchedulingChart key={itemKey} data={weeklyData} />;

    case 'showPreSalesNoShowChart':
      return <PreSalesNoShowChart key={itemKey} data={weeklyData} />;

    case 'showPreSalesSDRComparisonChart':
      return <PreSalesSDRComparisonChart key={itemKey} data={sdrPerformance} />;

    case 'showPreSalesSDRTable':
      return <PreSalesSDRTable key={itemKey} data={sdrPerformance} />;

    default:
      return null;
  }
};

export default PreSalesComponentRenderer;
