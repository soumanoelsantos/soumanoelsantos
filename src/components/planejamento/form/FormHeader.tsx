
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FormHeaderProps {
  perguntaAtual: number;
  totalPerguntas: number;
  categoria: string;
  pergunta: string;
  obrigatoria: boolean;
  isMultipleChoice: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  perguntaAtual,
  totalPerguntas,
  categoria,
  pergunta,
  obrigatoria,
  isMultipleChoice
}) => {
  const progresso = ((perguntaAtual + 1) / totalPerguntas) * 100;

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      negocio: "Informações do Negócio",
      diagnostico: "Diagnóstico Empresarial", 
      swot: "Análise SWOT",
      puv: "Proposta Única de Valor",
      equipe: "Estrutura da Equipe",
      fase: "Fase da Empresa"
    };
    return labels[categoria as keyof typeof labels] || categoria;
  };

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl">Planejamento Estratégico</CardTitle>
        <div className="text-sm text-gray-500">
          Pergunta {perguntaAtual + 1} de {totalPerguntas}
        </div>
      </div>
      <div className="text-sm text-blue-600 font-medium">
        {getCategoriaLabel(categoria)}
      </div>
      <Progress value={progresso} className="mt-4" />
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-4">{pergunta}</h3>
        {obrigatoria && (
          <p className="text-sm text-red-500 mb-2">* Campo obrigatório</p>
        )}
        {isMultipleChoice && (
          <p className="text-sm text-blue-600 mb-2">Você pode selecionar múltiplas opções</p>
        )}
      </div>
    </CardHeader>
  );
};

export default FormHeader;
