
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { PlanejamentoEstrategicoData } from "@/types/planejamentoEstrategico";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface PlanoAcaoHeaderProps {
  dados: PlanejamentoEstrategicoData;
  onVoltar?: () => void;
}

const PlanoAcaoHeader: React.FC<PlanoAcaoHeaderProps> = ({ dados, onVoltar }) => {
  const { toast } = useToast();

  const downloadPDF = () => {
    const element = document.getElementById('plano-acoes-completo');
    if (element) {
      toast({
        title: "Download iniciado!",
        description: "O PDF do plano de ação está sendo gerado.",
      });
      generatePDF(element, `plano-acao-${dados.empresaNome}.pdf`);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {onVoltar && (
        <Button
          variant="outline"
          onClick={onVoltar}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      )}
      
      <Button
        onClick={downloadPDF}
        className="flex items-center gap-2 bg-[#1d365c] hover:bg-[#2a4a73]"
      >
        <Download className="h-4 w-4" />
        Baixar PDF Completo
      </Button>
    </div>
  );
};

export default PlanoAcaoHeader;
