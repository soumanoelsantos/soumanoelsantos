
import { AdminModule } from "@/types/admin";

export const useAdminModules = () => {
  // Default modules for reference
  const modules: AdminModule[] = [
    { id: 0, title: "Ferramentas", description: "Ferramentas e utilitários" }
  ];

  return {
    modules
  };
};
