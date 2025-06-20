
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface EmptyPerformanceStateProps {
  sellerId: string;
  sellerType?: string;
}

const EmptyPerformanceState: React.FC<EmptyPerformanceStateProps> = ({
  sellerId,
  sellerType
}) => {
  return (
    <div className="text-center py-8 text-gray-500">
      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>Nenhum lançamento registrado</p>
      <p className="text-sm">Clique em "Novo Lançamento" para começar</p>
      <p className="text-xs mt-2 text-gray-400">
        Vendedor ID: {sellerId} | Tipo: {sellerType || 'não definido'}
      </p>
    </div>
  );
};

export default EmptyPerformanceState;
