
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import PlanejamentoEstrategicoForm from "./PlanejamentoEstrategicoForm";
import PlanoAcaoGerado from "./PlanoAcaoGerado";
import PlanejamentoLoadingState from "./PlanejamentoLoadingState";
import { usePlanejamentoEstrategico } from "@/hooks/planejamento/usePlanejamentoEstrategico";

const PlanejamentoEstrategico: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    etapa,
    dados,
    gerandoPlano,
    processarRespostas,
    handleUpdateProgresso
  } = usePlanejamentoEstrategico();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (gerandoPlano) {
    return <PlanejamentoLoadingState />;
  }

  if (etapa === 'resultado' && dados) {
    return <PlanoAcaoGerado dados={dados} onUpdateProgresso={handleUpdateProgresso} />;
  }

  return <PlanejamentoEstrategicoForm onComplete={processarRespostas} />;
};

export default PlanejamentoEstrategico;
