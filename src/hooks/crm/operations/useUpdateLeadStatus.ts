
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_STATUSES } from "@/constants/crmConstants";

export const useUpdateLeadStatus = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      // Enhanced logging for debugging
      console.log(`Starting lead status update: ${id} to ${newStatus} at ${new Date().toISOString()}`);
      
      // Input validation with detailed errors
      if (!id || typeof id !== 'string') {
        console.error("Invalid lead ID:", id);
        throw new Error("ID do lead inválido ou não fornecido");
      }
      
      if (!newStatus || typeof newStatus !== 'string') {
        console.error("Invalid new status:", newStatus);
        throw new Error("Novo status inválido ou não fornecido");
      }
      
      // Validate that the status is one of the allowed statuses
      if (!LEAD_STATUSES.includes(newStatus)) {
        console.error("Invalid status value:", newStatus);
        throw new Error(`Status '${newStatus}' não é válido. Valores permitidos: ${LEAD_STATUSES.join(', ')}`);
      }
      
      // Add timeout to prevent race conditions
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // First verify the lead exists to avoid "no row found" errors
      const { data: leadExists, error: checkError } = await supabase
        .from("leads")
        .select("id, status")
        .eq("id", id)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking if lead exists:", checkError);
        throw checkError;
      }
      
      if (!leadExists) {
        console.error("Lead not found:", id);
        throw new Error(`Lead with ID ${id} not found`);
      }
      
      console.log("Found lead, current status:", leadExists.status);
      
      // If the status is already set to the new status, no need to update
      if (leadExists.status === newStatus) {
        console.log("Lead already has the requested status, skipping update");
        return true;
      }
      
      // Update with more explicit logging
      console.log("Updating lead status with data:", {
        id,
        newStatus,
        timestamp: new Date().toISOString()
      });
      
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: newStatus,
          status_changed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating lead status in Supabase:", error);
        throw error;
      }

      console.log("Lead status updated successfully");
      
      // Verify the update was successful
      const { data: verifyUpdate, error: verifyError } = await supabase
        .from("leads")
        .select("status")
        .eq("id", id)
        .single();
      
      if (verifyError) {
        console.error("Error verifying lead update:", verifyError);
      } else {
        console.log("Verified lead status is now:", verifyUpdate.status);
      }
      
      // Refresh leads list with delay to ensure DB transaction completes
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchLeads();

      return true;
    } catch (error: any) {
      console.error("Error updating lead status:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do lead. Tente novamente.",
      });
      return false;
    }
  };

  return { updateLeadStatus };
};
