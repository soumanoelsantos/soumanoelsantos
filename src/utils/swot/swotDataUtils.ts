
import { SwotData } from "@/types/swot";

/**
 * Extract valid items from SWOT data
 */
export const extractValidSwotItems = (data: SwotData) => {
  return {
    validStrengths: data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text),
    validWeaknesses: data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text),
    validOpportunities: data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text),
    validThreats: data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text)
  };
};

/**
 * Check if SWOT data has content
 */
export const hasSwotContent = (data: SwotData): boolean => {
  return Object.values(data).some(category => 
    category.some(item => item.text && item.text.trim() !== '')
  );
};
