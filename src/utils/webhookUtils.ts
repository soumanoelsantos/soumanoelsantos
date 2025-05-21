
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
 * Added timeout and retries for more reliability
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

  // Maximum number of retry attempts
  const MAX_RETRIES = 2;
  let retryCount = 0;
  
  const attemptSend = async (): Promise<boolean> => {
    try {
      console.log(`Tentativa ${retryCount + 1} de enviar notificação para webhook:`, webhookUrl);
      console.log("Payload do webhook:", JSON.stringify(payload, null, 2));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Usando no-cors para evitar problemas de CORS
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log("Notificação webhook enviada com modo no-cors");
      
      if (successMessage) {
        toast.success("Webhook enviado", {
          description: successMessage,
        });
      }
      
      return true;
    } catch (webhookError) {
      console.error(`Erro na tentativa ${retryCount + 1} ao enviar notificação:`, webhookError);
      
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`Tentando novamente... (${retryCount}/${MAX_RETRIES})`);
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        return attemptSend();
      }
      
      // All retries failed
      console.error("Todas as tentativas de enviar webhook falharam");
      toast.error("Webhook falhou", {
        description: "A notificação webhook falhou após várias tentativas. O endpoint pode estar indisponível.",
      });
      
      return false;
    }
  };
  
  return await attemptSend();
};

/**
 * Creates a webhook payload for a new lead
 */
export const createNewLeadPayload = (lead: Partial<LeadData>): WebhookPayload => {
  return {
    leadData: {
      id: lead?.id || "unknown",
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      notes: lead.notes || "",
      status: lead.status || "Novo",
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
  lead: Partial<LeadData>, 
  newStatus: string, 
  previousStatus: string
): WebhookPayload => {
  return {
    leadData: {
      id: lead.id || "",
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      notes: lead.notes || "",
      status: newStatus,
      previousStatus: previousStatus,
      updatedAt: new Date().toISOString()
    },
    message: `Lead movido para ${newStatus}: ${lead.name}`,
    type: "status_update"
  };
};

// N8N webhook URL
export const N8N_WEBHOOK_URL = "https://sou-manoel-santos-n8n-c0d228-95-217-5-98.traefik.me/webhook-test/8b3643ea-1470-4c4f-b174-b2d0361d86f6";
