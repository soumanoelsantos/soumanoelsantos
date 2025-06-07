
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import SimpleDiagnosticForm from './SimpleDiagnosticForm';
import ActionPlanManager from './ActionPlanManager';
import { Loader2 } from 'lucide-react';

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

interface ActionItem {
  id: string;
  acao: string;
  categoria: string;
  prioridade: 'alta' | 'media' | 'baixa';
  prazo: string;
  responsavel: string;
  recursos: string;
  metricas: string;
  beneficios: string;
  dataVencimento: Date;
  concluida: boolean;
  detalhesImplementacao: string;
}

const NewDiagnosticTestContent = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
  const [actionPlan, setActionPlan] = useState<ActionItem[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já existe um plano salvo
    const checkExistingPlan = () => {
      const savedPlan = localStorage.getItem(`diagnostic_plan_${userId}`);
      const savedCompany = localStorage.getItem(`diagnostic_company_${userId}`);
      
      if (savedPlan && savedCompany) {
        try {
          const plan = JSON.parse(savedPlan);
          setActionPlan(plan);
          setCompanyName(savedCompany);
          setHasExistingPlan(true);
        } catch (error) {
          console.error('Erro ao carregar plano salvo:', error);
        }
      }
      setIsLoading(false);
    };

    if (userId) {
      checkExistingPlan();
    }
  }, [userId]);

  const generateActionPlan = (data: DiagnosticData): ActionItem[] => {
    const actions: ActionItem[] = [];
    
    // Gerar ações baseadas nos problemas identificados
    if (data.problemasComerciais) {
      actions.push({
        id: 'comercial_1',
        acao: 'Estruturar processo comercial completo com funil de vendas definido',
        categoria: 'comercial',
        prioridade: 'alta',
        prazo: '30 dias',
        responsavel: 'Gestor Comercial',
        recursos: 'CRM, treinamento da equipe, material de vendas',
        metricas: 'Aumento de 20% na taxa de conversão de leads',
        beneficios: 'Maior previsibilidade nas vendas, aumento da conversão e melhor acompanhamento de oportunidades',
        dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Mapear processo atual, definir etapas do funil, implementar CRM e treinar equipe'
      });
    }

    if (data.problemasFinanceiros) {
      actions.push({
        id: 'financeiro_1',
        acao: 'Implementar controle financeiro rigoroso com fluxo de caixa diário',
        categoria: 'financeiro',
        prioridade: 'alta',
        prazo: '15 dias',
        responsavel: 'Gestor Financeiro',
        recursos: 'Software financeiro, planilhas de controle, conta PJ',
        metricas: 'Controle 100% das entradas e saídas, redução de 30% nos custos desnecessários',
        beneficios: 'Maior controle sobre as finanças, redução de desperdícios e melhor tomada de decisão',
        dataVencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Organizar documentos, implementar sistema, treinar responsável'
      });
    }

    if (data.problemasGestao) {
      actions.push({
        id: 'gestao_1',
        acao: 'Documentar e padronizar todos os processos operacionais principais',
        categoria: 'gestao',
        prioridade: 'media',
        prazo: '45 dias',
        responsavel: 'Diretor/Sócio',
        recursos: 'Tempo para mapeamento, software de documentação',
        metricas: '100% dos processos críticos documentados e seguidos pela equipe',
        beneficios: 'Maior eficiência operacional, redução de erros e facilidade para treinar novos funcionários',
        dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Mapear processos atuais, criar documentação, treinar equipe'
      });
    }

    if (data.problemasRH) {
      actions.push({
        id: 'rh_1',
        acao: 'Estruturar política de RH com processo seletivo e retenção de talentos',
        categoria: 'rh',
        prioridade: 'media',
        prazo: '60 dias',
        responsavel: 'Gestor de Pessoas',
        recursos: 'Definição de cargos, processo seletivo, programa de benefícios',
        metricas: 'Redução de 50% na rotatividade, aumento de 30% na satisfação da equipe',
        beneficios: 'Equipe mais motivada, menor rotatividade e melhor clima organizacional',
        dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Definir descrições de cargo, criar processo seletivo, implementar avaliação'
      });
    }

    if (data.problemasMarketing) {
      actions.push({
        id: 'marketing_1',
        acao: 'Desenvolver estratégia de marketing digital com presença nas redes sociais',
        categoria: 'marketing',
        prioridade: 'media',
        prazo: '30 dias',
        responsavel: 'Gestor de Marketing',
        recursos: 'Criação de conteúdo, redes sociais, ferramentas de gestão',
        metricas: 'Aumento de 100% no engajamento, geração de 50 leads mensais',
        beneficios: 'Maior visibilidade da marca, geração de leads qualificados e presença digital forte',
        dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Definir personas, criar conteúdo, configurar redes sociais'
      });
    }

    if (data.problemasOperacionais) {
      actions.push({
        id: 'operacional_1',
        acao: 'Implementar controle de qualidade e padronização dos produtos/serviços',
        categoria: 'operacional',
        prioridade: 'alta',
        prazo: '45 dias',
        responsavel: 'Gestor Operacional',
        recursos: 'Check-lists, treinamento, ferramentas de qualidade',
        metricas: 'Redução de 80% nas reclamações, aumento de 25% na satisfação',
        beneficios: 'Maior satisfação do cliente, redução de retrabalho e melhoria da reputação',
        dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Criar padrões de qualidade, treinar equipe, implementar controles'
      });
    }

    // Ação baseada nos objetivos
    if (data.objetivos6Meses) {
      actions.push({
        id: 'objetivos_1',
        acao: `Implementar estratégia para alcançar objetivos: ${data.objetivos6Meses}`,
        categoria: 'gestao',
        prioridade: 'alta',
        prazo: '180 dias',
        responsavel: 'Diretor/Sócio',
        recursos: 'Planejamento estratégico, acompanhamento mensal',
        metricas: 'Atingir 100% dos objetivos definidos em 6 meses',
        beneficios: 'Crescimento sustentável, metas claras e direcionamento estratégico',
        dataVencimento: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Quebrar objetivo em metas menores, acompanhar mensalmente'
      });
    }

    return actions;
  };

  const handleSubmit = async (data: DiagnosticData) => {
    setIsSubmitting(true);
    
    try {
      // Simular processamento (aqui você pode integrar com IA real)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedPlan = generateActionPlan(data);
      
      // Salvar no localStorage
      localStorage.setItem(`diagnostic_plan_${userId}`, JSON.stringify(generatedPlan));
      localStorage.setItem(`diagnostic_company_${userId}`, data.empresaNome);
      
      setActionPlan(generatedPlan);
      setCompanyName(data.empresaNome);
      setHasExistingPlan(true);
      
      toast({
        title: "Plano de ação gerado!",
        description: `${generatedPlan.length} ações práticas foram criadas para sua empresa.`,
      });
      
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewDiagnostic = () => {
    // Limpar dados salvos
    localStorage.removeItem(`diagnostic_plan_${userId}`);
    localStorage.removeItem(`diagnostic_company_${userId}`);
    
    setHasExistingPlan(false);
    setActionPlan([]);
    setCompanyName('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (hasExistingPlan && actionPlan.length > 0) {
    return (
      <ActionPlanManager 
        initialActions={actionPlan}
        companyName={companyName}
        onBack={handleNewDiagnostic}
      />
    );
  }

  return (
    <SimpleDiagnosticForm 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default NewDiagnosticTestContent;
