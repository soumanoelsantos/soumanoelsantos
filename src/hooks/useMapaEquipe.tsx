
import { useState } from "react";
import { 
  Colaborador,
  MapaEquipeData, 
  NivelMaturidade, 
  EstiloLideranca, 
  PerfilComportamental,
  Potencial
} from "@/types/mapaEquipe";
import { useToast } from "@/hooks/use-toast";

// Opções para os dropdowns
export const niveisMaturidadeOptions: NivelMaturidade[] = [
  "M1 (Bebê)",
  "M2 (Criança)",
  "M3 (Adolescente)",
  "M4 (Adulto)"
];

export const estilosLiderancaOptions: EstiloLideranca[] = [
  "E1 (Direção)",
  "E2 (Treinamento)",
  "E3 (Apoio)",
  "E4 (Delegação)"
];

export const perfisComportamentaisOptions: PerfilComportamental[] = [
  "Executor",
  "Comunicador",
  "Analista",
  "Planejador"
];

export const potenciaisOptions: Potencial[] = [
  "Sócio",
  "Diretor",
  "Gestor",
  "Supervisor/Coordenador",
  "Extraordinário",
  "Stand by"
];

// Hook personalizado
export const useMapaEquipe = () => {
  const { toast } = useToast();
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

  const validateForm = (): boolean => {
    // Verifica se o nome da empresa foi preenchido
    if (!empresaNome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome da empresa.",
        variant: "destructive"
      });
      return false;
    }

    // Verifica se todos os colaboradores têm nome
    for (let i = 0; i < colaboradores.length; i++) {
      if (!colaboradores[i].nome.trim()) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o nome do colaborador ${i + 1}.`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handlePreview = () => {
    if (validateForm()) {
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
