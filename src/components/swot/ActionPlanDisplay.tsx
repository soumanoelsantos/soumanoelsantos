
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ActionPlanDisplayProps {
  actionPlan: Record<string, string[]>;
}

const ActionPlanDisplay: React.FC<ActionPlanDisplayProps> = ({ actionPlan }) => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [helpContent, setHelpContent] = useState<string>("");
  const [helpTitle, setHelpTitle] = useState<string>("");

  const handleOpenHelp = (category: string, strategy: string, index: number) => {
    const dialogId = `${category}-${index}`;
    setHelpTitle(`Como implementar esta estratégia`);
    setHelpContent(generateHelpContent(strategy, category));
    setOpenDialogs(prev => ({ ...prev, [dialogId]: true }));
  };

  const handleCloseDialog = (dialogId: string) => {
    setOpenDialogs(prev => ({ ...prev, [dialogId]: false }));
  };

  // Generate help content based on the strategy and category
  const generateHelpContent = (strategy: string, category: string) => {
    // Base content
    let content = `<p class="mb-4">Aqui está um guia detalhado para implementar a estratégia: <strong>${strategy}</strong></p>`;
    
    // Add steps based on category
    content += '<div class="space-y-4">';
    
    if (category === 'strengthsOpportunities') {
      content += `
        <h3 class="text-md font-semibold">Passos para implementação:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Faça um levantamento detalhado dos recursos disponíveis para executar esta estratégia.</li>
          <li>Defina métricas específicas de sucesso para acompanhar o progresso.</li>
          <li>Estabeleça um cronograma realista com marcos claros para implementação.</li>
          <li>Identifique os responsáveis por cada etapa do processo.</li>
          <li>Reserve um orçamento adequado para garantir a execução bem-sucedida.</li>
          <li>Estabeleça parcerias estratégicas que possam amplificar suas forças.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Dicas específicas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Realize uma pesquisa de mercado para validar sua estratégia antes de investir recursos significativos.</li>
          <li>Consulte especialistas no setor para obter insights valiosos.</li>
          <li>Monitore as tendências do mercado para garantir que a oportunidade continue relevante.</li>
          <li>Desenvolva um plano B caso encontre obstáculos inesperados.</li>
        </ul>
      `;
    } else if (category === 'strengthsThreats') {
      content += `
        <h3 class="text-md font-semibold">Passos para implementação:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Faça uma análise detalhada da ameaça e seu potencial impacto no seu negócio.</li>
          <li>Identifique quais forças podem ser utilizadas para neutralizar ou mitigar a ameaça.</li>
          <li>Desenvolva um plano de contingência detalhado para lidar com cenários adversos.</li>
          <li>Atribua responsabilidades claras para monitoramento contínuo da ameaça.</li>
          <li>Estabeleça um sistema de alerta precoce para detectar mudanças no ambiente de ameaça.</li>
          <li>Revise e atualize regularmente sua estratégia de mitigação.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Dicas específicas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Mantenha-se informado sobre mudanças no ambiente competitivo e regulatório.</li>
          <li>Fortaleça relacionamentos com parceiros estratégicos que possam ajudar a neutralizar ameaças.</li>
          <li>Invista em inovação contínua para manter-se à frente das mudanças do mercado.</li>
          <li>Considere diversificar suas ofertas para reduzir riscos associados a ameaças específicas.</li>
        </ul>
      `;
    } else if (category === 'weaknessesOpportunities') {
      content += `
        <h3 class="text-md font-semibold">Passos para implementação:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Identifique claramente qual fraqueza precisa ser superada para aproveitar a oportunidade.</li>
          <li>Desenvolva um plano de desenvolvimento de competências ou recursos necessários.</li>
          <li>Considere parcerias estratégicas que possam compensar suas fraquezas.</li>
          <li>Estabeleça um cronograma realista para desenvolver as capacidades necessárias.</li>
          <li>Defina métricas claras para medir seu progresso na superação da fraqueza.</li>
          <li>Avalie constantemente se a oportunidade ainda é viável durante o processo de melhoria.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Dicas específicas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Contrate especialistas ou consultores para acelerar o desenvolvimento de capacidades.</li>
          <li>Considere aquisições estratégicas que possam rapidamente preencher suas lacunas.</li>
          <li>Invista em treinamento e desenvolvimento da sua equipe.</li>
          <li>Busque tecnologias que possam automatizar ou melhorar áreas de fraqueza.</li>
        </ul>
      `;
    } else if (category === 'weaknessesThreats') {
      content += `
        <h3 class="text-md font-semibold">Passos para implementação:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Priorize as fraquezas que mais expõem seu negócio às ameaças identificadas.</li>
          <li>Desenvolva um plano detalhado de mitigação de riscos e fortalecimento.</li>
          <li>Identifique recursos e habilidades necessários para fortalecer áreas vulneráveis.</li>
          <li>Considere reestruturação organizacional se necessário.</li>
          <li>Estabeleça sistemas de monitoramento para acompanhar tanto suas fraquezas quanto as ameaças externas.</li>
          <li>Crie planos de contingência para cenários de pior caso.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Dicas específicas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Considere uma estratégia defensiva até que suas fraquezas sejam abordadas adequadamente.</li>
          <li>Busque alianças estratégicas que ofereçam proteção contra ameaças específicas.</li>
          <li>Invista em desenvolvimento de resiliência organizacional.</li>
          <li>Mantenha-se atualizado sobre mudanças no ambiente externo que possam agravar ameaças existentes.</li>
        </ul>
      `;
    }
    
    // Add general resources
    content += `
      <h3 class="text-md font-semibold mt-4">Recursos recomendados:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>Ferramentas de gestão de projetos para acompanhar a implementação</li>
        <li>Mentoria especializada no setor</li>
        <li>Grupos de networking com outros empresários</li>
        <li>Cursos e treinamentos para desenvolvimento de habilidades específicas</li>
      </ul>
    `;
    
    content += '</div>';
    
    return content;
  };

  return (
    <div className="space-y-6">
      {/* SO Strategies */}
      {actionPlan.strengthsOpportunities && actionPlan.strengthsOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias SO (Forças + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para aproveitar oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsOpportunities?.map((strategy, index) => (
              <li key={`so-${index}`} className="bg-green-50 border border-green-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1" 
                    onClick={() => handleOpenHelp('strengthsOpportunities', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ST Strategies */}
      {actionPlan.strengthsThreats && actionPlan.strengthsThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias ST (Forças + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para reduzir o impacto das ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsThreats?.map((strategy, index) => (
              <li key={`st-${index}`} className="bg-yellow-50 border border-yellow-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('strengthsThreats', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WO Strategies */}
      {actionPlan.weaknessesOpportunities && actionPlan.weaknessesOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WO (Fraquezas + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para superar fraquezas aproveitando oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesOpportunities?.map((strategy, index) => (
              <li key={`wo-${index}`} className="bg-blue-50 border border-blue-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('weaknessesOpportunities', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WT Strategies */}
      {actionPlan.weaknessesThreats && actionPlan.weaknessesThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WT (Fraquezas + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para minimizar fraquezas e evitar ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesThreats?.map((strategy, index) => (
              <li key={`wt-${index}`} className="bg-red-50 border border-red-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('weaknessesThreats', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Help Dialog */}
      <Dialog open={Object.values(openDialogs).some(v => v)} onOpenChange={() => setOpenDialogs({})}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{helpTitle}</DialogTitle>
            <DialogDescription className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: helpContent }} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionPlanDisplay;
