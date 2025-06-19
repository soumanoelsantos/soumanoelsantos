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
        EXCLUSIVO PARA DONOS DE EMPRESA DESEJA ALAVANCAR SUAS VENDAS E MELHORAR A GESTÃO DA SUA EMPRESA
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12 lg:pt-20">
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-16 min-h-[80vh]">
          
          {/* Content Section */}
          <div className="w-full space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Conquiste até <span className="text-dark-primary">3 anos de lucros</span> e resultados em até <span className="text-dark-primary">6 meses</span>
            </h1>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg sm:text-xl text-gray-300 mb-3">
                  <strong>Domine as etapas do crescimento da sua empresa:</strong>
                </p>
                <ul className="text-gray-300 space-y-2 text-center">
                  <li>• Defina onde quer chegar e o que precisa ser feito</li>
                  <li>• Alcance mais clientes e aumente suas vendas</li>
                  <li>• Garanta o crescimento sustentável no longo prazo</li>
                </ul>
              </div>
              
              {/* Image Section - Moved here */}
              <div className="flex justify-center mb-6">
                <div className="relative max-w-md">
                  <div className="bg-gradient-to-br from-dark-primary/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-dark-primary/30">
                    <img
                      src="/lovable-uploads/f3f30a0c-6fe2-47e5-97da-273a5e87b2fa.png"
                      alt="Mentor Manoel Santos - Aceleração Empresarial"
                      className="w-full h-[400px] object-contain object-center rounded-2xl"
                    />
                    
                    <div className="text-center mt-4">
                      <h3 className="text-2xl font-bold text-white">Manoel Santos</h3>
                      <p className="text-dark-primary font-semibold">Mentor de Aceleração Empresarial</p>
                      <p className="text-gray-300 text-sm mt-2">
                        Especialista em transformação de empresas com mais de 18 anos de experiência
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Mais de <strong className="text-dark-primary">500</strong> empresários de diversos segmentos em todo Brasil já vivenciaram o <strong>Acelerador Empresarial</strong>. Entenda como sua empresa pode acelerar também.
              </p>
            </div>

            <div className="bg-dark-primary/20 p-6 rounded-2xl border border-dark-primary/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">✅ Você tem esses problemas em sua empresa?</h3>
              <ul className="text-gray-300 space-y-2 text-center">
                <li>• Multiplicidade de demandas, processos desorganizados e falta de indicadores</li>
                <li>• Política do "Apaga Incêndio", negligenciando o importante por conta das urgências</li>
                <li>• Time dependente, sem autonomia ou iniciativa</li>
                <li>• Falta de clareza e perspectiva no processo de crescimento e escalada</li>
              </ul>
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
