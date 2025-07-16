
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0d112b] via-[#1a1a2e] to-[#0d112b] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header bar */}
      <div className="bg-red-600 text-white text-center py-3 text-sm font-medium px-4 relative z-10">
        Deixe-me ser o DIRETOR DE VENDAS do seu time comercial, treinar e acompanhar seus vendedores para bater meta todos os meses!
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12 lg:pt-20">
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-16 min-h-[80vh]">
          
          {/* Content Section */}
          <div className="w-full space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Está difícil fazer sua <span className="text-dark-primary">equipe comercial</span> performar como você espera?
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Se você quer mudar esse cenário, inscreva-se agora e marque uma conversa estratégica gratuita com nosso time. Vamos analisar seu negócio e mostrar caminhos reais para alavancar suas vendas.
              </p>
              
              {/* Image Section - Moved here */}
              <div className="flex justify-center mb-6">
                <div className="relative max-w-md">
                  <div className="bg-gradient-to-br from-dark-primary/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-dark-primary/30">
                    <img
                      src="/lovable-uploads/f3f30a0c-6fe2-47e5-97da-273a5e87b2fa.png"
                      alt="Manoel Santos - Diretor de Vendas"
                      className="w-full h-[400px] object-contain object-center rounded-2xl"
                    />
                    
                    <div className="text-center mt-4">
                      <h3 className="text-2xl font-bold text-white">Manoel Santos</h3>
                      <p className="text-dark-primary font-semibold">Diretor de Vendas</p>
                      <p className="text-gray-300 text-sm mt-2">
                        Especialista em transformação de empresas com mais de 20 anos de experiência
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Mais de <strong className="text-dark-primary">500</strong> empresários de diversos segmentos em todo Brasil já vivenciaram a transformação do seu time comercial. Entenda como sua empresa pode acelerar também.
              </p>
            </div>

            <div className="flex flex-col items-center w-full">
              <LeadCaptureForm 
                source="hero_acelerador"
                buttonClassName="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-6 px-8 rounded-full shadow-2xl group flex items-center justify-center gap-3 font-bold transform hover:scale-105 transition-all duration-300"
                buttonText={
                  <>
                    <TrendingUp className="h-6 w-6" />
                    QUERO ACELERAR MEU NEGÓCIO
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </>
                }
              />
              
              <p className="text-sm text-gray-400 mt-3 text-center">
                Preencha o formulário e participe do programa exclusivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
