
import { useState } from "react";
import { Colaborador } from "@/types/mapaEquipe";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMapaEquipeValidation } from "@/hooks/useMapaEquipeValidation";
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
  const { userEmail } = useAuth();
  const { validateForm } = useMapaEquipeValidation();
  
  // Gerar uma chave única para armazenar os dados do usuário
  const storageKey = `mapaEquipe_${userEmail || "guest"}`;
  
  // Estado local para trabalhar sem depender do localStorage durante a edição
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
  
  // Utilizar o hook personalizado de localStorage
  const [storedData, setStoredData, removeStoredData] = useLocalStorage(storageKey, {
    empresaNome: "",
    colaboradores: [] as Colaborador[]
  });
  
  // Carregar dados salvos quando o componente for montado
  useState(() => {
    if (userEmail && storedData) {
      if (storedData.empresaNome) setEmpresaNome(storedData.empresaNome);
      if (storedData.colaboradores && storedData.colaboradores.length > 0) {
        setColaboradores(storedData.colaboradores);
      }
      
      toast({
        title: "Dados carregados",
        description: "Seus dados do Mapa da Equipe foram carregados com sucesso.",
      });
    }
  });

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

  const handlePreview = () => {
    if (validateForm(empresaNome, colaboradores)) {
      // Explicitamente salvar dados antes de mostrar a visualização
      if (userEmail) {
        const dataToSave = {
          empresaNome,
          colaboradores,
        };
        setStoredData(dataToSave);
        
        toast({
          title: "Dados salvos",
          description: "Seus dados do Mapa da Equipe foram salvos com sucesso.",
        });
      }
      
      setShowPreview(true);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const resetForm = () => {
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
    
    // Também remove dados do localStorage
    removeStoredData();
    
    toast({
      title: "Dados limpos",
      description: "O formulário foi resetado e os dados foram removidos.",
    });
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
    resetForm
  };
};
