
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock } from 'lucide-react';

const SellerPerformanceFooter: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Dados protegidos</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Salvamento automático</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Seus dados são salvos de forma segura e podem ser visualizados pelo administrador do sistema.
        </p>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceFooter;
