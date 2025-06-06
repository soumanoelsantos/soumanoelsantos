
import React from "react";
import { RespostaPlanejamento } from "@/types/planejamentoEstrategico";
import DiagnosticoResultadosHeader from "./components/DiagnosticoResultadosHeader";
import DiagnosticoAreaCard from "./components/DiagnosticoAreaCard";
import DiagnosticoCharts from "./components/DiagnosticoCharts";
import DiagnosticoSummaryTable from "./components/DiagnosticoSummaryTable";

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

interface DiagnosticoResultadosProps {
  resultados: DiagnosticoResultados;
  respostas: RespostaPlanejamento[];
  onContinuar: () => void;
}

const DiagnosticoResultadosComponent: React.FC<DiagnosticoResultadosProps> = ({ 
  resultados, 
  respostas, 
  onContinuar 
}) => {
  const areas = [
    { key: 'comercial', nome: 'COMERCIAL', cor: '#22c55e' },
    { key: 'gestao', nome: 'GESTÃO', cor: '#3b82f6' },
    { key: 'rh', nome: 'PESSOAS/RH', cor: '#8b5cf6' },
    { key: 'marketing', nome: 'MARKETING', cor: '#f59e0b' },
    { key: 'financeiro', nome: 'FINANCEIRO', cor: '#ef4444' },
    { key: 'cliente', nome: 'SUCESSO DO CLIENTE', cor: '#06b6d4' },
    { key: 'sistema', nome: 'SISTEMA DE GESTÃO', cor: '#84cc16' }
  ];

  const getDoresText = (areaKey: string) => {
    const doresResposta = respostas.find(r => r.perguntaId === `dores_${areaKey}`);
    return doresResposta ? String(doresResposta.resposta) : 'Não informado';
  };

  return (
    <div className="space-y-6">
      {/* Header com título */}
      <DiagnosticoResultadosHeader />

      {/* Resultados por área */}
      <div className="grid gap-6">
        {areas.map((area) => {
          const resultado = resultados[area.key as keyof DiagnosticoResultados];
          const dores = getDoresText(area.key);
          
          return (
            <DiagnosticoAreaCard
              key={area.key}
              area={area}
              resultado={resultado}
              dores={dores}
            />
          );
        })}
      </div>

      {/* Gráficos */}
      <DiagnosticoCharts resultados={resultados} areas={areas} />

      {/* Tabela resumo */}
      <DiagnosticoSummaryTable resultados={resultados} areas={areas} />

      {/* Botão para continuar */}
      <div className="flex justify-center">
        <button
          onClick={onContinuar}
          className="bg-[#1d365c] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2a4a73] transition-colors"
        >
          Continuar para o Plano de Ação
        </button>
      </div>
    </div>
  );
};

export default DiagnosticoResultadosComponent;
