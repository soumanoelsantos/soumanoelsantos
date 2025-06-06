
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressSectionProps {
  acoesCompletas: number;
  totalAcoes: number;
  progresso: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  acoesCompletas, 
  totalAcoes, 
  progresso 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Progresso do Plano de Ação</span>
          <span className="text-sm text-gray-500">
            {acoesCompletas} de {totalAcoes} ações concluídas
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progresso} className="mb-4" />
        <p className="text-center text-gray-600">
          {progresso.toFixed(1)}% concluído
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
