
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export const EmptyProductOrderState: React.FC = () => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-500">
          <Package className="h-5 w-5" />
          Ordem dos Indicadores de Produtos
        </CardTitle>
        <CardDescription>
          Configure a ordem de exibição dos indicadores de produtos no dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="font-medium mb-2">Indicadores de produtos não habilitados</p>
          <p className="text-sm">
            Habilite os indicadores de produtos primeiro para poder configurar a ordem de exibição.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
