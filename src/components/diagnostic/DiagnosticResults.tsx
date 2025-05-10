
import React from "react";
import DiagnosticResultsChart from "../DiagnosticResultsChart";
import ResultsCard from "./ResultsCard";
import AnswersDisplay from "./AnswersDisplay";
import ResetDiagnosticButton from "./ResetDiagnosticButton";
import DownloadPdfButton from "./DownloadPdfButton";

interface DiagnosticResultsProps {
  results: any;
  answersData: any;
  onRestart: () => void;
}

const DiagnosticResults = ({
  results,
  answersData,
  onRestart,
}: DiagnosticResultsProps) => {
  if (!results) return null;

  const totalScore = results.totalScore;
  const maxPossibleScore = results.maxPossibleScore;
  const percentage = (totalScore / maxPossibleScore) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Pontuação Geral: {Math.round(percentage)}%
        </h2>
        <DiagnosticResultsChart results={results} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultsCard
          title="Processos"
          score={results.processos.percentage}
          observations={[
            "Avalia o nível de maturidade dos processos",
            "Verifica documentação e padronização",
            "Analisa eficiência operacional"
          ]}
        />
        <ResultsCard
          title="Resultados"
          score={results.resultados.percentage}
          observations={[
            "Avalia métricas financeiras e de desempenho",
            "Verifica o acompanhamento de indicadores",
            "Analisa a consistência dos resultados"
          ]}
        />
        <ResultsCard
          title="Sistema de Gestão"
          score={results.sistemaGestao.percentage}
          observations={[
            "Avalia a estrutura organizacional",
            "Verifica ferramentas de gestão",
            "Analisa processos decisórios"
          ]}
        />
        <ResultsCard
          title="Pessoas"
          score={results.pessoas.percentage}
          observations={[
            "Avalia cultura organizacional",
            "Verifica processos de RH",
            "Analisa desenvolvimento de equipes"
          ]}
        />
      </div>

      <AnswersDisplay answersData={answersData} />

      <div className="flex justify-between items-center flex-wrap gap-4 pt-6">
        <ResetDiagnosticButton onRestart={onRestart} />
        <DownloadPdfButton
          results={results}
          answersData={answersData}
        />
      </div>
    </div>
  );
};

export default DiagnosticResults;
