
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [testError, setTestError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUrl) {
      setWebhookUrl(currentUrl);
    }
  }, [currentUrl]);

  useEffect(() => {
    // Reset error when URL changes
    setTestError(null);
  }, [webhookUrl]);

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
    setTestError(null);
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
      toast({
        title: "Solicitação enviada",
        description: "O teste foi enviado ao webhook. Verifique o N8N para confirmar se foi recebido.",
        variant: "default"
      });
      
      console.log("Teste de webhook enviado com modo no-cors");
    } catch (error) {
      console.error("Erro ao testar webhook:", error);
      
      // Store the error message for display in the UI
      setTestError(error instanceof Error ? error.message : 'Erro desconhecido ao enviar webhook');
      
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
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="webhook-url">URL do Webhook</Label>
            <Input
              id="webhook-url"
              value={webhookUrl}
              onChange={handleUrlChange}
              placeholder="https://seu-webhook-url.com"
              className={`w-full ${!isValidUrl ? "border-red-500" : ""}`}
            />
            {!isValidUrl && (
              <div className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Insira uma URL válida
              </div>
            )}
          </div>
          
          {testError && (
            <div className="bg-red-50 p-3 rounded border border-red-200 text-sm text-red-800">
              <p className="font-medium mb-1">Erro ao testar webhook:</p>
              <p className="text-xs font-mono overflow-x-auto">{testError}</p>
              <p className="mt-2 text-xs">
                Nota: Algumas URLs podem não ser acessíveis devido a problemas de CORS, certificados SSL 
                ou restrições de rede. Seu webhook ainda pode funcionar corretamente apesar deste erro.
              </p>
            </div>
          )}
          
          <div className="mt-2 text-sm text-gray-500">
            <p>Dados enviados para o webhook:</p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-x-auto">
{`{
  "leadData": {
    "name": "Nome do Lead",
    "email": "email@exemplo.com",
    "phone": "11999999999",
    ...
  },
  "message": "Novo lead recebido: Nome do Lead",
  "type": "new_lead"
}`}
            </pre>
          </div>
          
          <div className="mt-2 text-sm text-gray-700">
            <p className="font-medium mb-1">Como configurar:</p>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li>No N8N, crie um novo workflow e adicione um trigger "Webhook"</li>
              <li>Copie a URL do webhook do N8N e cole no campo acima</li>
              <li>Configure uma ação para enviar mensagem no WhatsApp</li>
              <li>Use o teste abaixo para verificar se está funcionando</li>
            </ol>
          </div>
          
          <div className="mt-1 text-sm text-orange-700 bg-orange-50 p-3 rounded border border-orange-200">
            <p className="font-semibold mb-1">Importante:</p>
            <p className="mb-2">Devido a restrições de segurança do navegador (CORS e SSL), você não verá uma 
            confirmação direta do teste. Mesmo que apareça "Failed to fetch", o teste pode ter sido enviado 
            corretamente.</p>
            <p>Verifique diretamente no N8N se o webhook foi recebido.</p>
            
            <div className="mt-2 text-xs flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Se estiver usando HTTPS no N8N, verifique se o certificado é válido.</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={handleTestWebhook}
            disabled={!webhookUrl || !isValidUrl || isTestingWebhook}
            className="flex items-center"
          >
            {isTestingWebhook ? "Enviando..." : "Testar Webhook"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookConfigDialog;
