
import React from "react";

const WebhookPayloadExample: React.FC = () => {
  return (
    <div className="mt-2 text-sm text-gray-500">
      <p>Dados enviados para o webhook:</p>
      <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-x-auto">
{`{
  "leadData": {
    "id": "lead-123",
    "name": "Nome do Lead",
    "email": "email@exemplo.com",
    "phone": "11999999999",
    "status": "Novo",
    ...
  },
  "message": "Novo lead recebido: Nome do Lead",
  "type": "new_lead"
}`}
      </pre>
    </div>
  );
};

export default WebhookPayloadExample;
