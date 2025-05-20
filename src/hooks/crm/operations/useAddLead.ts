
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormValues } from "@/types/crm";
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
          
          // Modificado: Melhorar a estrutura dos dados enviados para o webhook e garantir
          // que os dados estejam em um formato que o n8n ou Revolution API esperariam
          const payload = {
            leadData: {
              id: data && data[0] ? data[0].id : "unknown",
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
          };
          
          console.log("Payload do webhook:", JSON.stringify(payload, null, 2));
          
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          
          const responseData = await response.text();
          console.log("Resposta do webhook:", response.status, responseData);
          
          if (!response.ok) {
            throw new Error(`Erro no envio do webhook: ${response.status} ${responseData}`);
          }
          
          console.log("Notificação webhook enviada com sucesso");
        } catch (webhookError) {
          console.error("Erro ao enviar notificação para webhook:", webhookError);
          // Notificar o usuário que o webhook falhou, mas o lead foi criado
          toast({
            variant: "warning",
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
