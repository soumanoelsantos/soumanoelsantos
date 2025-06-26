
import React from 'react';
import PreSalesCallsChart from '../charts/PreSalesCallsChart';
import PreSalesSchedulingChart from '../charts/PreSalesSchedulingChart';
import PreSalesNoShowChart from '../charts/PreSalesNoShowChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

// Simple table component for SDR data
const SDRTable = ({ data }: { data: Array<{ name: string; calls: number; schedulings: number; noShow: number; conversionRate: number }> }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Performance dos SDRs</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ligações</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Agendamentos</th>
              <th className="border border-gray-300 px-4 py-2 text-left">No Show</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Taxa Conversão</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                <td className="border border-gray-300 px-4 py-2">{row.calls}</td>
                <td className="border border-gray-300 px-4 py-2">{row.schedulings}</td>
                <td className="border border-gray-300 px-4 py-2">{row.noShow}</td>
                <td className="border border-gray-300 px-4 py-2">{row.conversionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

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
    case 'showPreSalesSDRTable':
      return <SDRTable data={sdrPerformance} />;
    // Removed showPreSalesSDRComparisonChart case
    default:
      console.warn(`⚠️ PreSalesComponentRenderer - Unknown component: ${itemKey}`);
      return null;
  }
};

export default PreSalesComponentRenderer;
