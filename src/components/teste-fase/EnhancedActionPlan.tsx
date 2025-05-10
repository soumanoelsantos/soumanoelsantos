
import React from "react";
import { RefreshCw } from "lucide-react";
import ActionButton from "../ui/action-button";

interface EnhancedActionPlanProps {
  actionPlan: string[];
  onRegeneratePlan: () => void;
  isGenerating: boolean;
}

const EnhancedActionPlan = ({ actionPlan, onRegeneratePlan, isGenerating }: EnhancedActionPlanProps) => {
  return (
    <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-green-800 mb-4">Seu Plano de Ação Personalizado (SMART):</h3>
      <ul className="list-decimal pl-5 space-y-3">
        {actionPlan.map((action, index) => (
          <li key={index} className="text-gray-700">{action}</li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-green-200">
        <ActionButton
          onClick={onRegeneratePlan}
          variant="outline"
          size="sm"
          icon={RefreshCw}
          disabled={isGenerating}
        >
          {isGenerating ? "Gerando..." : "Regenerar Plano"}
        </ActionButton>
      </div>
    </div>
  );
};

export default EnhancedActionPlan;
