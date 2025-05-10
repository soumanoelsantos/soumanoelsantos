
import { useState, useEffect } from "react";
import { 
  checkUserToolCompletion,
  loadDiagnosticCompletion,
  loadPhaseTestCompletion,
  loadChecklistData,
  loadMapaEquipeData
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
        
        // Double-check checklist data directly if the first check didn't find it
        let checklistCompleted = toolsData.checklist_data;
        if (!checklistCompleted) {
          console.log("Double-checking checklist data directly");
          const checklistData = await loadChecklistData(userId);
          checklistCompleted = !!checklistData;
          console.log("Direct checklist check result:", checklistCompleted);
        }
        
        // Check mapa_equipe data directly as well
        let mapaEquipeCompleted = toolsData.mapa_equipe;
        if (!mapaEquipeCompleted) {
          console.log("Double-checking mapa_equipe data directly");
          const mapaEquipeData = await loadMapaEquipeData(userId);
          // Consider it completed if there's data and at least one collaborator with a name
          mapaEquipeCompleted = !!mapaEquipeData && 
            !!mapaEquipeData.colaboradores && 
            mapaEquipeData.colaboradores.length > 0 &&
            !!mapaEquipeData.colaboradores[0].nome;
          console.log("Direct mapa_equipe check result:", mapaEquipeCompleted, mapaEquipeData);
        }
        
        // Check diagnostic completion (separate table)
        const diagnosticCompleted = await loadDiagnosticCompletion(userId);
        
        // Check phase test completion (separate table)
        const phaseTestCompleted = await loadPhaseTestCompletion(userId);
        
        const completionStatus = {
          ...toolsData,
          checklist_data: checklistCompleted,  // Ensure we use the direct check result
          mapa_equipe: mapaEquipeCompleted,    // Ensure we use the direct check result
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
