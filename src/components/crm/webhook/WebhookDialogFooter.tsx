
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface WebhookDialogFooterProps {
  onTest: () => void;
  onCancel: () => void;
  onSave: () => void;
  isTestingWebhook: boolean;
  isTestDisabled: boolean;
}

const WebhookDialogFooter: React.FC<WebhookDialogFooterProps> = ({
  onTest,
  onCancel,
  onSave,
  isTestingWebhook,
  isTestDisabled
}) => {
  return (
    <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2">
      <Button 
        variant="outline" 
        type="button" 
        onClick={onTest}
        disabled={isTestDisabled || isTestingWebhook}
        className="flex items-center"
      >
        {isTestingWebhook ? "Enviando..." : "Testar Webhook"}
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </DialogFooter>
  );
};

export default WebhookDialogFooter;
