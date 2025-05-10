
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from "@/components/ui/action-button";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface ResultMessage {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

interface ChecklistResultsProps {
  score: number;
  resultMessage: ResultMessage;
  onReset: () => void;
}

const ChecklistResults: React.FC<ChecklistResultsProps> = ({
  score,
  resultMessage,
  onReset
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Sua pontuação:</h3>
        <span className="text-3xl font-bold text-[#D4AF37]">{score} / 10</span>
      </div>
      
      <div className={`${resultMessage.bgColor} p-4 rounded-md text-center`}>
        <h4 className={`text-xl font-bold ${resultMessage.textColor}`}>{resultMessage.title}</h4>
        <p className={`mt-2 ${resultMessage.textColor}`}>{resultMessage.description}</p>
      </div>
      
      <div className="mt-8 text-center flex flex-wrap justify-center gap-4">
        <ActionButton 
          onClick={onReset} 
          variant="outline"
          icon={RefreshCw}
        >
          Reiniciar Check List
        </ActionButton>
        
        <ActionButton 
          onClick={() => navigate('/membros')}
          variant="secondary"
          icon={ArrowLeft}
        >
          Voltar para Área de Membros
        </ActionButton>
      </div>
    </div>
  );
};

export default ChecklistResults;
