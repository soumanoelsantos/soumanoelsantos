
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";

export const useLeadOperations = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const addLead = async (values: LeadFormValues) => {
    try {
      // Make sure all required fields are present
      if (!values.name || !values.email || !values.phone || !values.status) {
        console.error("Missing required fields:", values);
        throw new Error("Missing required fields");
      }
      
      console.log("Adding lead:", values);
      
      const { data, error } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes || null,
        status: values.status,
        source: "manual",
        status_changed_at: new Date().toISOString() // Add initial status timestamp
      }).select();

      if (error) {
        console.error("Error inserting lead into Supabase:", error);
        throw error;
      }

      console.log("Lead added successfully:", data);
      
      // Refresh leads list
      await fetchLeads();
      
      toast({
        title: "Lead criado",
        description: "Lead criado com sucesso",
      });

      return true;
    } catch (error: any) {
      console.error("Error creating lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar lead",
        description: error.message || "Não foi possível criar o lead. Tente novamente.",
      });
      return false;
    }
  };

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

  return {
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };
};
