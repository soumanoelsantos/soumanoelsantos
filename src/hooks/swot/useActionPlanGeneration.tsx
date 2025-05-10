
import { useState } from 'react';
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from '@/types/companyInfo';
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';
import { generateBasicActionPlan, generateEnhancedSwotPlan } from '@/utils/swot/actionPlanGenerator';
import { hasSwotContent } from '@/utils/swot/swotDataUtils';

export const useActionPlanGeneration = () => {
  const [generating, setGenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);

  // Use the extracted utility function for checking content
  const hasContent = hasSwotContent;

  // Generate action plan based on SWOT analysis and company info
  const generateActionPlan = async (data: SwotData, companyInfoData?: CompanyInfoData | null) => {
    setGenerating(true);
    
    try {
      // Create a data object with both SWOT data and company info
      const enrichedData = {
        ...data,
        companyInfo: companyInfoData || null
      };

      // Try to use DeepSeek AI for enhanced plan
      let generatedPlan;
      if (!isUsingAI) {
        try {
          // Use the refactored enhancedSwotPlan function
          generatedPlan = await generateEnhancedSwotPlan(data, companyInfoData);
          if (generatedPlan) {
            setIsUsingAI(true);
          }
        } catch (aiError) {
          console.error("Error with AI generation:", aiError);
          // Will fallback to basic generation below
        }
      }

      // If no AI plan was generated, fallback to basic plan
      if (!generatedPlan) {
        generatedPlan = generateBasicActionPlan(data, companyInfoData);
      }
      
      return generatedPlan;
    } catch (error) {
      console.error("Error generating action plan:", error);
      // Fallback to basic plan if all else fails
      const basicPlan = generateBasicActionPlan(data, companyInfoData);
      return basicPlan;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generating,
    isUsingAI,
    hasContent,
    generateActionPlan
  };
};
