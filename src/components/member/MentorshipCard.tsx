
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useIsMobile } from "@/hooks/use-mobile";

const MentorshipCard: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader className={isMobile ? "px-4 py-4" : ""}>
        <CardTitle className="text-xl text-gray-800">Mentoria individual</CardTitle>
        <CardDescription className="text-gray-600">
          Agende sua próxima mentoria com o Manoel Santos
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "px-4 pt-0" : ""}>
        <p className="text-gray-700 mb-4">
          As mentorias individuais são realizadas semanalmente e são fundamentais para o seu sucesso no programa.
        </p>
        <div className="bg-gray-50 p-3 rounded-md border border-dark-primary/10 mb-4">
          <p className="text-sm text-gray-700 font-medium">Benefícios da mentoria individual:</p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
            <li>Orientação personalizada para as necessidades específicas do seu negócio</li>
            <li>Resolução de problemas em tempo real com feedback imediato</li>
            <li>Aceleração dos resultados através de estratégias direcionadas</li>
            <li>Acesso a conhecimento especializado e experiência prática</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className={isMobile ? "px-4 pb-4" : ""}>
        <LeadCaptureForm 
          source="member_area"
          buttonClassName="w-full bg-dark-primary hover:bg-dark-primary/90 text-black font-medium"
          buttonText="Agendar mentoria"
        />
      </CardFooter>
    </Card>
  );
};

export default MentorshipCard;
