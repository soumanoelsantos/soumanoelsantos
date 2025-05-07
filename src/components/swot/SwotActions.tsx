
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";

interface SwotActionsProps {
  onSave: () => void;
  onReset: () => void;
}

const SwotActions: React.FC<SwotActionsProps> = ({ onSave, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
      <Button 
        variant="outline" 
        onClick={onReset}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reiniciar análise
      </Button>
      <Button 
        onClick={onSave}
        className="bg-dark-primary hover:bg-dark-primary/90 text-white flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        Salvar análise
      </Button>
    </div>
  );
};

export default SwotActions;
