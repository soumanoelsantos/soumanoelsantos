
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiagnosticHeader = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Vim através do diagnóstico do negócio e gostaria de conversar.', '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Diagnóstico do Negócio</h1>
        <p className="text-gray-600">
          Descubra os pontos fortes e oportunidades de melhoria da sua empresa
        </p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-center gap-4">
        <img
          src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
          alt="Manoel Santos - CRO"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
        />
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticHeader;
