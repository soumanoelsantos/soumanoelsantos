
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DiagnosticResultsChart from '@/components/DiagnosticResultsChart';

interface ResultsCardProps {
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
}

const ResultsCard = ({ results }: ResultsCardProps) => {
  // Calculate the overall percentage
  const calculateOverallPercentage = () => {
    const totalScore = 
      results.processos.score + 
      results.resultados.score + 
      results.sistemaGestao.score + 
      results.pessoas.score;
    
    const totalPossible = 
      results.processos.total + 
      results.resultados.total + 
      results.sistemaGestao.total + 
      results.pessoas.total;
    
    return Math.round((totalScore / totalPossible) * 100);
  };

  const overallPercentage = calculateOverallPercentage();

  // Prepare chart data
  const chartData = [
    { name: 'Processos', value: results.processos.percentage },
    { name: 'Resultados', value: results.resultados.percentage },
    { name: 'Sistema de Gestão', value: results.sistemaGestao.percentage },
    { name: 'Pessoas', value: results.pessoas.percentage },
  ];

  return (
    <Card className="bg-white border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] card-header">
        <CardTitle className="text-xl text-center text-white">Resultados do Diagnóstico</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-700 mb-2">Maturidade geral do negócio:</p>
          <h3 className="text-3xl font-bold text-gray-900">{overallPercentage}%</h3>
        </div>
        
        <div className="chart-container">
          <DiagnosticResultsChart data={chartData} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Processos: {results.processos.percentage}%</h3>
            <p className="text-sm text-gray-600">
              {results.processos.score} de {results.processos.total} pontos
            </p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Resultados: {results.resultados.percentage}%</h3>
            <p className="text-sm text-gray-600">
              {results.resultados.score} de {results.resultados.total} pontos
            </p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Sistema de Gestão: {results.sistemaGestao.percentage}%</h3>
            <p className="text-sm text-gray-600">
              {results.sistemaGestao.score} de {results.sistemaGestao.total} pontos
            </p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Pessoas: {results.pessoas.percentage}%</h3>
            <p className="text-sm text-gray-600">
              {results.pessoas.score} de {results.pessoas.total} pontos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;

