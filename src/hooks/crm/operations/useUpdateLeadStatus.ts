
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_STATUSES } from "@/constants/crmConstants";

export const useUpdateLeadStatus = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      // Log detalhado para debugging
      console.log(`Starting lead status update: ${id} to ${newStatus} at ${new Date().toISOString()}`);
      
      // Validação de entrada com erros detalhados
      if (!id || typeof id !== 'string') {
        console.error("Invalid lead ID:", id);
        throw new Error("ID do lead inválido ou não fornecido");
      }
      
      if (!newStatus || typeof newStatus !== 'string') {
        console.error("Invalid new status:", newStatus);
        throw new Error("Novo status inválido ou não fornecido");
      }
      
      // Validar que o status é um dos status permitidos
      if (!LEAD_STATUSES.includes(newStatus)) {
        console.error("Invalid status value:", newStatus, "Available statuses:", LEAD_STATUSES);
        throw new Error(`Status '${newStatus}' não é válido. Valores permitidos: ${LEAD_STATUSES.join(', ')}`);
      }
      
      // Adicionar timeout para prevenir condições de corrida
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Primeiro verificar se o lead existe para evitar erros de "no row found"
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
        throw new Error(`Lead com ID ${id} não encontrado`);
      }
      
      console.log("Found lead, current status:", leadExists.status);
      
      // Se o status já estiver definido para o novo status, não há necessidade de atualizar
      if (leadExists.status === newStatus) {
        console.log("Lead already has the requested status, skipping update");
        return true;
      }
      
      // Atualizar com logs mais explícitos
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
      
      // Verificar se a atualização foi bem-sucedida
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
      
      // Atualizar a lista de leads com atraso para garantir que a transação do banco de dados seja concluída
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
