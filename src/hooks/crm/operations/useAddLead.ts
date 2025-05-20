
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";
import { useState } from "react";

export const useAddLead = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string | null>(
    localStorage.getItem("crm_webhook_url")
  );
  
  // Função para atualizar o webhook URL
  const updateWebhookUrl = (url: string) => {
    localStorage.setItem("crm_webhook_url", url);
    setWebhookUrl(url);
    toast({
      title: "Webhook configurado",
      description: "URL do webhook foi salva com sucesso",
    });
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
      if (values.status === "Novo" && webhookUrl && webhookUrl.trim() !== "") {
        try {
          console.log("Enviando notificação para webhook:", webhookUrl);
          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              leadData: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                notes: values.notes || "",
                status: values.status,
                source: "manual",
                createdAt: new Date().toISOString()
              },
              message: `Novo lead recebido: ${values.name}`,
              type: "new_lead"
            }),
          });
          console.log("Notificação webhook enviada com sucesso");
        } catch (webhookError) {
          console.error("Erro ao enviar notificação para webhook:", webhookError);
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
