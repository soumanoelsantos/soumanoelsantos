
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";

export const useLeadOperations = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const addLead = async (values: LeadFormValues) => {
    try {
      // Make sure all required fields are present
      if (!values.name || !values.email || !values.phone || !values.status) {
        console.error("Campos obrigatórios faltando:", values);
        throw new Error("Campos obrigatórios faltando");
      }
      
      console.log("Adicionando lead:", values);
      
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
        console.error("Erro ao inserir lead no Supabase:", error);
        throw error;
      }

      console.log("Lead adicionado com sucesso:", data);
      
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
      console.log("Atualizando lead:", id, values);
      
      // Get the current lead to check if status is changing
      const { data: currentLead, error: fetchError } = await supabase
        .from("leads")
        .select("status")
        .eq("id", id)
        .single();
      
      if (fetchError) {
        console.error("Erro ao buscar lead atual:", fetchError);
        throw fetchError;
      }
      
      const updateData: any = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
        status: values.status,
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
        console.error("Erro ao atualizar lead no Supabase:", error);
        throw error;
      }
      
      console.log("Lead atualizado com sucesso");
      
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
      console.log("Excluindo lead:", id);
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) {
        console.error("Erro ao excluir lead no Supabase:", error);
        throw error;
      }
      
      console.log("Lead excluído com sucesso");
      
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
      // Add more detailed logging to diagnose the issue
      console.log(`Iniciando atualização do status do lead ${id} para ${newStatus}`);
      
      // Validate input parameters
      if (!id) {
        console.error("ID do lead não fornecido");
        throw new Error("ID do lead não fornecido");
      }
      
      if (!newStatus) {
        console.error("Novo status não fornecido");
        throw new Error("Novo status não fornecido");
      }
      
      // Add timeout to prevent race conditions and allow for UI updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Log the full update operation
      console.log("Dados da atualização:", {
        id,
        newStatus,
        timestamp: new Date().toISOString()
      });
      
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: newStatus,
          status_changed_at: new Date().toISOString(), // Update timestamp when status changes
          updated_at: new Date().toISOString()  // Update the general updated_at timestamp as well
        })
        .eq("id", id);

      if (error) {
        console.error("Erro ao atualizar status do lead no Supabase:", error);
        throw error;
      }

      console.log("Status do lead atualizado com sucesso");
      
      // Refresh leads list to get updated data - with a small delay to ensure DB transaction completes
      await new Promise(resolve => setTimeout(resolve, 300));
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
