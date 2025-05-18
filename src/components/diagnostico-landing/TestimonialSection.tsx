
import React from "react";
import { PlayCircle, MessageSquare } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="text-yellow-500">Depoimento</span> real de um cliente
          </h2>
          
          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/D4NPk7ZgmGU?si=YWF7se3PVbrb-N6D" 
              title="Depoimento de cliente" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex items-center justify-center mt-6 mb-8">
            <PlayCircle className="h-6 w-6 text-dark-primary mr-3" />
            <p className="text-lg text-gray-300">Assista o depoimento completo e descubra como transformamos os resultados</p>
          </div>
        </div>
      </div>

      <TextTestimonials />
    </section>
  );
};

const TextTestimonials = () => {
  return (
    <div className="container mx-auto px-4 pt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          <span className="text-yellow-500">Depoimentos</span> de clientes reais
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-start mb-4">
              <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="italic text-gray-300">
                "Após implementar as estratégias de comercial que o Manoel sugeriu, conseguimos triplicar nosso ticket médio na venda da nossa mentoria."
              </p>
            </div>
            <p className="text-sm text-gray-400">— Carlos M., CEO de Agência Digital</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-start mb-4">
              <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="italic text-gray-300">
                "Nossa equipe de vendas estava com dificuldade para fechar contratos de alto valor. Após a consultoria, nosso fechamento aumentou 78%."
              </p>
            </div>
            <p className="text-sm text-gray-400">— Ana F., Escritório de Advocacia</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-start mb-4">
              <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="italic text-gray-300">
                "Investimos pesado em tráfego mas não convertia. O problema era nossa falta de processos comerciais. Com as mudanças sugeridas, nosso ROI aumentou 4x."
              </p>
            </div>
            <p className="text-sm text-gray-400">— Rafael S., Lançamentos Digitais</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-start mb-4">
              <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="italic text-gray-300">
                "O treinamento da nossa equipe comercial e a implementação dos processos fez toda diferença para vendermos nossos pacotes premium."
              </p>
            </div>
            <p className="text-sm text-gray-400">— Mariana L., Consultoria Empresarial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
