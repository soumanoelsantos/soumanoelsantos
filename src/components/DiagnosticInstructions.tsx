
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const DiagnosticInstructions = () => {
  return (
    <Card className="bg-dark-primary/5 border-dark-primary/20 mb-6">
      <CardContent className="pt-6">
        <div className="space-y-3 text-white">
          <p>
            <strong>A) Avalie a existência e o nível de satisfação de cada um dos itens descritos abaixo;</strong>
          </p>
          <p>
            <strong>B) Marque as opções:</strong> "Existe e é satisfatório", "Existe, mas não é satisfatório" ou "Não existe".
          </p>
          <p>
            <strong>C) A avaliação será concluída no radar logo abaixo;</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticInstructions;
