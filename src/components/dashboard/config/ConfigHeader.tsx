
import React from 'react';
import { ArrowLeft, Save, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ConfigHeaderProps {
  onSave: () => void;
  isLoading: boolean;
  hasUnsavedChanges?: boolean;
}

const ConfigHeader: React.FC<ConfigHeaderProps> = ({ onSave, isLoading, hasUnsavedChanges }) => {
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
              <p className="text-gray-600">
                Personalize seu dashboard empresarial
                {hasUnsavedChanges && (
                  <span className="ml-2 text-amber-600 text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Salvando automaticamente...
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={onSave} 
            disabled={isLoading}
            className="flex items-center gap-2"
            variant={hasUnsavedChanges ? "default" : "outline"}
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvando...' : hasUnsavedChanges ? 'Salvar e Finalizar' : 'Finalizar Configuração'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ConfigHeader;
