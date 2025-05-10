
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
  const { userId } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleReset = () => {
    if (userId) {
      // Call the onReset function provided by the parent component
      onReset();
      
      toast({
        title: "Diagnóstico reiniciado",
        description: "Você pode realizar um novo diagnóstico agora.",
      });
      
      // Navigate to the diagnostic test page
      navigate("/teste");
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao reiniciar",
        description: "Você precisa estar logado para reiniciar o diagnóstico.",
      });
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
