
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { SellerDailyPerformance } from '@/types/sellers';

interface PerformanceHistoryActionsProps {
  performance: SellerDailyPerformance;
  onEdit: (performance: SellerDailyPerformance) => void;
  onDelete: (performanceId: string) => void;
}

const PerformanceHistoryActions: React.FC<PerformanceHistoryActionsProps> = ({
  performance,
  onEdit,
  onDelete
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(performance);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(performance.id);
  };

  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleEdit}
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Editar
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        Deletar
      </Button>
    </div>
  );
};

export default PerformanceHistoryActions;
