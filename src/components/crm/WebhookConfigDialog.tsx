
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

  useEffect(() => {
    if (currentUrl) {
      setWebhookUrl(currentUrl);
    }
  }, [currentUrl]);

  const handleSave = () => {
    onSave(webhookUrl);
    onOpenChange(false);
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
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://seu-webhook-url.com"
              className="w-full"
            />
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookConfigDialog;
