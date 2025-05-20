
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export const useUpdateLeadStatus = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Carregar webhook URL do localStorage
    const savedUrl = localStorage.getItem("crm_webhook_url");
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

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
      
      // First check if the lead exists
      const { data: existingLead, error: checkError } = await supabase
        .from("leads")
        .select("id, status, name, email, phone, notes")
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
      
      console.log("Found lead, current status:", existingLead.status, "New status:", newStatus);
      
      // If status already set to new status, no need to update
      if (existingLead.status === newStatus) {
        console.log("Lead already has the requested status, skipping update");
        return true;
      }
      
      // Perform the update with the status_changed_at field
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: newStatus,
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

      console.log("Lead status updated successfully to:", newStatus);
      
      // Se o status foi alterado para "Novo" e temos um webhook URL, notificar
      if (newStatus === "Novo" && webhookUrl && webhookUrl.trim() !== "") {
        try {
          console.log("Enviando notificação para webhook:", webhookUrl);
          
          // Melhorar a estrutura dos dados enviados para o webhook
          const payload = {
            leadData: {
              id: existingLead.id,
              name: existingLead.name,
              email: existingLead.email,
              phone: existingLead.phone,
              notes: existingLead.notes || "",
              status: newStatus,
              previousStatus: existingLead.status,
              updatedAt: new Date().toISOString()
            },
            message: `Lead movido para Novo: ${existingLead.name}`,
            type: "status_update_to_new"
          };
          
          console.log("Payload do webhook:", JSON.stringify(payload, null, 2));
          
          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors", // Usando no-cors para evitar problemas de CORS
            body: JSON.stringify(payload),
          });
          
          console.log("Notificação webhook enviada com modo no-cors");
          
          toast({
            title: "Status atualizado",
            description: `O lead foi movido para ${newStatus} e o webhook foi notificado.`,
          });
          
        } catch (webhookError) {
          console.error("Erro ao enviar notificação para webhook:", webhookError);
          toast({
            variant: "destructive",
            title: "Status atualizado, mas webhook falhou",
            description: "O status foi atualizado, mas a notificação webhook falhou. Verifique a URL do webhook.",
          });
        }
      } else {
        toast({
          title: "Status atualizado",
          description: `O lead foi movido para ${newStatus}.`,
        });
      }
      
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
