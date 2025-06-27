
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import DashboardShareDialog from './DashboardShareDialog';

interface DashboardHeaderProps {
  companyName?: string;
  isPublicView?: boolean;
  onShare?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  companyName, 
  isPublicView = false, 
  onShare 
}) => {
  const navigate = useNavigate();
  const { config } = useDashboardConfig();
  
  const displayName = companyName || config.companyName || 'Dashboard Empresarial';

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
            <p className="text-gray-600 mt-1">
              {isPublicView ? 'Visualização Compartilhada' : 'Painel de controle gerencial'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isPublicView && (
              <>
                <DashboardShareDialog />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard-config')}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configurar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
