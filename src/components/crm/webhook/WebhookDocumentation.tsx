
import React from "react";
import { ExternalLink } from "lucide-react";

const WebhookDocumentation: React.FC = () => {
  return (
    <div className="mt-2 text-sm text-gray-700 space-y-4">
      <div>
        <p className="font-medium mb-1">Como configurar:</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>No N8N, crie um novo workflow e adicione um trigger "Webhook"</li>
          <li>Copie a URL do webhook do N8N e cole no campo acima</li>
          <li>Configure uma ação para enviar mensagem no WhatsApp ou outra ação desejada</li>
          <li>Use o teste abaixo para verificar se está funcionando</li>
        </ol>
      </div>
      
      <div className="bg-orange-50 p-3 rounded border border-orange-200">
        <p className="font-semibold mb-1">Solução de problemas:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Verifique se a URL do webhook está correta</li>
          <li>Confirme que o N8N está em execução e acessível</li>
          <li>O modo "no-cors" é usado para evitar erros CORS, mas isso significa que não podemos verificar a resposta</li>
          <li>Mesmo com erro no navegador, o webhook pode ser recebido corretamente</li>
        </ul>
        
        <div className="mt-2 text-xs flex items-center">
          <ExternalLink className="h-3 w-3 mr-1" />
          <span>Se estiver usando HTTPS no N8N, verifique se o certificado é válido.</span>
        </div>
      </div>
    </div>
  );
};

export default WebhookDocumentation;
