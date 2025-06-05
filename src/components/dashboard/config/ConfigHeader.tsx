
import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ConfigHeaderProps {
  onSave: () => void;
  isLoading: boolean;
}

const ConfigHeader: React.FC<ConfigHeaderProps> = ({ onSave, isLoading }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Configurar Dashboard</h1>
              <p className="text-gray-600">Personalize seu dashboard empresarial</p>
            </div>
          </div>
          
          <Button 
            onClick={onSave} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ConfigHeader;
