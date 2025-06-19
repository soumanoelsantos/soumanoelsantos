
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PreSalesMetricsLoading: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PreSalesMetricsLoading;
