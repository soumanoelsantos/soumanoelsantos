
import { Colaborador } from "@/types/mapaEquipe";
import { useToast } from "@/hooks/use-toast";

export const useMapaEquipeValidation = () => {
  const { toast } = useToast();
  
  const validateForm = (empresaNome: string, colaboradores: Colaborador[]): boolean => {
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

  return { validateForm };
};
