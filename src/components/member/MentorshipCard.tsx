
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar } from "lucide-react";

const MentorshipCard: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-white border-gray-200 shadow-lg max-w-4xl mx-auto">
      <CardHeader className={`${isMobile ? "px-4 py-4" : ""} text-center`}>
        <CardTitle className="text-xl text-gray-800">Transforme sua empresa em uma <span className="text-dark-primary">máquina de vendas</span></CardTitle>
        <CardDescription className="text-sm font-medium text-gray-700 mt-1">
          Exclusivo para empresas com faturamento acima de R$ 50 mil por mês!
        </CardDescription>
      </CardHeader>
      <CardContent className={`${isMobile ? "px-4 pt-0" : ""}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3 max-w-[280px]">
            <img
              src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
              alt="CRO - Manoel Santos"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <p className="text-gray-700 mb-4">
              Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
            </p>
            
            <LeadCaptureForm 
              source="member_area"
              buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black font-medium flex items-center justify-center"
              buttonText={
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar diagnóstico gratuito
                </>
              }
            />
            
            <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
              Clique acima e agende agora – As vagas são limitadas!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorshipCard;
