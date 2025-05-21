
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";
import { sendWebhookNotification, createNewLeadPayload } from "@/utils/webhookUtils";
import { useState, useEffect } from "react";

export const useAddLead = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string | null>(
    localStorage.getItem("crm_webhook_url")
  );
  
  // Função para atualizar o webhook URL
  const updateWebhookUrl = (url: string) => {
    localStorage.setItem("crm_webhook_url", url);
    setWebhookUrl(url);
  };

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
      
      // Se o status for "Novo" e tivermos um webhook configurado, enviar os dados para o webhook
      if (values.status === "Novo" && data && data[0]) {
        try {
          const payload = createNewLeadPayload(data[0]);
          await sendWebhookNotification(webhookUrl, payload);
        } catch (webhookError) {
          console.error("Erro ao enviar notificação para webhook:", webhookError);
          // Notificar o usuário que o webhook falhou, mas o lead foi criado
          toast({
            variant: "destructive", 
            title: "Lead criado, mas webhook falhou",
            description: "O lead foi criado, mas a notificação webhook falhou. Verifique a URL do webhook.",
          });
          // Não impedir a criação do lead se o webhook falhar
        }
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

  return { addLead, webhookUrl, updateWebhookUrl };
};
