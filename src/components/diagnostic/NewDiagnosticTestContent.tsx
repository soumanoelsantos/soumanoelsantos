
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useIntegratedData } from '@/hooks/useIntegratedData';
import { generateIntelligentActions } from '@/utils/actionGeneration';
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

export interface ActionItem {
  id: string;
  acao: string;
  categoria: 'comercial' | 'marketing' | 'gestao' | 'financeiro' | 'rh' | 'operacional' | 'tecnologia' | 'cultura';
  prioridade: 'alta' | 'media' | 'baixa';
  prazo: string;
  responsavel: string;
  recursos: string;
  metricas: string;
  beneficios: string;
  dataVencimento: Date;
  concluida: boolean;
  detalhesImplementacao: string;
  dicaIA: string;
  status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
  semana: number;
  comoFazer: string[];
  completedSteps?: boolean[];
}

const NewDiagnosticTestContent = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const { data: integratedData, isLoading: loadingIntegratedData } = useIntegratedData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
  const [actionPlan, setActionPlan] = useState<ActionItem[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingPlan = () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const savedPlan = localStorage.getItem(`diagnostic_plan_${userId}`);
        const savedCompany = localStorage.getItem(`diagnostic_company_${userId}`);
        const savedDiagnosticData = localStorage.getItem(`diagnostic_data_${userId}`);
        
        console.log('Checking existing plan:', { savedPlan: !!savedPlan, savedCompany, savedDiagnosticData: !!savedDiagnosticData });
        
        if (savedPlan && savedCompany) {
          const plan = JSON.parse(savedPlan);
          console.log('Found existing plan with', plan.length, 'actions');
          
          setActionPlan(plan);
          setCompanyName(savedCompany);
          setHasExistingPlan(true);
          
          if (savedDiagnosticData) {
            setDiagnosticData(JSON.parse(savedDiagnosticData));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar plano salvo:', error);
        // Limpar dados corrompidos
        localStorage.removeItem(`diagnostic_plan_${userId}`);
        localStorage.removeItem(`diagnostic_company_${userId}`);
        localStorage.removeItem(`diagnostic_data_${userId}`);
      }
      
      setIsLoading(false);
    };

    checkExistingPlan();
  }, [userId]);

  const handleSubmit = async (data: DiagnosticData) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Usuário não autenticado",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Gerando plano de ação para:', data.empresaNome);
      console.log('Dados integrados disponíveis:', integratedData);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Criar resultados de diagnóstico simulados baseados nos dados do formulário
      const diagnosticResults = {
        comercial: {
          pontuacao: data.problemasComerciais ? 3 : 7,
          nivel: data.problemasComerciais ? 'critico' as const : 'bom' as const,
          problemas: data.problemasComerciais ? [data.problemasComerciais] : [],
          solucoes: []
        },
        marketing: {
          pontuacao: data.problemasMarketing ? 4 : 6,
          nivel: data.problemasMarketing ? 'atencao' as const : 'bom' as const,
          problemas: data.problemasMarketing ? [data.problemasMarketing] : [],
          solucoes: []
        },
        gestao: {
          pontuacao: data.problemasGestao ? 3 : 7,
          nivel: data.problemasGestao ? 'critico' as const : 'bom' as const,
          problemas: data.problemasGestao ? [data.problemasGestao] : [],
          solucoes: []
        },
        financeiro: {
          pontuacao: data.problemasFinanceiros ? 4 : 6,
          nivel: data.problemasFinanceiros ? 'atencao' as const : 'bom' as const,
          problemas: data.problemasFinanceiros ? [data.problemasFinanceiros] : [],
          solucoes: []
        },
        rh: {
          pontuacao: data.problemasRH ? 4 : 6,
          nivel: data.problemasRH ? 'atencao' as const : 'bom' as const,
          problemas: data.problemasRH ? [data.problemasRH] : [],
          solucoes: []
        },
        operacional: {
          pontuacao: data.problemasOperacionais ? 3 : 7,
          nivel: data.problemasOperacionais ? 'critico' as const : 'bom' as const,
          problemas: data.problemasOperacionais ? [data.problemasOperacionais] : [],
          solucoes: []
        }
      };
      
      // Gerar plano inteligente com ações organizadas
      const generatedPlan = generateIntelligentActions({
        results: diagnosticResults,
        companyName: data.empresaNome,
        maxActions: 60
      });
      
      console.log(`Plano gerado com ${generatedPlan.length} ações`);
      
      // Salvar no localStorage
      localStorage.setItem(`diagnostic_plan_${userId}`, JSON.stringify(generatedPlan));
      localStorage.setItem(`diagnostic_company_${userId}`, data.empresaNome);
      localStorage.setItem(`diagnostic_data_${userId}`, JSON.stringify(data));
      
      setActionPlan(generatedPlan);
      setCompanyName(data.empresaNome);
      setDiagnosticData(data);
      setHasExistingPlan(true);
      
      toast({
        title: "Plano de aceleração gerado com sucesso!",
        description: `${generatedPlan.length} ações estratégicas foram criadas para acelerar sua empresa.`,
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
    if (!userId) return;
    
    // Limpar dados salvos
    localStorage.removeItem(`diagnostic_plan_${userId}`);
    localStorage.removeItem(`diagnostic_company_${userId}`);
    localStorage.removeItem(`diagnostic_data_${userId}`);
    
    setHasExistingPlan(false);
    setActionPlan([]);
    setCompanyName('');
    setDiagnosticData(null);
    
    toast({
      title: "Novo diagnóstico iniciado",
      description: "Você pode agora gerar um novo plano de ação.",
    });
  };

  const updateActionPlan = (updatedPlan: ActionItem[]) => {
    setActionPlan(updatedPlan);
    if (userId) {
      localStorage.setItem(`diagnostic_plan_${userId}`, JSON.stringify(updatedPlan));
    }
  };

  if (isLoading || loadingIntegratedData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando diagnóstico...</p>
        </div>
      </div>
    );
  }

  if (hasExistingPlan && actionPlan.length > 0) {
    return (
      <ActionPlanManager 
        actionPlan={actionPlan}
        companyName={companyName}
        diagnosticData={diagnosticData}
        onBack={handleNewDiagnostic}
        onUpdatePlan={updateActionPlan}
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
