
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";
import { N8N_WEBHOOK_URL, createNewLeadPayload, sendWebhookNotification } from "@/utils/webhookUtils";

export const useAddLead = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();

  const addLead = async (values: LeadFormValues) => {
    try {
      // Make sure all required fields are present
      if (!values.name || !values.email || !values.phone || !values.status) {
        console.error("Missing required fields:", values);
        throw new Error("Campos obrigatórios não preenchidos");
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
      
      // If the lead is added with status "Novo", send a webhook notification
      if (data && data[0] && data[0].status === "Novo") {
        console.log("Sending webhook for new lead in 'Novo' status");
        const payload = createNewLeadPayload(data[0]);
        
        // Send webhook asynchronously to not block the UI
        sendWebhookNotification(
          N8N_WEBHOOK_URL,
          payload,
          "Lead enviado para N8N com sucesso"
        ).catch(err => {
          console.error("Erro assíncrono no webhook:", err);
        });
      }
      
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

  return { addLead };
};
