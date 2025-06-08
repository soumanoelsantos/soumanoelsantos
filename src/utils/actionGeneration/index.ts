
import { ActionItem } from '@/components/diagnostic/NewDiagnosticTestContent';
import { DiagnosticResults, GenerateActionsParams, ActionCategory } from './types';
import { comprehensiveActionTemplates } from './actionTemplates';
import {
  getPriorityByScore,
  getStatusByPriority,
  getTimeframeByPriority,
  getResourcesByCategory,
  getMetricsByCategory,
  getBenefitsByCategory,
  generateSteps,
  generateAITip
} from './utilityFunctions';

export const generateIntelligentActions = ({ 
  results, 
  companyName 
}: GenerateActionsParams): ActionItem[] => {
  const actions: ActionItem[] = [];
  const usedActions = new Set<string>();
  let actionCounter = 1;

  // Todas as categorias disponíveis incluindo as novas
  const allCategories: ActionCategory[] = [
    'comercial', 
    'marketing', 
    'pre-venda', 
    'pre_venda',
    'encantamento-cliente',
    'encantamento_cliente',
    'gestao', 
    'financeiro', 
    'rh', 
    'operacional', 
    'tecnologia', 
    'cultura', 
    'relacionamento', 
    'produto', 
    'sucesso-cliente'
  ];
  
  // Determinar o número máximo de ações por categoria (agora com muito mais ações)
  const maxActionsPerCategory = Math.max(...Object.values(comprehensiveActionTemplates).map(templates => templates.length));
  
  // Gerar múltiplos ciclos para criar pelo menos 700 ações
  const totalCycles = Math.ceil(700 / (allCategories.length * maxActionsPerCategory)) + 1;
  
  for (let cycle = 0; cycle < totalCycles; cycle++) {
    // Intercalar ações por categoria para criar diversidade
    for (let i = 0; i < maxActionsPerCategory; i++) {
      for (const categoria of allCategories) {
        // Parar se já tivermos 800 ações (garantindo pelo menos 700)
        if (actions.length >= 800) {
          break;
        }
        
        const categoryKey = categoria as keyof typeof comprehensiveActionTemplates;
        const availableTemplates = comprehensiveActionTemplates[categoryKey] || [];
        
        // Se esta categoria ainda tem ações disponíveis neste índice
        if (i < availableTemplates.length) {
          const template = availableTemplates[i];
          
          // Criar uma chave única incluindo o ciclo para evitar duplicatas mas permitir repetições em ciclos diferentes
          const actionKey = `${template}_cycle_${cycle}`;
          
          // Verificar se a ação já foi usada neste ciclo
          if (usedActions.has(actionKey)) {
            continue; // Pular esta ação se já existe neste ciclo
          }
          
          usedActions.add(actionKey);
          
          // Determinar prioridade baseada nos resultados do diagnóstico
          let priority: 'alta' | 'media' | 'baixa' = 'media';
          
          // Mapear categorias para resultados do diagnóstico
          const categoryMapping: {[key: string]: string} = {
            'comercial': 'resultados',
            'marketing': 'resultados',
            'pre-venda': 'resultados',
            'pre_venda': 'resultados',
            'encantamento-cliente': 'pessoas',
            'encantamento_cliente': 'pessoas',
            'gestao': 'sistemaGestao',
            'financeiro': 'sistemaGestao',
            'rh': 'pessoas',
            'operacional': 'processos',
            'tecnologia': 'processos',
            'cultura': 'pessoas',
            'relacionamento': 'resultados',
            'produto': 'processos',
            'sucesso-cliente': 'pessoas'
          };
          
          const diagnosticArea = categoryMapping[categoria];
          if (diagnosticArea && results[diagnosticArea]) {
            const score = results[diagnosticArea].pontuacao || 5;
            if (score <= 3) {
              priority = 'alta';
            } else if (score <= 6) {
              priority = 'media';
            } else {
              priority = 'baixa';
            }
          }

          const today = new Date();
          const dueDate = new Date(today);
          dueDate.setDate(today.getDate() + (actionCounter * 2)); // 2 dias entre ações para acelerar cronograma

          // Adicionar variação no template para cycles > 0
          let finalTemplate = template;
          if (cycle > 0) {
            finalTemplate = `${template} - Versão Avançada ${cycle + 1}`;
          }

          const action: ActionItem = {
            id: `action_${actionCounter}`,
            acao: finalTemplate,
            categoria: categoryKey as any,
            prioridade: priority,
            prazo: getTimeframeByPriority(priority),
            responsavel: 'A definir',
            recursos: getResourcesByCategory(categoryKey),
            metricas: getMetricsByCategory(categoryKey),
            beneficios: getBenefitsByCategory(categoryKey),
            dataVencimento: dueDate,
            concluida: false,
            detalhesImplementacao: `Ação estratégica focada em ${categoria} para acelerar o crescimento da empresa ${companyName}. Cycle ${cycle + 1} de implementação.`,
            dicaIA: generateAITip(finalTemplate, categoryKey),
            status: getStatusByPriority(priority),
            semana: Math.ceil(actionCounter / 14), // 14 ações por semana para acelerar
            comoFazer: generateSteps(finalTemplate, categoryKey),
            completedSteps: []
          };

          actions.push(action);
          actionCounter++;
        }
      }
      
      // Parar se já tivermos 800 ações
      if (actions.length >= 800) {
        break;
      }
    }
    
    // Parar se já tivermos 800 ações
    if (actions.length >= 800) {
      break;
    }
  }

  console.log(`Generated ${actions.length} unique actions across ${allCategories.length} categories (multiple cycles for comprehensive coverage)`);
  
  return actions;
};

// Re-export types for external use
export type { DiagnosticResults, GenerateActionsParams, ActionCategory } from './types';
