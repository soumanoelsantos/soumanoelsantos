
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
import { AlertCircle } from "lucide-react";

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

  useEffect(() => {
    if (currentUrl) {
      setWebhookUrl(currentUrl);
    }
  }, [currentUrl]);

  const validateUrl = (url: string): boolean => {
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
    } else {
      setIsValidUrl(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl || !validateUrl(webhookUrl)) {
      setIsValidUrl(false);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      if (response.ok) {
        alert("Teste de webhook enviado com sucesso!");
      } else {
        alert(`Erro no teste de webhook: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`Falha ao testar webhook: ${error instanceof Error ? error.message : String(error)}`);
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
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={handleTestWebhook}
            disabled={!webhookUrl || !isValidUrl}
          >
            Testar Webhook
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
