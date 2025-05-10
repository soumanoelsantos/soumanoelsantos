
import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import ActionButton from "../ui/action-button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  onResetTest: () => void;
}

const NavigationButtons = ({ onResetTest }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-4 border-t border-gray-200 flex gap-4 flex-wrap">
      <ActionButton 
        onClick={onResetTest} 
        variant="outline"
        icon={RefreshCw}
      >
        Reiniciar Teste
      </ActionButton>
      <ActionButton 
        onClick={() => navigate("/membros")}
        variant="secondary"
        icon={ArrowLeft}
      >
        Voltar para Área de Membros
      </ActionButton>
    </div>
  );
};

export default NavigationButtons;
