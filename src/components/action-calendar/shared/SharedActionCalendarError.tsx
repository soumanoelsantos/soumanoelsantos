
import React from 'react';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SharedActionCalendarErrorProps {
  error: string;
}

const SharedActionCalendarError = ({ error }: SharedActionCalendarErrorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            Tentar Novamente
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendarError;
