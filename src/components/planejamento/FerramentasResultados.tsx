
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { PlanejamentoEstrategicoData } from "@/types/planejamentoEstrategico";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FerramentasResultadosProps {
  dados: PlanejamentoEstrategicoData;
  onVoltar?: () => void;
}

const FerramentasResultados: React.FC<FerramentasResultadosProps> = ({ dados, onVoltar }) => {
  const diagnostico = dados.ferramentasGeradas.diagnostico;

  if (!diagnostico) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Diagnóstico não disponível</p>
        </CardContent>
      </Card>
    );
  }

  const areas = [
    { key: 'comercial', nome: 'ÁREA COMERCIAL', cor: '#22c55e', icon: TrendingUp },
    { key: 'gestao', nome: 'GESTÃO EMPRESARIAL', cor: '#3b82f6', icon: BarChart3 },
    { key: 'rh', nome: 'RECURSOS HUMANOS', cor: '#8b5cf6', icon: CheckCircle },
    { key: 'marketing', nome: 'MARKETING', cor: '#f59e0b', icon: TrendingUp },
    { key: 'financeiro', nome: 'FINANCEIRO', cor: '#ef4444', icon: TrendingDown },
    { key: 'cliente', nome: 'ATENDIMENTO AO CLIENTE', cor: '#06b6d4', icon: CheckCircle },
    { key: 'sistema', nome: 'SISTEMA DE GESTÃO', cor: '#84cc16', icon: BarChart3 }
  ];

  const getStatusArea = (percentage: number) => {
    if (percentage >= 80) return { status: 'Excelente', cor: 'bg-green-500', texto: 'text-green-700' };
    if (percentage >= 60) return { status: 'Bom', cor: 'bg-blue-500', texto: 'text-blue-700' };
    if (percentage >= 40) return { status: 'Regular', cor: 'bg-yellow-500', texto: 'text-yellow-700' };
    return { status: 'Crítico', cor: 'bg-red-500', texto: 'text-red-700' };
  };

  const dadosGrafico = areas.map(area => {
    const resultado = diagnostico[area.key as keyof typeof diagnostico];
    return {
      name: area.nome,
      percentage: resultado?.percentage || 0,
      score: resultado?.score || 0,
      total: resultado?.total || 0
    };
  });

  const dadosPizza = areas.map((area, index) => {
    const resultado = diagnostico[area.key as keyof typeof diagnostico];
    return {
      name: area.nome,
      value: resultado?.percentage || 0,
      color: area.cor
    };
  });

  const COLORS = areas.map(area => area.cor);

  const mediaGeral = dadosGrafico.reduce((acc, item) => acc + item.percentage, 0) / dadosGrafico.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">Diagnóstico Empresarial Completo</CardTitle>
              <p className="text-blue-100">{dados.empresaNome}</p>
            </div>
            {onVoltar && (
              <Button variant="outline" onClick={onVoltar} className="text-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Plano
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Resumo Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo Geral do Diagnóstico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(mediaGeral)}%</div>
              <p className="text-gray-600">Média Geral de Maturidade</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {dadosGrafico.filter(item => item.percentage >= 60).length}
              </div>
              <p className="text-gray-600">Áreas em Bom Nível</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {dadosGrafico.filter(item => item.percentage < 40).length}
              </div>
              <p className="text-gray-600">Áreas Críticas</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
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
                <Bar dataKey="percentage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Análise Detalhada por Área */}
      <div className="grid gap-6">
        {areas.map((area) => {
          const resultado = diagnostico[area.key as keyof typeof diagnostico];
          const status = getStatusArea(resultado?.percentage || 0);
          const IconComponent = area.icon;
          
          return (
            <Card key={area.key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg text-white"
                      style={{ backgroundColor: area.cor }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{area.nome}</CardTitle>
                      <Badge variant="outline" className={`${status.texto} border-current`}>
                        {status.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: area.cor }}>
                      {resultado?.percentage || 0}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {resultado?.score || 0} / {resultado?.total || 0} pontos
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={resultado?.percentage || 0} 
                  className="h-3 mb-4"
                />
                
                <div className="space-y-3">
                  {resultado?.percentage >= 80 && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Área de Excelência</p>
                        <p className="text-sm text-green-700">
                          Esta área está muito bem estruturada. Continue mantendo os bons processos e busque oportunidades de inovação.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {resultado?.percentage >= 60 && resultado?.percentage < 80 && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Área em Desenvolvimento</p>
                        <p className="text-sm text-blue-700">
                          Boa base, mas há espaço para melhorias. Implemente as ações sugeridas para alcançar a excelência.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {resultado?.percentage >= 40 && resultado?.percentage < 60 && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Área de Atenção</p>
                        <p className="text-sm text-yellow-700">
                          Necessita atenção e investimento. Priorize as ações desta área para evitar impactos no negócio.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {resultado?.percentage < 40 && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Área Crítica</p>
                        <p className="text-sm text-red-700">
                          Requer ação imediata! Esta área pode estar comprometendo o crescimento da empresa. Implemente as ações com urgência.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráfico Pizza */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Maturidade por Área</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosPizza}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Análise SWOT */}
      {dados.ferramentasGeradas.swot && (
        <Card>
          <CardHeader>
            <CardTitle>Análise SWOT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">FORÇAS</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {dados.ferramentasGeradas.swot.forcas?.map((forca, index) => (
                      <li key={index}>• {forca}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">OPORTUNIDADES</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {dados.ferramentasGeradas.swot.oportunidades?.map((oportunidade, index) => (
                      <li key={index}>• {oportunidade}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">FRAQUEZAS</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {dados.ferramentasGeradas.swot.fraquezas?.map((fraqueza, index) => (
                      <li key={index}>• {fraqueza}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">AMEAÇAS</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {dados.ferramentasGeradas.swot.ameacas?.map((ameaca, index) => (
                      <li key={index}>• {ameaca}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FerramentasResultados;
