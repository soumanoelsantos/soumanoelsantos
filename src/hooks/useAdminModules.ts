
import { AdminModule } from "@/types/admin";

export const useAdminModules = () => {
  // Módulos fixos para referência
  const modules: AdminModule[] = [
    { id: 0, title: "Ferramentas", description: "Ferramentas e utilitários" },
    { id: 1, title: "Módulo 1 - Diagnóstico e Estratégia", description: "Diagnóstico e Estratégia" },
    { id: 2, title: "Módulo 2 - Sistema de Vendas", description: "Sistema de Vendas" },
    { id: 3, title: "Módulo 3 - Marketing Digital", description: "Marketing Digital" },
    { id: 4, title: "Módulo 4 - Gestão e Escalabilidade", description: "Gestão e Escalabilidade" }
  ];

  return {
    modules
  };
};
