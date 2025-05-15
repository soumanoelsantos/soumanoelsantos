
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Agendamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leadName = location.state?.leadName || "";

  useEffect(() => {
    document.title = "Agendamento de Diagnóstico Gratuito";
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#1d365c] py-4 px-6 shadow-md">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-white text-white hover:text-black"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium text-white">Agendamento de Diagnóstico</h1>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 flex flex-col items-center">
        {leadName && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Olá, {leadName}!</h2>
            <p className="text-lg text-gray-700 mt-2">
              Selecione abaixo o melhor horário para o seu diagnóstico gratuito.
            </p>
          </div>
        )}
        <div className="w-full max-w-4xl h-[700px] rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://calendar.app.google/24nP9V5SPd4gLF3v5"
            frameBorder="0"
            scrolling="yes"
            width="100%"
            height="100%"
            className="w-full h-full"
            title="Agendamento de Diagnóstico Gratuito"
          ></iframe>
        </div>

        <p className="mt-6 text-sm text-gray-500 max-w-xl text-center">
          Ao agendar, você receberá uma confirmação por e-mail com detalhes sobre a reunião. 
          Lembre-se que este é um diagnóstico personalizado com o Manoel Santos.
        </p>
      </div>
    </div>
  );
};

export default Agendamento;
