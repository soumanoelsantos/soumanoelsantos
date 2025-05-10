
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar } from "lucide-react";

const MentorshipCard: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader className={`${isMobile ? "px-4 py-4" : ""} text-center`}>
        <CardTitle className="text-xl text-gray-800">Transforme sua empresa em uma <span className="text-dark-primary">máquina de vendas</span></CardTitle>
      </CardHeader>
      <CardContent className={`${isMobile ? "px-4 pt-0" : ""} text-center`}>
        <p className="text-gray-700 mb-4">
          Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
        </p>
      </CardContent>
      <CardFooter className={`flex-col items-center ${isMobile ? "px-4 pb-4" : ""}`}>
        <LeadCaptureForm 
          source="member_area"
          buttonClassName="w-full bg-dark-primary hover:bg-dark-primary/90 text-black font-medium flex items-center justify-center"
          buttonText={
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar diagnóstico gratuito
            </>
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center w-full">
          Clique acima e agende agora – As vagas são limitadas!
        </p>
      </CardFooter>
    </Card>
  );
};

export default MentorshipCard;
