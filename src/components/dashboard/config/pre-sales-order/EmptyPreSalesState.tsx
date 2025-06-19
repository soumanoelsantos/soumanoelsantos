
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ArrowUpDown } from 'lucide-react';

export const EmptyPreSalesState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Ordem dos Indicadores de Pré-vendas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">Nenhum indicador de pré-vendas habilitado</p>
          <p className="text-sm mt-1">
            Habilite alguns indicadores de pré-vendas para poder reordená-los
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
