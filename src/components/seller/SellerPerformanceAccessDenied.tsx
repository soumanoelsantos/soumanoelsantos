
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const SellerPerformanceAccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-4">
            <User className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Acesso Negado
          </h2>
          <p className="text-gray-600">
            Token de acesso inválido ou vendedor não encontrado.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPerformanceAccessDenied;
