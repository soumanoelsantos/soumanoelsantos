import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { SwotData } from "@/types/swot";
import { useToast } from "@/hooks/use-toast";
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';

interface SwotActionPlanProps {
  swotData: SwotData;
  isLoading: boolean;
}

const SwotActionPlan: React.FC<SwotActionPlanProps> = ({ swotData, isLoading }) => {
  const { toast } = useToast();
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({});
  const [generating, setGenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);

  // Generate action plan based on SWOT data
  useEffect(() => {
    if (!isLoading && hasContent(swotData)) {
      generateActionPlan(swotData);
    }
  }, [swotData, isLoading]);

  // Check if SWOT data has content
  const hasContent = (data: SwotData): boolean => {
    return Object.values(data).some(category => 
      category.some(item => item.text && item.text.trim() !== '')
    );
  };

  // Generate action plan based on SWOT analysis
  const generateActionPlan = async (data: SwotData) => {
    setGenerating(true);
    
    try {
      // Try to generate an enhanced plan with DeepSeek AI
      if (!isUsingAI) {
        const enhancedPlan = await generateEnhancedSwotPlan(data);
        
        if (enhancedPlan) {
          setActionPlan(enhancedPlan);
          setIsUsingAI(true);
          setGenerating(false);
          return;
        }
      }
      
      // Fallback to basic plan generation
      const basicPlan = generateBasicActionPlan(data);
      setActionPlan(basicPlan);
    } catch (error) {
      console.error("Error generating action plan:", error);
      // Fallback to basic plan if AI fails
      const basicPlan = generateBasicActionPlan(data);
      setActionPlan(basicPlan);
    } finally {
      setGenerating(false);
    }
  };
  
  // Generate enhanced action plan using DeepSeek AI
  const generateEnhancedSwotPlan = async (data: SwotData) => {
    try {
      const validStrengths = data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text);
      const validWeaknesses = data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text);
      const validOpportunities = data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text);
      const validThreats = data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text);
      
      // Prepare SWOT data for API
      const swotForApi = {
        strengths: validStrengths,
        weaknesses: validWeaknesses,
        opportunities: validOpportunities,
        threats: validThreats
      };
      
      console.log("Sending SWOT data to DeepSeek API:", swotForApi);
      
      // Call the DeepSeek API
      const enhancedPlan = await generateEnhancedActionPlan(swotForApi);
      
      if (enhancedPlan) {
        console.log("Received enhanced action plan:", enhancedPlan);
        
        // Restructure the plan to match our expected format
        const restructuredPlan = {
          strengthsOpportunities: enhancedPlan.strengthsOpportunities || enhancedPlan.so || [],
          strengthsThreats: enhancedPlan.strengthsThreats || enhancedPlan.st || [],
          weaknessesOpportunities: enhancedPlan.weaknessesOpportunities || enhancedPlan.wo || [],
          weaknessesThreats: enhancedPlan.weaknessesThreats || enhancedPlan.wt || []
        };
        
        return restructuredPlan;
      }
      
      return null;
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);
      return null;
    }
  };

  // Generate basic action plan without AI
  const generateBasicActionPlan = (data: SwotData): Record<string, string[]> => {
    const plan: Record<string, string[]> = {
      strengthsOpportunities: [],
      strengthsThreats: [],
      weaknessesOpportunities: [],
      weaknessesThreats: []
    };

    // Strength + Opportunities (SO strategies)
    const validStrengths = data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text);
    const validOpportunities = data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text);
    
    if (validStrengths.length > 0 && validOpportunities.length > 0) {
      plan.strengthsOpportunities = generateSOStrategies(validStrengths, validOpportunities);
    }

    // Strength + Threats (ST strategies)
    const validThreats = data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text);
    if (validStrengths.length > 0 && validThreats.length > 0) {
      plan.strengthsThreats = generateSTStrategies(validStrengths, validThreats);
    }

    // Weaknesses + Opportunities (WO strategies)
    const validWeaknesses = data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text);
    if (validWeaknesses.length > 0 && validOpportunities.length > 0) {
      plan.weaknessesOpportunities = generateWOStrategies(validWeaknesses, validOpportunities);
    }

    // Weaknesses + Threats (WT strategies)
    if (validWeaknesses.length > 0 && validThreats.length > 0) {
      plan.weaknessesThreats = generateWTStrategies(validWeaknesses, validThreats);
    }

    return plan;
  };

  // Generate SO strategies (strengths + opportunities)
  const generateSOStrategies = (strengths: string[], opportunities: string[]): string[] => {
    const strategies = [];
    
    // Generic SO strategies based on strengths and opportunities
    if (strengths.length > 0) {
      strategies.push(`Utilize "${strengths[0]}" para aproveitar as oportunidades de mercado`);
    }
    
    if (strengths.length > 0 && opportunities.length > 0) {
      strategies.push(`Desenvolver uma campanha de marketing destacando "${strengths[0]}" para capitalizar sobre "${opportunities[0]}"`);
    }
    
    if (strengths.length > 1 && opportunities.length > 0) {
      strategies.push(`Criar parcerias estratégicas baseadas em "${strengths[1]}" para maximizar "${opportunities[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Investir no desenvolvimento de novos produtos ou serviços que aproveitem suas forças");
    strategies.push("Expandir para novos mercados onde suas forças serão mais valorizadas");
    
    return strategies;
  };

  // Generate ST strategies (strengths + threats)
  const generateSTStrategies = (strengths: string[], threats: string[]): string[] => {
    const strategies = [];
    
    if (strengths.length > 0 && threats.length > 0) {
      strategies.push(`Usar "${strengths[0]}" para neutralizar a ameaça "${threats[0]}"`);
    }
    
    if (strengths.length > 1 && threats.length > 0) {
      strategies.push(`Desenvolver um plano de contingência usando "${strengths[1]}" para minimizar o impacto de "${threats[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Fortalecer a proposta de valor única do seu negócio para se diferenciar da concorrência");
    strategies.push("Investir em inovação contínua para manter-se à frente das ameaças do mercado");
    strategies.push("Diversificar ofertas para reduzir o impacto potencial das ameaças externas");
    
    return strategies;
  };

  // Generate WO strategies (weaknesses + opportunities)
  const generateWOStrategies = (weaknesses: string[], opportunities: string[]): string[] => {
    const strategies = [];
    
    if (weaknesses.length > 0 && opportunities.length > 0) {
      strategies.push(`Investir em treinamento para superar "${weaknesses[0]}" e assim aproveitar "${opportunities[0]}"`);
    }
    
    if (weaknesses.length > 1 && opportunities.length > 0) {
      strategies.push(`Buscar parcerias estratégicas para compensar "${weaknesses[1]}" e capitalizar em "${opportunities[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Desenvolver novas habilidades ou contratar talentos para superar limitações internas");
    strategies.push("Investir em tecnologia ou processos que possam transformar fraquezas em forças");
    strategies.push("Buscar consultorias ou mentorias externas nas áreas mais frágeis do negócio");
    
    return strategies;
  };

  // Generate WT strategies (weaknesses + threats)
  const generateWTStrategies = (weaknesses: string[], threats: string[]): string[] => {
    const strategies = [];
    
    if (weaknesses.length > 0 && threats.length > 0) {
      strategies.push(`Desenvolver um plano para mitigar "${weaknesses[0]}" antes que a ameaça "${threats[0]}" se materialize`);
    }
    
    if (weaknesses.length > 1 && threats.length > 0) {
      strategies.push(`Priorizar a melhoria em "${weaknesses[1]}" para reduzir o impacto potencial de "${threats[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Criar um plano de gestão de riscos detalhado para proteger o negócio em áreas vulneráveis");
    strategies.push("Considerar parcerias estratégicas que possam compensar fraquezas internas");
    strategies.push("Investir em treinamento e desenvolvimento para transformar pontos fracos em neutros ou fortes");
    
    return strategies;
  };
  
  // Regenerate the action plan with AI
  const handleRegenerateActionPlan = async () => {
    if (generating) return;
    
    setGenerating(true);
    setIsUsingAI(false);
    
    try {
      await generateActionPlan(swotData);
    } finally {
      setGenerating(false);
    }
  };

  // Handle "Download Plan" button click
  const handleDownloadPlan = () => {
    try {
      // Create a text version of the action plan
      let planText = "PLANO DE AÇÃO BASEADO NA ANÁLISE SWOT\n\n";
      
      planText += "ESTRATÉGIAS SO (FORÇAS + OPORTUNIDADES):\n";
      actionPlan.strengthsOpportunities.forEach(strategy => {
        planText += `- ${strategy}\n`;
      });
      
      planText += "\nESTRATÉGIAS ST (FORÇAS + AMEAÇAS):\n";
      actionPlan.strengthsThreats.forEach(strategy => {
        planText += `- ${strategy}\n`;
      });
      
      planText += "\nESTRATÉGIAS WO (FRAQUEZAS + OPORTUNIDADES):\n";
      actionPlan.weaknessesOpportunities.forEach(strategy => {
        planText += `- ${strategy}\n`;
      });
      
      planText += "\nESTRATÉGIAS WT (FRAQUEZAS + AMEAÇAS):\n";
      actionPlan.weaknessesThreats.forEach(strategy => {
        planText += `- ${strategy}\n`;
      });
      
      // Create and download a text file
      const element = document.createElement("a");
      const file = new Blob([planText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "plano_acao_swot.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Plano de ação baixado",
        description: "O arquivo foi salvo na sua pasta de downloads",
      });
    } catch (error) {
      console.error("Error downloading action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao baixar",
        description: "Não foi possível baixar o plano de ação",
      });
    }
  };

  // Show loading state if no data or generating
  if (isLoading || !hasContent(swotData)) {
    return null; // Don't show anything if there's no data yet
  }

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-50">
        <CardTitle className="text-xl text-gray-800 flex justify-between items-center">
          <span>Plano de Ação baseado na sua análise SWOT</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2" 
              onClick={handleRegenerateActionPlan}
              disabled={generating}
            >
              <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
              {generating ? 'Gerando...' : 'Regenerar'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2" 
              onClick={handleDownloadPlan}
            >
              <Download className="h-4 w-4" />
              Baixar plano
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {generating ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Gerando plano de ação detalhado...</p>
            </div>
          </div>
        ) : (
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
                      {strategy}
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
                      {strategy}
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
                      {strategy}
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
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SwotActionPlan;
