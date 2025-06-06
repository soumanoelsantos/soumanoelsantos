
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DiagnosticoResultadosHeader: React.FC = () => {
  return (
    <Card>
      <CardHeader className="bg-[#1d365c] text-white text-center">
        <CardTitle className="text-2xl">Diagnóstico do Negócio - Resultados</CardTitle>
        <div className="text-sm opacity-90 mt-2">
          <p>A) Avalie a existência e o nível de satisfação de cada um dos itens descritos abaixo;</p>
          <p>B) Marque as opções: "Existe e é satisfatório", "Existe, mas não é satisfatório" ou "Não existe";</p>
          <p>C) A avaliação será concluída no radar logo abaixo;</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DiagnosticoResultadosHeader;
