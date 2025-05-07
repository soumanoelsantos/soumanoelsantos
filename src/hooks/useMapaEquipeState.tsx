
import { useState } from "react";
import { Colaborador } from "@/types/mapaEquipe";
import { 
  niveisMaturidadeOptions, 
  estilosLiderancaOptions, 
  perfisComportamentaisOptions, 
  potenciaisOptions 
} from "@/constants/mapaEquipeConstants";

export const useMapaEquipeState = () => {
  // Local state for editing
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
      return false; // Operation not allowed, need to have at least one collaborator
    }
    
    const newColaboradores = [...colaboradores];
    newColaboradores.splice(index, 1);
    setColaboradores(newColaboradores);
    return true; // Operation successful
  };

  const updateColaborador = (index: number, field: keyof Colaborador, value: string) => {
    const newColaboradores = [...colaboradores];
    newColaboradores[index] = { ...newColaboradores[index], [field]: value };
    setColaboradores(newColaboradores);
  };
  
  return {
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
  };
};
