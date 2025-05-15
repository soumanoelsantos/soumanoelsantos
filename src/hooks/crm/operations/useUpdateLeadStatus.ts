
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_STATUSES } from "@/constants/crmConstants";

export const useUpdateLeadStatus = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      // More detailed logging for debugging
      console.log(`Starting lead status update - ID: ${id}, New Status: ${newStatus}`);
      
      if (!id) {
        console.error("Invalid lead ID:", id);
        throw new Error("ID do lead não fornecido");
      }
      
      if (!newStatus) {
        console.error("Invalid status:", newStatus);
        throw new Error("Novo status não fornecido");
      }
      
      // Normalize status case for validation (case-insensitive comparison)
      const normalizedNewStatus = newStatus.trim();
      const validStatus = LEAD_STATUSES.find(
        status => status === normalizedNewStatus
      );
      
      if (!validStatus) {
        console.error(`Status inválido "${normalizedNewStatus}". Valores válidos: ${LEAD_STATUSES.join(', ')}`);
        toast({
          variant: "destructive",
          title: "Status inválido",
          description: `Status '${normalizedNewStatus}' não é válido. Valores permitidos: ${LEAD_STATUSES.join(', ')}`,
        });
        throw new Error(`Status '${normalizedNewStatus}' não é válido`);
      }

      // First check if the lead exists
      const { data: existingLead, error: checkError } = await supabase
        .from("leads")
        .select("id, status")
        .eq("id", id)
        .single();
      
      if (checkError) {
        console.error("Error checking lead:", checkError.message);
        throw new Error(`Erro ao verificar lead: ${checkError.message}`);
      }
      
      if (!existingLead) {
        console.error("Lead not found:", id);
        throw new Error(`Lead com ID ${id} não encontrado`);
      }
      
      console.log("Found lead, current status:", existingLead.status, "New status:", validStatus);
      
      // If status already set to new status, no need to update
      if (existingLead.status === validStatus) {
        console.log("Lead already has the requested status, skipping update");
        return true;
      }
      
      // Perform the update with the status_changed_at field
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: validStatus,
          status_changed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) {
        console.error("Supabase update error:", error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar status",
          description: error.message,
        });
        throw error;
      }

      console.log("Lead status updated successfully to:", validStatus);
      
      // Return success
      return true;
    } catch (error: any) {
      console.error("Error in updateLeadStatus:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Ocorreu um erro ao atualizar o status do lead",
      });
      return false;
    }
  };

  return { updateLeadStatus };
};
