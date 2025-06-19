
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
      return (
        <div className="w-full">
          <PreSalesCallsChart key={itemKey} data={weeklyData} />
        </div>
      );

    case 'showPreSalesSchedulingChart':
      return (
        <div className="w-full">
          <PreSalesSchedulingChart key={itemKey} data={weeklyData} />
        </div>
      );

    case 'showPreSalesNoShowChart':
      return (
        <div className="w-full">
          <PreSalesNoShowChart key={itemKey} data={weeklyData} />
        </div>
      );

    case 'showPreSalesSDRComparisonChart':
      return (
        <div className="w-full">
          <PreSalesSDRComparisonChart key={itemKey} data={sdrPerformance} />
        </div>
      );

    case 'showPreSalesSDRTable':
      return (
        <div className="w-full">
          <PreSalesSDRTable key={itemKey} data={sdrPerformance} />
        </div>
      );

    default:
      return null;
  }
};

export default PreSalesComponentRenderer;
