
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AcaoComercialSemanal } from "@/types/planejamentoEstrategico";

interface CommercialActionsSectionProps {
  acoesComerciais?: AcaoComercialSemanal[];
}

const CommercialActionsSection: React.FC<CommercialActionsSectionProps> = ({ acoesComerciais }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Ações Comerciais Semanais (SMART)</h3>
      {acoesComerciais?.map((acao) => (
        <Card key={acao.id} className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{acao.acao}</h4>
                <Badge variant="outline">Semana {acao.semana}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Meta:</span> {acao.meta}
                </div>
                <div>
                  <span className="font-medium text-blue-700">Prazo:</span> {acao.prazo}
                </div>
                <div>
                  <span className="font-medium text-purple-700">Responsável:</span> {acao.responsavel}
                </div>
                <div>
                  <span className="font-medium text-orange-700">Métricas:</span> {acao.metricas}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommercialActionsSection;
