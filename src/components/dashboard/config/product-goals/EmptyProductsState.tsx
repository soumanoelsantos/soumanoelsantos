
import React from 'react';
import { Target } from 'lucide-react';

export const EmptyProductsState: React.FC = () => {
  return (
    <div className="text-center py-8 text-gray-500">
      <Target className="mx-auto h-12 w-12 text-gray-300 mb-4" />
      <p>Nenhum produto encontrado</p>
      <p className="text-sm">
        <a href="/dashboard/configurar" className="text-blue-600 hover:underline">
          Criar produtos primeiro
        </a>
      </p>
    </div>
  );
};
