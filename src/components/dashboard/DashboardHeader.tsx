
import React from 'react';
import { ArrowLeft, Settings, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { config } = useDashboardConfig();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/membros')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {config.companyName ? `${config.companyName} - Dashboard` : 'Dashboard Empresarial'}
              </h1>
              <p className="text-gray-600">Acompanhe suas métricas em tempo real</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard/configurar')}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Configurar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
