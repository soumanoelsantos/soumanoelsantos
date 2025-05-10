
import React from "react";
import { FileEdit } from "lucide-react";
import ActionButton from "../ui/action-button";

interface ActionPlanGeneratorProps {
  onGeneratePlan: () => void;
  isGenerating: boolean;
}

const ActionPlanGenerator = ({ onGeneratePlan, isGenerating }: ActionPlanGeneratorProps) => {
  return (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
      <h3 className="font-medium text-amber-800 flex items-center gap-2 mb-2">
        <FileEdit size={18} />
        Plano de Ação Personalizado
      </h3>
      <p className="text-amber-700 mb-3">
        Gere um plano de ação detalhado e personalizado com base nos seus resultados e seguindo a metodologia SMART.
      </p>
      <ActionButton 
        onClick={onGeneratePlan}
        disabled={isGenerating}
        variant="primary"
      >
        {isGenerating ? "Gerando..." : "Criar Plano de Ação Personalizado"}
      </ActionButton>
    </div>
  );
};

export default ActionPlanGenerator;
