
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

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
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert className="bg-red-50 border-red-200">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertDescription className="text-red-700">
        Ocorreu um erro ao tentar enviar o teste. Isso pode ser devido a problemas de CORS, 
        certificados SSL ou restrições de rede. Seu webhook ainda pode funcionar corretamente apesar deste erro.
      </AlertDescription>
    </Alert>
  );
};

export default WebhookTestStatus;
