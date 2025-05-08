
import { useState, useEffect } from "react";
import { checkUserToolCompletion, loadDiagnosticCompletion, loadPhaseTestCompletion } from "@/utils/storage";

export const useCompletionPercentage = (userId: string | null) => {
  const [completionPercent, setCompletionPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateCompletionPercentage = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Check regular tools saved in user_tools_data
        const toolsData = await checkUserToolCompletion(userId, [
          'swot_data',
          'checklist_data',
          'business_map_data',
          'puv_data',
          'mapa_equipe'
        ]);
        
        // Check diagnostic completion (separate table)
        const diagnosticCompleted = await loadDiagnosticCompletion(userId);
        
        // Check phase test completion (separate table)
        const phaseTestCompleted = await loadPhaseTestCompletion(userId);
        
        const completed = [
          diagnosticCompleted,
          !!toolsData.swot_data,
          !!toolsData.checklist_data,
          phaseTestCompleted,
          !!toolsData.business_map_data,
          !!toolsData.puv_data,
          !!toolsData.mapa_equipe
        ].filter(Boolean).length;
        
        // 7 tools total
        const percent = Math.floor((completed / 7) * 100);
        setCompletionPercent(percent);
      } catch (error) {
        console.error("Error calculating completion percentage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateCompletionPercentage();
  }, [userId]);

  return { completionPercent, isLoading };
};
