
import { useState, useEffect } from "react";
import { 
  checkUserToolCompletion, 
  loadDiagnosticCompletion,
  loadPhaseTestCompletion
} from "@/utils/storage";

export const useToolCompletionCheck = (userId: string | null) => {
  const [completedTools, setCompletedTools] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCompletedTools = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Starting tool completion check for userId:", userId);
        
        // Check regular tools saved in user_tools_data
        const toolsData = await checkUserToolCompletion(userId, [
          'swot_data',
          'checklist_data',
          'business_map_data',
          'puv_data',
          'mapa_equipe'
        ]);
        
        console.log("Regular tools completion data:", toolsData);
        
        // Check diagnostic completion (separate table)
        const diagnosticCompleted = await loadDiagnosticCompletion(userId);
        
        // Check phase test completion (separate table)
        const phaseTestCompleted = await loadPhaseTestCompletion(userId);
        
        const completionStatus = {
          ...toolsData,
          diagnostic_results: diagnosticCompleted,
          fase_results: phaseTestCompleted
        };
        
        console.log("Final completion status:", completionStatus);
        
        // Set the completed tools state
        setCompletedTools(completionStatus);
      } catch (error) {
        console.error("Error checking completed tools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCompletedTools();
  }, [userId]);

  return { completedTools, isLoading };
};
