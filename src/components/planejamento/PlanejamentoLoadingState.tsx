
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";

const PlanejamentoLoadingState: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-8 text-center">
          <Bot className="h-16 w-16 mx-auto mb-4 animate-pulse text-blue-600" />
          <h2 className="text-2xl font-bold mb-2">Gerando Plano Estratégico</h2>
          <p className="text-gray-600 mb-4">
            Analisando suas respostas e criando um plano de ação personalizado...
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Sparkles className="h-5 w-5 animate-spin" />
            <span>Processando dados estratégicos</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanejamentoLoadingState;
