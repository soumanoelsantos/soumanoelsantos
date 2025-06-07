
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Settings,
  Heart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
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

const DiagnosticoResultados: React.FC<DiagnosticoResultadosProps> = ({ 
  resultados, 
  respostas, 
  onContinuar 
}) => {
  
  const getAreaIcon = (area: string) => {
    switch(area) {
      case 'comercial': return <TrendingUp className="h-5 w-5" />;
      case 'gestao': return <Target className="h-5 w-5" />;
      case 'rh': return <Users className="h-5 w-5" />;
      case 'marketing': return <BarChart3 className="h-5 w-5" />;
      case 'financeiro': return <DollarSign className="h-5 w-5" />;
      case 'cliente': return <Heart className="h-5 w-5" />;
      case 'sistema': return <Settings className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getAreaName = (area: string) => {
    const nomes = {
      comercial: 'Comercial',
      gestao: 'Gestão',
      rh: 'Pessoas/RH', 
      marketing: 'Marketing',
      financeiro: 'Financeiro',
      cliente: 'Sucesso do Cliente',
      sistema: 'Sistema de Gestão'
    };
    return nomes[area as keyof typeof nomes] || area;
  };

  const getAreaColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 85) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Excelente</Badge>;
    }
    if (percentage >= 70) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Bom</Badge>;
    }
    if (percentage >= 50) {
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Regular</Badge>;
    }
    return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Crítico</Badge>;
  };

  const extractDoresIdentificadas = (area: string) => {
    const perguntaDores = respostas.find(r => r.perguntaId.includes(`dores_${area}`));
    if (perguntaDores && perguntaDores.resposta && perguntaDores.resposta !== '') {
      return String(perguntaDores.resposta);
    }
    return null;
  };

  const getRecomendacoesImediatas = (area: string, percentage: number) => {
    const recomendacoes = {
      comercial: [
        "Estruturar processo de vendas com etapas claras",
        "Implementar CRM para gestão de leads",
        "Criar script de vendas e materiais de apoio",
        "Estabelecer metas individuais e coletivas"
      ],
      gestao: [
        "Implementar reuniões semanais de acompanhamento",
        "Definir organograma e responsabilidades",
        "Criar sistema de delegação de tarefas",
        "Estabelecer indicadores de performance"
      ],
      rh: [
        "Criar programa de capacitação da equipe",
        "Implementar processo de recrutamento estruturado",
        "Desenvolver manual do colaborador",
        "Realizar pesquisa de clima organizacional"
      ],
      marketing: [
        "Desenvolver estratégia de marketing digital",
        "Criar identidade visual consistente",
        "Implementar presença nas redes sociais",
        "Desenvolver programa de fidelização"
      ],
      financeiro: [
        "Implementar controle de fluxo de caixa",
        "Estabelecer política de cobrança",
        "Criar orçamento anual detalhado",
        "Implementar análise de custos por produto"
      ],
      cliente: [
        "Criar programa de relacionamento com clientes",
        "Implementar pesquisa de satisfação",
        "Criar base de conhecimento para atendimento",
        "Estabelecer canal direto com clientes VIP"
      ],
      sistema: [
        "Mapear e documentar processos principais",
        "Implementar sistema ERP integrado",
        "Criar procedimentos operacionais padrão",
        "Implementar backup e segurança de dados"
      ]
    };

    return recomendacoes[area as keyof typeof recomendacoes] || [];
  };

  const mediaGeral = Object.values(resultados).reduce((acc, curr) => acc + curr.percentage, 0) / Object.keys(resultados).length;
  const areasExcelentes = Object.values(resultados).filter(r => r.percentage >= 85).length;
  const areasCriticas = Object.values(resultados).filter(r => r.percentage < 50).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Diagnóstico do Negócio - Resultados</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(mediaGeral)}%</div>
              <div className="text-blue-100">Média Geral de Maturidade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">{areasExcelentes}</div>
              <div className="text-blue-100">Áreas em Bom Nível</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300">{areasCriticas}</div>
              <div className="text-blue-100">Áreas Críticas</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Resultados por Área */}
      <div className="grid gap-6">
        {Object.entries(resultados).map(([area, dados]) => {
          const doresIdentificadas = extractDoresIdentificadas(area);
          const recomendacoes = getRecomendacoesImediatas(area, dados.percentage);
          
          return (
            <Card key={area} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${dados.percentage >= 70 ? 'bg-green-100' : dados.percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <div className={getAreaColor(dados.percentage)}>
                        {getAreaIcon(area)}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg uppercase tracking-wide">
                        {getAreaName(area)}
                      </CardTitle>
                      {getStatusBadge(dados.percentage)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getAreaColor(dados.percentage)}`}>
                      {dados.percentage}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {dados.score} de {dados.total} pontos
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>0%</span>
                    <span className="text-gray-500">Meta: 85%</span>
                    <span>100%</span>
                  </div>
                  <Progress value={dados.percentage} className="h-2" />
                </div>

                {/* Dores Identificadas */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Principais Dores Identificadas:
                  </h4>
                  <div className="text-red-700 text-sm">
                    {doresIdentificadas || "Não informado"}
                  </div>
                </div>

                {/* Área Crítica Alert */}
                {dados.percentage < 50 && (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-800 font-medium">
                      <AlertTriangle className="h-4 w-4" />
                      Área Crítica
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Requer ação imediata! Esta área pode estar comprometendo o crescimento da empresa. Implemente as ações com urgência.
                    </p>
                  </div>
                )}

                {/* Recomendações Imediatas */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Principais Ações Recomendadas:
                  </h4>
                  <div className="space-y-2">
                    {recomendacoes.slice(0, 4).map((recomendacao, index) => (
                      <div key={index} className="flex items-start gap-2 text-blue-700 text-sm">
                        <Clock className="h-3 w-3 mt-1 flex-shrink-0" />
                        <span>{recomendacao}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo Final */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo de Pontuação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Área</th>
                  <th className="text-center py-2">Atual</th>
                  <th className="text-center py-2">Meta</th>
                  <th className="text-center py-2">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resultados).map(([area, dados]) => (
                  <tr key={area} className="border-b">
                    <td className="py-2 font-medium">{getAreaName(area)}</td>
                    <td className="text-center py-2">{dados.percentage}%</td>
                    <td className="text-center py-2">85%</td>
                    <td className="text-center py-2">6 meses</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticoResultados;
