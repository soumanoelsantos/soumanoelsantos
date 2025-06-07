
import React from "react";
import { usePlanejamentoEstrategico } from "@/hooks/planejamento/usePlanejamentoEstrategico";
import PlanejamentoEstrategicoForm from "./PlanejamentoEstrategicoForm";
import PlanejamentoLoadingState from "./PlanejamentoLoadingState";
import DiagnosticoResultados from "./DiagnosticoResultados";
import FerramentasResultados from "./FerramentasResultados";
import PlanoAcaoGerado from "./PlanoAcaoGerado";

const PlanejamentoEstrategico = () => {
  const {
    etapa,
    dados,
    gerandoPlano,
    isLoading,
    processarRespostas,
    handleUpdateProgresso,
    voltarParaFormulario,
    limparPlanoSalvo
  } = usePlanejamentoEstrategico();

  // Mostrar loading enquanto verifica se existe plano salvo
  if (isLoading) {
    return <PlanejamentoLoadingState />;
  }

  if (gerandoPlano) {
    return <PlanejamentoLoadingState />;
  }

  if (etapa === 'resultado' && dados) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Planejamento Estratégico - {dados.empresaNome}</h1>
          <div className="flex gap-4">
            <button
              onClick={voltarParaFormulario}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Novo Planejamento
            </button>
            <button
              onClick={limparPlanoSalvo}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Limpar Dados
            </button>
          </div>
        </div>

        <DiagnosticoResultados 
          resultados={dados.ferramentasGeradas.diagnostico}
          respostas={dados.respostas}
          onContinuar={() => {}}
        />

        <FerramentasResultados 
          dados={dados}
        />

        <PlanoAcaoGerado 
          dados={dados}
          onUpdateProgresso={handleUpdateProgresso}
          onVoltar={voltarParaFormulario}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Planejamento Estratégico</h1>
        <p className="text-gray-600">
          Responda às perguntas abaixo para gerar seu planejamento estratégico personalizado.
        </p>
      </div>
      <PlanejamentoEstrategicoForm onComplete={processarRespostas} />
    </div>
  );
};

export default PlanejamentoEstrategico;
