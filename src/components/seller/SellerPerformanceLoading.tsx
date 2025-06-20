
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const SellerPerformanceLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Carregando...
          </h3>
          <p className="text-sm text-gray-600">
            Verificando suas credenciais e carregando o formulário de performance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPerformanceLoading;
