
import { useEffect } from "react";
import { useMapaEquipeState } from "@/hooks/useMapaEquipeState";
import { useMapaEquipeOperations } from "@/hooks/useMapaEquipeOperations";
import { useAuth } from "@/hooks/useAuth";

// Main hook that combines state and operations
export const useMapaEquipe = () => {
  const { isAuthenticated, userId } = useAuth();
  
  const {
    empresaNome,
    setEmpresaNome,
    colaboradores,
    setColaboradores,
    showPreview,
    setShowPreview,
    isLoading,
    setIsLoading,
    mapaId,
    setMapaId,
    addColaborador,
    removeColaborador,
    updateColaborador
  } = useMapaEquipeState();
  
  const {
    loadData,
    handlePreview,
    closePreview,
    resetForm,
    saveData
  } = useMapaEquipeOperations(
    empresaNome,
    colaboradores,
    mapaId,
    setMapaId,
    setEmpresaNome,
    setColaboradores,
    setShowPreview,
    setIsLoading
  );
  
  // Load saved data when component is mounted
  useEffect(() => {
    if (userId) {
      console.log("Loading mapa equipe data for user:", userId);
      loadData();
    }
  }, [userId, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return {
    empresaNome,
    setEmpresaNome,
    colaboradores,
    addColaborador,
    removeColaborador,
    updateColaborador,
    showPreview,
    handlePreview,
    closePreview,
    resetForm,
    isLoading,
    saveData
  };
};

// Re-export options for use in other components
export {
  niveisMaturidadeOptions,
  estilosLiderancaOptions,
  perfisComportamentaisOptions,
  potenciaisOptions
} from "@/hooks/useMapaEquipeOperations";
