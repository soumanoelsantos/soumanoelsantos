
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// This component is now only used in the SWOT analysis page
// It's been removed from the diagnostic test page as requested

interface ActionPlanCardProps {
  actionPlan: { [key: string]: string[] } | null;
  isLoading: boolean;
  onGeneratePlan?: () => void;
  onRegeneratePlan?: () => void;
}

const ActionPlanCard = ({
  actionPlan,
  isLoading,
  onGeneratePlan,
  onRegeneratePlan,
}: ActionPlanCardProps) => {
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Plano de Ação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-600 animate-pulse">
              Gerando plano de ação personalizado...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!actionPlan) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Plano de Ação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="mb-4">
              Gere um plano de ação personalizado para melhorar seu desempenho
              nas áreas avaliadas.
            </p>
            {onGeneratePlan && (
              <Button onClick={onGeneratePlan} className="bg-[#1d365c]">
                Gerar Plano de Ação
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Plano de Ação</CardTitle>
        <div className="flex gap-2">
          {onRegeneratePlan && (
            <Button variant="outline" size="sm" onClick={onRegeneratePlan}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerar
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(actionPlan).map(([area, actions], index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-2 capitalize">{area}</h3>
              <ul className="space-y-2 pl-2">
                {actions.map((action, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 p-3 rounded-md border border-gray-200"
                  >
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPlanCard;
