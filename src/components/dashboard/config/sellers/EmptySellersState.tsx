
import React from 'react';
import { Users } from 'lucide-react';

export const EmptySellersState: React.FC = () => {
  return (
    <div className="text-center py-8 text-gray-500">
      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>Nenhum vendedor cadastrado</p>
      <p className="text-sm">Clique em "Adicionar Vendedor" para começar</p>
    </div>
  );
};
