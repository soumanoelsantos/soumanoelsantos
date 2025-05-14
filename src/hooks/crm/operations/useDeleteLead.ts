
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useDeleteLead = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const deleteLead = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este lead?")) return false;

    try {
      console.log("Deleting lead:", id);
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) {
        console.error("Error deleting lead in Supabase:", error);
        throw error;
      }
      
      console.log("Lead deleted successfully");
      
      // Refresh leads list after deletion
      await fetchLeads();

      toast({
        title: "Lead excluído",
        description: "Lead excluído com sucesso",
      });

      return true;
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir lead",
        description: "Não foi possível excluir o lead. Tente novamente.",
      });
      return false;
    }
  };

  return { deleteLead };
};
