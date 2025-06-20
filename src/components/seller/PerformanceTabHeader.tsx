
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface PerformanceTabHeaderProps {
  performanceCount: number;
  onRefresh: () => void;
  onToggleForm: () => void;
}

const PerformanceTabHeader: React.FC<PerformanceTabHeaderProps> = ({
  performanceCount,
  onRefresh,
  onToggleForm
}) => {
  return (
    <div className="flex justify-between items-center">
      <h4 className="font-medium text-sm text-gray-700">
        Lançamentos de Performance ({performanceCount} registros)
      </h4>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Atualizar
        </Button>
        <Button size="sm" onClick={onToggleForm}>
          <Plus className="h-4 w-4 mr-1" />
          Novo Lançamento
        </Button>
      </div>
    </div>
  );
};

export default PerformanceTabHeader;
