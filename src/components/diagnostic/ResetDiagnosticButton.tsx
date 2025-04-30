
import React from 'react';
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ActionButton from '../ui/action-button';

interface ResetDiagnosticButtonProps {
  onReset: () => void;
}

const ResetDiagnosticButton = ({ onReset }: ResetDiagnosticButtonProps) => {
  const { userEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleReset = () => {
    if (userEmail) {
      const resultsKey = `diagnostic_results_${userEmail}`;
      const answersKey = `diagnostic_answers_${userEmail}`;
      
      localStorage.removeItem(resultsKey);
      localStorage.removeItem(answersKey);
      
      onReset();
      
      toast({
        title: "Diagnóstico reiniciado",
        description: "Você pode realizar um novo diagnóstico agora.",
      });
      
      // Force reload the page to reset the form
      navigate(0);
    }
  };
  
  return (
    <ActionButton
      onClick={handleReset}
      variant="outline"
      icon={RefreshCw}
    >
      Reiniciar Diagnóstico
    </ActionButton>
  );
};

export default ResetDiagnosticButton;
