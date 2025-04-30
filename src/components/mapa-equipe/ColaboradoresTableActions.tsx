
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

interface ColaboradoresTableActionsProps {
  addColaborador: () => void;
  handlePreview: () => void;
}

const ColaboradoresTableActions = ({
  addColaborador,
  handlePreview
}: ColaboradoresTableActionsProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={addColaborador}
        className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Colaborador
      </Button>
      
      <Button 
        className="bg-dark-primary hover:bg-dark-primary/90 text-white"
        onClick={handlePreview}
      >
        <Save className="h-4 w-4 mr-2" />
        Salvar e Visualizar Mapa
      </Button>
    </div>
  );
};

export default ColaboradoresTableActions;
