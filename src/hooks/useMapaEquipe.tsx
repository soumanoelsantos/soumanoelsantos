
import { useState, useEffect } from "react";
import { Colaborador, MapaEquipeData } from "@/types/mapaEquipe";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useMapaEquipeValidation } from "@/hooks/useMapaEquipeValidation";
import { loadMapaEquipeData, saveMapaEquipeData, deleteMapaEquipeData } from "@/utils/storage";
import { supabase } from "@/integrations/supabase/client";
import { 
  niveisMaturidadeOptions, 
  estilosLiderancaOptions, 
  perfisComportamentaisOptions, 
  potenciaisOptions 
} from "@/constants/mapaEquipeConstants";

// Exportar as opções para uso em outros componentes
export { 
  niveisMaturidadeOptions, 
  estilosLiderancaOptions, 
  perfisComportamentaisOptions, 
  potenciaisOptions 
};

// Hook personalizado
export const useMapaEquipe = () => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const { validateForm } = useMapaEquipeValidation();
  
  // Estado local para trabalhar durante a edição
  const [empresaNome, setEmpresaNome] = useState<string>("");
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([
    {
      nome: "",
      nivelMaturidade: niveisMaturidadeOptions[0],
      estiloLideranca: estilosLiderancaOptions[0],
      perfilComportamental: perfisComportamentaisOptions[0],
      futuro: "",
      potencial: potenciaisOptions[0]
    }
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapaId, setMapaId] = useState<string | null>(null);
  
  // Carregar dados salvos quando o componente for montado
  useEffect(() => {
    const loadMapaEquipe = async () => {
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

    loadMapaEquipe();
  }, [userId, isAuthenticated, toast]);

  const addColaborador = () => {
    setColaboradores([...colaboradores, {
      nome: "",
      nivelMaturidade: niveisMaturidadeOptions[0],
      estiloLideranca: estilosLiderancaOptions[0],
      perfilComportamental: perfisComportamentaisOptions[0],
      futuro: "",
      potencial: potenciaisOptions[0]
    }]);
  };

  const removeColaborador = (index: number) => {
    if (colaboradores.length === 1) {
      toast({
        title: "Aviso",
        description: "O mapa precisa ter pelo menos um colaborador.",
        variant: "default"
      });
      return;
    }
    
    const newColaboradores = [...colaboradores];
    newColaboradores.splice(index, 1);
    setColaboradores(newColaboradores);
  };

  const updateColaborador = (index: number, field: keyof Colaborador, value: string) => {
    const newColaboradores = [...colaboradores];
    newColaboradores[index] = { ...newColaboradores[index], [field]: value };
    setColaboradores(newColaboradores);
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
      // Se não houver dados salvos, apenas limpe o formulário
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
    isLoading
  };
};
