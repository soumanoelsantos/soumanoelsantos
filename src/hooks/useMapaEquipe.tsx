
import { useState, useEffect } from "react";
import { 
  Colaborador,
  MapaEquipeData, 
  NivelMaturidade, 
  EstiloLideranca, 
  PerfilComportamental,
  Potencial
} from "@/types/mapaEquipe";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

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
  const { userEmail } = useAuth();
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
  
  // Gerar uma chave única para armazenar os dados do usuário
  const storageKey = `mapaEquipe_${userEmail || "guest"}`;

  // Carregar dados salvos do localStorage quando o componente for montado
  useEffect(() => {
    if (userEmail) {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.empresaNome) setEmpresaNome(parsedData.empresaNome);
          if (parsedData.colaboradores && parsedData.colaboradores.length > 0) {
            setColaboradores(parsedData.colaboradores);
          }
          toast({
            title: "Dados carregados",
            description: "Seus dados do Mapa da Equipe foram carregados com sucesso.",
          });
        } catch (error) {
          console.error("Erro ao carregar dados do mapa da equipe:", error);
        }
      }
    }
  }, [userEmail, storageKey, toast]);

  // Salvar dados no localStorage sempre que houver alterações
  useEffect(() => {
    if (userEmail && (empresaNome !== "" || colaboradores.length > 1 || colaboradores[0].nome !== "")) {
      const dataToSave = {
        empresaNome,
        colaboradores,
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
  }, [empresaNome, colaboradores, userEmail, storageKey]);

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
      // Explicitly save data before showing preview
      if (userEmail) {
        const dataToSave = {
          empresaNome,
          colaboradores,
        };
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        
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
    localStorage.removeItem(storageKey);
    
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
