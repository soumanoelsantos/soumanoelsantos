
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
    <div className="flex justify-center mt-8">
      <Button
        onClick={handleReset}
        variant="outline"
        className="border-[#1d365c] text-white bg-[#1d365c] hover:bg-[#1d365c]/80 flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reiniciar Diagnóstico
      </Button>
    </div>
  );
};

export default ResetDiagnosticButton;
