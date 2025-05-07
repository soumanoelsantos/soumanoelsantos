
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SwotInfo: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">O que é a análise SWOT?</CardTitle>
        <CardDescription className="text-gray-600">
          A análise SWOT é uma ferramenta estratégica utilizada para avaliar os pontos fortes (Strengths), 
          pontos fracos (Weaknesses), oportunidades (Opportunities) e ameaças (Threats) de um negócio. 
          É fundamental para tomada de decisões estratégicas.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SwotInfo;
