
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useMapaEquipeValidation } from "@/hooks/useMapaEquipeValidation";
import { loadMapaEquipeData, saveMapaEquipeData, deleteMapaEquipeData } from "@/utils/storage";
import { Colaborador } from "@/types/mapaEquipe";
import { supabase } from "@/integrations/supabase/client";

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
      const data = await loadMapaEquipeData(userId);
      
      if (data) {
        setEmpresaNome(data.empresaNome);
        setColaboradores(data.colaboradores);
        
        // Need to query for the mapa ID separately as it's not included in the MapaEquipeData
        const { data: mapaData } = await supabase
          .from('mapa_equipe')
          .select('id')
          .eq('user_id', userId)
          .single();
          
        if (mapaData) {
          setMapaId(mapaData.id);
        }
        
        toast({
          title: "Dados carregados",
          description: "Seus dados do Mapa da Equipe foram carregados com sucesso.",
        });
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

  const handlePreview = async () => {
    if (!isAuthenticated || !userId) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar o mapa da equipe.",
      });
      return;
    }

    if (validateForm(empresaNome, colaboradores)) {
      try {
        setIsLoading(true);
        
        const result = await saveMapaEquipeData(
          userId,
          mapaId,
          empresaNome,
          colaboradores
        );
        
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
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const resetForm = async () => {
    if (mapaId && userId) {
      try {
        setIsLoading(true);
        
        const success = await deleteMapaEquipeData(mapaId);
        
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
