
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

interface DiagnosticoSummaryTableProps {
  resultados: DiagnosticoResultados;
  areas: Array<{
    key: string;
    nome: string;
    cor: string;
  }>;
}

const DiagnosticoSummaryTable: React.FC<DiagnosticoSummaryTableProps> = ({ 
  resultados, 
  areas 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Resumo de Pontuação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Área</th>
                <th className="border p-2 text-center">Atual</th>
                <th className="border p-2 text-center">Meta</th>
                <th className="border p-2 text-center">Prazo</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => {
                const resultado = resultados[area.key as keyof DiagnosticoResultados];
                return (
                  <tr key={area.key}>
                    <td className="border p-2 font-medium">{area.nome}</td>
                    <td className="border p-2 text-center">{resultado?.percentage || 0}%</td>
                    <td className="border p-2 text-center">85%</td>
                    <td className="border p-2 text-center">6 meses</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticoSummaryTable;
