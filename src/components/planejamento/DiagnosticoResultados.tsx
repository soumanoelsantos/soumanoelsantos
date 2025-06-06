
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { RespostaPlanejamento } from "@/types/planejamentoEstrategico";

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

  const chartData = areas.map(area => ({
    name: area.nome,
    atual: resultados[area.key as keyof DiagnosticoResultados]?.percentage || 0,
    meta: 85
  }));

  const radarData = areas.map(area => ({
    area: area.nome.split(' ')[0], // Primeira palavra para o radar
    value: resultados[area.key as keyof DiagnosticoResultados]?.percentage || 0
  }));

  const getDoresText = (areaKey: string) => {
    const doresResposta = respostas.find(r => r.perguntaId === `dores_${areaKey}`);
    return doresResposta ? String(doresResposta.resposta) : 'Não informado';
  };

  return (
    <div className="space-y-6">
      {/* Header com título */}
      <Card>
        <CardHeader className="bg-[#1d365c] text-white text-center">
          <CardTitle className="text-2xl">Diagnóstico do Negócio - Resultados</CardTitle>
          <div className="text-sm opacity-90 mt-2">
            <p>A) Avalie a existência e o nível de satisfação de cada um dos itens descritos abaixo;</p>
            <p>B) Marque as opções: "Existe e é satisfatório", "Existe, mas não é satisfatório" ou "Não existe";</p>
            <p>C) A avaliação será concluída no radar logo abaixo;</p>
          </div>
        </CardHeader>
      </Card>

      {/* Resultados por área */}
      <div className="grid gap-6">
        {areas.map((area) => {
          const resultado = resultados[area.key as keyof DiagnosticoResultados];
          const dores = getDoresText(area.key);
          
          return (
            <Card key={area.key}>
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
        })}
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de barras */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Resultado Atual vs Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="atual" fill="#3b82f6" name="Atual" />
                <Bar dataKey="meta" fill="#22c55e" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico radar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Radar de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" fontSize={10} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  fontSize={8}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela resumo */}
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
