
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { SellerDailyPerformance, Seller } from '@/types/sellers';
import PerformanceHistoryCard from './PerformanceHistoryCard';

interface PerformanceHistoryListProps {
  performances: SellerDailyPerformance[];
  seller: Seller;
  onEdit: (performance: SellerDailyPerformance) => void;
  onDelete: (performanceId: string) => void;
}

const PerformanceHistoryList: React.FC<PerformanceHistoryListProps> = ({
  performances,
  seller,
  onEdit,
  onDelete
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (performances.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma performance registrada ainda</p>
            <p className="text-sm">Registre sua primeira performance usando o formulário acima</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Histórico de Performance ({performances.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performances.map((performance) => (
            <PerformanceHistoryCard
              key={performance.id}
              performance={performance}
              seller={seller}
              isExpanded={expandedItems.has(performance.id)}
              onToggleExpanded={() => toggleExpanded(performance.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceHistoryList;
