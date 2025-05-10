
import { useState, useEffect } from 'react';
import { SwotData } from "@/types/swot";
import { generateEnhancedSwotPlan, generateBasicActionPlan } from '@/utils/swot/actionPlanGenerator';
import { useToast } from '@/hooks/use-toast';

export const useSwotActionPlan = (swotData: SwotData, isLoading: boolean) => {
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

  return { 
    actionPlan,
    generating,
    isUsingAI,
    handleRegenerateActionPlan,
    hasContent
  };
};
