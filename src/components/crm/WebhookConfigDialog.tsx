
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import WebhookUrlInput from "./webhook/WebhookUrlInput";
import WebhookTestStatus from "./webhook/WebhookTestStatus";
import WebhookPayloadExample from "./webhook/WebhookPayloadExample";
import WebhookDocumentation from "./webhook/WebhookDocumentation";
import WebhookDialogFooter from "./webhook/WebhookDialogFooter";

interface WebhookConfigDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (url: string) => void;
  currentUrl: string | null;
}

const WebhookConfigDialog: React.FC<WebhookConfigDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  currentUrl,
}) => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "sent" | "error">("idle");
  const { toast } = useToast();

  useEffect(() => {
    if (currentUrl) {
      setWebhookUrl(currentUrl);
    }
  }, [currentUrl]);

  useEffect(() => {
    // Reset status when URL changes or dialog opens/closes
    setTestStatus("idle");
  }, [webhookUrl, isOpen]);

  const validateUrl = (url: string): boolean => {
    if (url === "") return true;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWebhookUrl(url);
    if (url === "" || validateUrl(url)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  };

  const handleSave = () => {
    if (webhookUrl === "" || validateUrl(webhookUrl)) {
      onSave(webhookUrl);
      onOpenChange(false);
      toast({
        title: "Webhook configurado",
        description: webhookUrl ? "URL do webhook foi salva com sucesso" : "Webhook desativado",
      });
    } else {
      setIsValidUrl(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl || !validateUrl(webhookUrl)) {
      setIsValidUrl(false);
      return;
    }

    setIsTestingWebhook(true);
    setTestStatus("idle");
    console.log("Testando webhook:", webhookUrl);

    try {
      // Criando o payload de teste
      const testPayload = {
        leadData: {
          id: "test-id",
          name: "Test Lead",
          email: "test@example.com",
          phone: "123456789",
          notes: "Teste de webhook",
          status: "Novo",
          source: "webhook_test",
          createdAt: new Date().toISOString()
        },
        message: "Teste de webhook - CRM",
        type: "webhook_test"
      };
      
      console.log("Enviando payload:", JSON.stringify(testPayload, null, 2));
      
      // Use no-cors mode to bypass CORS issues
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Importante para evitar erros de CORS
        body: JSON.stringify(testPayload),
      });

      // Como estamos usando no-cors, não podemos verificar o status da resposta
      setTestStatus("sent");
      toast({
        title: "Solicitação enviada",
        description: "O teste foi enviado ao webhook. Verifique o N8N para confirmar se foi recebido.",
      });
      
      console.log("Teste de webhook enviado com modo no-cors");
    } catch (error) {
      console.error("Erro ao testar webhook:", error);
      setTestStatus("error");
      
      toast({
        title: "Erro ao testar webhook",
        description: "Não foi possível enviar o teste. Verifique o console para detalhes.",
        variant: "destructive"
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurar Webhook</DialogTitle>
          <DialogDescription>
            Configure a URL do webhook para receber notificações quando novos leads forem adicionados.
            Esta integração pode ser usada com N8N, Revolution API, ou qualquer outro serviço que aceite webhooks.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <WebhookUrlInput 
            webhookUrl={webhookUrl}
            onChange={handleUrlChange}
            isValid={isValidUrl}
          />
          
          <WebhookTestStatus status={testStatus} />
          <WebhookPayloadExample />
          <WebhookDocumentation />
        </div>

        <WebhookDialogFooter
          onTest={handleTestWebhook}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
          isTestingWebhook={isTestingWebhook}
          isTestDisabled={!webhookUrl || !isValidUrl}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WebhookConfigDialog;
