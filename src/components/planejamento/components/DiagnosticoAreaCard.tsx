
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DiagnosticoAreaCardProps {
  area: {
    key: string;
    nome: string;
    cor: string;
  };
  resultado: {
    score: number;
    total: number;
    percentage: number;
  };
  dores: string;
}

const DiagnosticoAreaCard: React.FC<DiagnosticoAreaCardProps> = ({ 
  area, 
  resultado, 
  dores 
}) => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecomendacao = (percentage: number) => {
    if (percentage >= 80) return 'Excelente! Continue aprimorando.';
    if (percentage >= 60) return 'Bom nível, mas há espaço para melhorias.';
    if (percentage >= 40) return 'Nível médio, precisa de atenção.';
    return 'Área crítica, requer ação imediata.';
  };

  return (
    <Card>
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-center text-lg" style={{ color: area.cor }}>
          {area.nome}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Dores identificadas */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Principais Dores Identificadas:</h4>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{dores}</p>
            </div>
          </div>

          {/* Score e porcentagem */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold" style={{ color: area.cor }}>
                {resultado?.percentage || 0}%
              </div>
              <div className="text-sm text-gray-600">
                {resultado?.score || 0} de {resultado?.total || 0} pontos
              </div>
            </div>
            <Badge className={getStatusColor(resultado?.percentage || 0)}>
              {getRecomendacao(resultado?.percentage || 0)}
            </Badge>
          </div>

          {/* Barra de progresso */}
          <div>
            <Progress 
              value={resultado?.percentage || 0} 
              className="h-3"
              style={{ 
                backgroundColor: '#f3f4f6',
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>Meta: 85%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticoAreaCard;
