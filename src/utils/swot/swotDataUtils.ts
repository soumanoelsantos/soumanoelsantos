
import { SwotData } from "@/types/swot";

/**
 * Extract valid items from SWOT data (items with non-empty text)
 */
export const extractValidSwotItems = (data: SwotData) => {
  const validStrengths = data.strengths.filter(item => item.text && item.text.trim() !== '').map(item => item.text);
  const validWeaknesses = data.weaknesses.filter(item => item.text && item.text.trim() !== '').map(item => item.text);
  const validOpportunities = data.opportunities.filter(item => item.text && item.text.trim() !== '').map(item => item.text);
  const validThreats = data.threats.filter(item => item.text && item.text.trim() !== '').map(item => item.text);
  
  return { validStrengths, validWeaknesses, validOpportunities, validThreats };
};

/**
 * Check if SWOT data has content (at least one item with non-empty text)
 */
export const hasSwotContent = (data: SwotData): boolean => {
  return Object.values(data).some(category => 
    category.some(item => item.text && item.text.trim() !== '')
  );
};
