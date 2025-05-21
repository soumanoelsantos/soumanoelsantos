
import { LeadData } from "@/types/crm";
import { toast } from "sonner";

interface WebhookPayload {
  leadData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
    status: string;
    previousStatus?: string;
    source?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  message: string;
  type: string;
}

/**
 * Sends a notification to the configured webhook URL
 * Uses no-cors mode to avoid CORS issues, but this means we can't check response status
 */
export const sendWebhookNotification = async (
  webhookUrl: string | null,
  payload: WebhookPayload,
  successMessage?: string
): Promise<boolean> => {
  if (!webhookUrl || webhookUrl.trim() === "") {
    console.log("Webhook URL não configurada, pulando notificação");
    return false;
  }

  try {
    console.log("Enviando notificação para webhook:", webhookUrl);
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
    
    if (successMessage) {
      toast({
        title: "Status atualizado",
        description: successMessage,
      });
    }
    
    return true;
  } catch (webhookError) {
    console.error("Erro ao enviar notificação para webhook:", webhookError);
    
    toast({
      variant: "destructive",
      title: "Webhook falhou",
      description: "A notificação webhook falhou. Verifique a URL do webhook.",
    });
    
    return false;
  }
};

/**
 * Creates a webhook payload for a new lead
 */
export const createNewLeadPayload = (lead: LeadData | any): WebhookPayload => {
  return {
    leadData: {
      id: lead?.id || "unknown",
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      notes: lead.notes || "",
      status: lead.status,
      source: lead.source || "manual",
      createdAt: new Date().toISOString()
    },
    message: `Novo lead recebido: ${lead.name}`,
    type: "new_lead"
  };
};

/**
 * Creates a webhook payload for a status update
 */
export const createStatusUpdatePayload = (
  lead: LeadData, 
  newStatus: string, 
  previousStatus: string
): WebhookPayload => {
  return {
    leadData: {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      notes: lead.notes || "",
      status: newStatus,
      previousStatus: previousStatus,
      updatedAt: new Date().toISOString()
    },
    message: `Lead movido para ${newStatus}: ${lead.name}`,
    type: "status_update"
  };
};
