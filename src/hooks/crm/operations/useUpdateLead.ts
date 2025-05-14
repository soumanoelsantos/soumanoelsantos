
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";

export const useUpdateLead = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const updateLead = async (id: string, values: LeadFormValues) => {
    try {
      console.log("Updating lead:", id, values);
      
      // Get the current lead to check if status is changing
      const { data: currentLead, error: fetchError } = await supabase
        .from("leads")
        .select("status")
        .eq("id", id)
        .single();
      
      if (fetchError) {
        console.error("Error fetching current lead:", fetchError);
        throw fetchError;
      }
      
      const updateData: any = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
        status: values.status,
        updated_at: new Date().toISOString()
      };
      
      // If status is changing, update the status_changed_at timestamp
      if (currentLead && currentLead.status !== values.status) {
        updateData.status_changed_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from("leads")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating lead in Supabase:", error);
        throw error;
      }
      
      console.log("Lead updated successfully");
      
      // Refresh leads list after update
      await fetchLeads();

      toast({
        title: "Lead atualizado",
        description: "Lead atualizado com sucesso",
      });

      return true;
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar lead",
        description: "Não foi possível atualizar o lead. Tente novamente.",
      });
      return false;
    }
  };

  return { updateLead };
};
