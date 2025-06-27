
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => void;
  isLoading?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isLoading = false }) => {
  return (
    <div className="flex justify-end pt-6 border-t border-gray-200">
      <Button 
        onClick={onSave}
        disabled={isLoading}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {isLoading ? 'Salvando...' : 'Salvar Configurações'}
      </Button>
    </div>
  );
};

export default SaveButton;
