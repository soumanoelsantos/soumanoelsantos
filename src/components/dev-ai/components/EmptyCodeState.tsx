
import React from 'react';
import { Card } from '@/components/ui/card';
import { Code } from 'lucide-react';

const EmptyCodeState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <Card className="p-8 text-center max-w-md">
        <Code className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Nenhum código gerado
        </h3>
        <p className="text-gray-500 text-sm">
          Envie uma mensagem para o assistente IA para começar a gerar código React.
        </p>
      </Card>
    </div>
  );
};

export default EmptyCodeState;
