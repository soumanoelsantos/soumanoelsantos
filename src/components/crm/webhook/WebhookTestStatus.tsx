
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface WebhookTestStatusProps {
  status: "idle" | "sent" | "error";
}

const WebhookTestStatus: React.FC<WebhookTestStatusProps> = ({ status }) => {
  if (status === "idle") return null;
  
  if (status === "sent") {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <CheckCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Requisição de teste enviada. Devido às restrições do navegador, não é possível confirmar se 
          o webhook recebeu os dados. Verifique diretamente no N8N se a solicitação chegou.
          Mesmo com erro no console, o webhook pode ter sido recebido corretamente.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert className="bg-red-50 border-red-200">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertDescription className="text-red-700">
        <p className="font-semibold">Possíveis causas do erro:</p>
        <ul className="list-disc list-inside mt-1">
          <li>O servidor N8N pode estar inacessível ou offline</li>
          <li>A URL do webhook pode estar incorreta</li>
          <li>Problemas de rede ou firewall</li>
          <li>Timeout na conexão</li>
        </ul>
        <p className="mt-1">Tente novamente ou verifique a conexão com o N8N.</p>
      </AlertDescription>
    </Alert>
  );
};

export default WebhookTestStatus;
