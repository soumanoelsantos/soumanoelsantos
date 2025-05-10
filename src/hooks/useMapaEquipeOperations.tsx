
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useMapaEquipeValidation } from "@/hooks/useMapaEquipeValidation";
import { loadMapaEquipeData, saveMapaEquipeData, deleteMapaEquipeData } from "@/utils/storage";
import { Colaborador } from "@/types/mapaEquipe";

export const useMapaEquipeOperations = (
  empresaNome: string,
  colaboradores: Colaborador[],
  mapaId: string | null,
  setMapaId: (id: string | null) => void,
  setEmpresaNome: (name: string) => void,
  setColaboradores: (colaboradores: Colaborador[]) => void,
  setShowPreview: (show: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const { validateForm } = useMapaEquipeValidation();

  const loadData = async () => {
    if (!isAuthenticated || !userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Attempting to load mapa equipe data");
      const data = await loadMapaEquipeData(userId);
      
      if (data) {
        console.log("Loaded mapa equipe data:", data);
        setEmpresaNome(data.empresaNome || "");
        setColaboradores(data.colaboradores || []);
        
        toast({
          title: "Dados carregados",
          description: "Seus dados do Mapa da Equipe foram carregados com sucesso.",
        });
        
        // Auto-show preview if we already have data
        if (data.empresaNome && data.colaboradores && data.colaboradores.length > 0 && data.colaboradores[0].nome) {
          console.log("Auto-showing preview with loaded data");
          setShowPreview(true);
        }
      } else {
        console.log("No saved mapa equipe data found");
      }
    } catch (error) {
      console.error("Erro ao carregar dados do Mapa da Equipe:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados do Mapa da Equipe.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save data without showing preview
  const saveData = async () => {
    if (!isAuthenticated || !userId) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar o mapa da equipe.",
      });
      return false;
    }

    // Allow save even if just the company name and at least one collaborator with a name is set
    const hasMinimalData = empresaNome.trim() !== "" && 
      colaboradores.length > 0 && 
      colaboradores[0].nome.trim() !== "";
    
    if (hasMinimalData) {
      try {
        const data = {
          empresaNome,
          colaboradores
        };
        
        const result = await saveMapaEquipeData(userId, data);
        
        if (result.success) {
          if (result.id) setMapaId(result.id);
          
          console.log("Mapa equipe data saved successfully");
          return true;
        } else {
          throw new Error("Falha ao salvar dados");
        }
      } catch (error: any) {
        console.error("Erro ao salvar mapa da equipe:", error);
        return false;
      }
    }
    
    return false;
  };

  const handlePreview = async () => {
    if (!isAuthenticated || !userId) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar o mapa da equipe.",
      });
      return;
    }

    // Allow preview even if just the company name and at least one collaborator with a name is set
    const hasMinimalData = empresaNome.trim() !== "" && 
      colaboradores.length > 0 && 
      colaboradores[0].nome.trim() !== "";
    
    if (hasMinimalData) {
      try {
        setIsLoading(true);
        
        const data = {
          empresaNome,
          colaboradores
        };
        
        const result = await saveMapaEquipeData(userId, data);
        
        if (result.success) {
          if (result.id) setMapaId(result.id);
          
          toast({
            title: "Dados salvos",
            description: "Seus dados do Mapa da Equipe foram salvos com sucesso.",
          });
          
          setShowPreview(true);
        } else {
          throw new Error("Falha ao salvar dados");
        }
      } catch (error: any) {
        console.error("Erro ao salvar mapa da equipe:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: error.message || "Não foi possível salvar o mapa da equipe.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Dados incompletos",
        description: "Preencha pelo menos o nome da empresa e de um colaborador.",
      });
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const resetForm = async () => {
    if (userId) {
      try {
        setIsLoading(true);
        
        const success = await deleteMapaEquipeData(userId);
        
        if (success) {
          setMapaId(null);
          setEmpresaNome("");
          setColaboradores([{
            nome: "",
            nivelMaturidade: niveisMaturidadeOptions[0],
            estiloLideranca: estilosLiderancaOptions[0],
            perfilComportamental: perfisComportamentaisOptions[0],
            futuro: "",
            potencial: potenciaisOptions[0]
          }]);
          setShowPreview(false);
          
          toast({
            title: "Dados limpos",
            description: "O formulário foi resetado e os dados foram removidos.",
          });
        } else {
          throw new Error("Falha ao remover dados");
        }
      } catch (error: any) {
        console.error("Erro ao resetar formulário:", error);
        toast({
          variant: "destructive",
          title: "Erro ao limpar dados",
          description: error.message || "Não foi possível limpar os dados.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // If there's no saved data, just clear the form
      setEmpresaNome("");
      setColaboradores([{
        nome: "",
        nivelMaturidade: niveisMaturidadeOptions[0],
        estiloLideranca: estilosLiderancaOptions[0],
        perfilComportamental: perfisComportamentaisOptions[0],
        futuro: "",
        potencial: potenciaisOptions[0]
      }]);
      setShowPreview(false);
    }
  };

  return {
    loadData,
    saveData,
    handlePreview,
    closePreview,
    resetForm
  };
};

// Re-export the options for use in other components
import { 
  niveisMaturidadeOptions, 
  estilosLiderancaOptions, 
  perfisComportamentaisOptions, 
  potenciaisOptions 
} from "@/constants/mapaEquipeConstants";

export { 
  niveisMaturidadeOptions, 
  estilosLiderancaOptions, 
  perfisComportamentaisOptions, 
  potenciaisOptions 
};
