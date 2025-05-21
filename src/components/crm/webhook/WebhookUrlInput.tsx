
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface WebhookUrlInputProps {
  webhookUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const WebhookUrlInput: React.FC<WebhookUrlInputProps> = ({ 
  webhookUrl, 
  onChange, 
  isValid 
}) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Label htmlFor="webhook-url">URL do Webhook</Label>
      <Input
        id="webhook-url"
        value={webhookUrl}
        onChange={onChange}
        placeholder="https://seu-webhook-url.com"
        className={`w-full ${!isValid ? "border-red-500" : ""}`}
      />
      {!isValid && (
        <div className="text-red-500 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Insira uma URL válida
        </div>
      )}
    </div>
  );
};

export default WebhookUrlInput;
