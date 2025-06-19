
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PreSalesMetricsErrorProps {
  error: string;
}

const PreSalesMetricsError: React.FC<PreSalesMetricsErrorProps> = ({ error }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Erro ao carregar dados de pré-vendas: {error}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreSalesMetricsError;
