
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Settings, 
  DollarSign, 
  Users, 
  Target, 
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface DiagnosticData {
  empresaNome: string;
  segmento: string;
  tempoMercado: string;
  faturamentoMensal: string;
  numeroFuncionarios: string;
  problemasComerciais: string;
  problemasGestao: string;
  problemasFinanceiros: string;
  problemasRH: string;
  problemasMarketing: string;
  problemasOperacionais: string;
  maioresDificuldades: string;
  objetivos6Meses: string;
}

interface ProblemSolutionsDisplayProps {
  diagnosticData: DiagnosticData;
}

const ProblemSolutionsDisplay: React.FC<ProblemSolutionsDisplayProps> = ({ diagnosticData }) => {
  const getIconForArea = (area: string) => {
    switch(area) {
      case 'comerciais': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'gestao': return <Settings className="h-5 w-5 text-blue-600" />;
      case 'financeiros': return <DollarSign className="h-5 w-5 text-red-600" />;
      case 'rh': return <Users className="h-5 w-5 text-purple-600" />;
      case 'marketing': return <Target className="h-5 w-5 text-orange-600" />;
      case 'operacionais': return <Settings className="h-5 w-5 text-gray-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getAreaTitle = (area: string) => {
    switch(area) {
      case 'comerciais': return 'Problemas Comerciais/Vendas';
      case 'gestao': return 'Problemas de Gestão';
      case 'financeiros': return 'Problemas Financeiros';
      case 'rh': return 'Problemas de Pessoas/RH';
      case 'marketing': return 'Problemas de Marketing';
      case 'operacionais': return 'Problemas Operacionais';
      default: return 'Outros Problemas';
    }
  };

  const generateSolutions = (area: string, problema: string) => {
    if (!problema.trim()) return [];

    const solutionsMap: { [key: string]: string[] } = {
      comerciais: [
        "Implementar CRM para controle do funil de vendas",
        "Criar script de vendas padronizado",
        "Treinar equipe comercial em técnicas de fechamento",
        "Desenvolver estratégia de follow-up automatizada",
        "Definir metas claras e comissões motivadoras"
      ],
      gestao: [
        "Criar organograma com responsabilidades bem definidas",
        "Implementar reuniões semanais de alinhamento",
        "Estabelecer processos documentados para principais atividades",
        "Usar ferramentas de gestão de projetos (Trello, Asana)",
        "Definir indicadores de performance (KPIs) por setor"
      ],
      financeiros: [
        "Implementar controle de fluxo de caixa diário",
        "Separar completamente finanças pessoais das empresariais",
        "Negociar prazos com fornecedores e clientes",
        "Criar reserva de emergência de 6 meses",
        "Automatizar cobrança e reduzir inadimplência"
      ],
      rh: [
        "Criar programa de integração para novos funcionários",
        "Implementar avaliações de desempenho trimestrais",
        "Desenvolver plano de carreira interno",
        "Investir em treinamentos e capacitação",
        "Melhorar comunicação interna e feedback constante"
      ],
      marketing: [
        "Criar presença digital profissional (site + redes sociais)",
        "Desenvolver estratégia de conteúdo relevante",
        "Implementar campanhas de Google Ads segmentadas",
        "Criar programa de indicações de clientes",
        "Investir em branding e identidade visual consistente"
      ],
      operacionais: [
        "Mapear e otimizar processos principais",
        "Implementar controle de qualidade rigoroso",
        "Automatizar tarefas repetitivas",
        "Investir em tecnologia adequada",
        "Criar indicadores de produtividade"
      ]
    };

    return solutionsMap[area] || [
      "Realizar diagnóstico detalhado da situação",
      "Buscar consultoria especializada na área",
      "Implementar controles e métricas específicas",
      "Treinar equipe responsável",
      "Criar plano de melhoria contínua"
    ];
  };

  const problemAreas = [
    { key: 'comerciais', value: diagnosticData.problemasComerciais },
    { key: 'gestao', value: diagnosticData.problemasGestao },
    { key: 'financeiros', value: diagnosticData.problemasFinanceiros },
    { key: 'rh', value: diagnosticData.problemasRH },
    { key: 'marketing', value: diagnosticData.problemasMarketing },
    { key: 'operacionais', value: diagnosticData.problemasOperacionais }
  ].filter(area => area.value.trim());

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-900">
            Análise dos Problemas Identificados - {diagnosticData.empresaNome}
          </CardTitle>
          <p className="text-center text-blue-700">
            Com base nas suas respostas, nossa IA identificou soluções práticas para cada problema:
          </p>
        </CardHeader>
      </Card>

      {/* Maiores Dificuldades */}
      {diagnosticData.maioresDificuldades && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Principais Dificuldades Identificadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
              <p className="text-gray-800 italic">"{diagnosticData.maioresDificuldades}"</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-red-800 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Ações Prioritárias da IA:
              </h4>
              <div className="grid gap-2">
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Implementar reunião semanal de 30min para identificar e resolver bloqueios rapidamente</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Criar dashboard simples com os 3 indicadores mais importantes do negócio</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Definir uma única prioridade por semana e focar 80% dos esforços nela</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Problemas por Área */}
      {problemAreas.map((area) => (
        <Card key={area.key} className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIconForArea(area.key)}
              {getAreaTitle(area.key)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <p className="text-gray-800 italic">"{area.value}"</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Soluções Práticas da IA:
              </h4>
              <div className="grid gap-2">
                {generateSolutions(area.key, area.value).slice(0, 4).map((solution, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-900">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Objetivos */}
      {diagnosticData.objetivos6Meses && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Target className="h-5 w-5" />
              Objetivos para os Próximos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-gray-800 italic">"{diagnosticData.objetivos6Meses}"</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Estratégias da IA para Alcançar os Objetivos:
              </h4>
              <div className="grid gap-2">
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Quebrar cada objetivo em metas mensais e semanais mensuráveis</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Criar cronograma de implementação das soluções priorizando impacto vs. esforço</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Estabelecer checkpoint quinzenal para ajustar estratégias conforme resultados</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProblemSolutionsDisplay;
