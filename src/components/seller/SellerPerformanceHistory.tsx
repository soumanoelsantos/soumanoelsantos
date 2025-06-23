
import React, { useState } from 'react';
import { Seller } from '@/types/sellers';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import EditPerformanceDialog from './EditPerformanceDialog';
import PerformanceHistoryLoading from './PerformanceHistoryLoading';
import PerformanceHistoryList from './PerformanceHistoryList';

interface SellerPerformanceHistoryProps {
  seller: Seller;
}

const SellerPerformanceHistory: React.FC<SellerPerformanceHistoryProps> = ({
  seller
}) => {
  const { performances, isLoading, deletePerformance } = useSellerPerformance(seller?.id);
  const [editingPerformance, setEditingPerformance] = useState(null);

  const handleDelete = async (performanceId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      await deletePerformance(performanceId);
    }
  };

  if (isLoading) {
    return <PerformanceHistoryLoading />;
  }

  return (
    <>
      <PerformanceHistoryList
        performances={performances}
        seller={seller}
        onEdit={setEditingPerformance}
        onDelete={handleDelete}
      />

      {editingPerformance && (
        <EditPerformanceDialog
          performance={editingPerformance}
          seller={seller}
          open={true}
          onClose={() => setEditingPerformance(null)}
        />
      )}
    </>
  );
};

export default SellerPerformanceHistory;
