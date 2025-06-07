
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useIntegratedData } from '@/hooks/useIntegratedData';
import { generateIntelligentActionPlan } from '@/utils/intelligentActionGenerator';
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
  dicaIA: string;
  status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
  semana: number;
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
      
      // Gerar plano inteligente com exatamente 104 ações
      const generatedPlan = generateIntelligentActionPlan(data, integratedData);
      
      console.log(`Plano gerado com ${generatedPlan.length} ações`);
      
      // Verificar se foram geradas exatamente 104 ações
      if (generatedPlan.length !== 104) {
        console.warn(`Esperadas 104 ações, mas foram geradas ${generatedPlan.length}`);
      }
      
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
        description: `${generatedPlan.length} ações estratégicas foram criadas para acelerar sua empresa nos próximos 6 meses. O plano foi personalizado com base nos dados das suas ferramentas.`,
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
        initialActions={actionPlan}
        companyName={companyName}
        diagnosticData={diagnosticData}
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
