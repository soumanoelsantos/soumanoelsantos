
import React from "react";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const CTAFinalSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0d112b] via-[#1a1a2e] to-[#0d112b]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-dark-primary/20 to-blue-600/20 p-12 rounded-3xl border border-dark-primary/30 backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Conquiste até <span className="text-dark-primary">5 anos de lucros</span> e resultados em até <span className="text-dark-primary">12 meses</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Clique no botão abaixo para fazer seu cadastro para as próximas turmas do <strong className="text-dark-primary">Acelerador Empresarial</strong> e junte-se a um time exclusivo e seleto de empresários.
            </p>

            <div className="mb-8">
              <p className="text-lg text-gray-300 mb-6">
                Dê esse passo decisivo para transformar e acelerar seu negócio em <strong className="text-dark-primary">2025</strong>.
              </p>
              
              <LeadCaptureForm 
                source="cta_final"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-xl py-6 px-12 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl group flex items-center justify-center gap-4"
                buttonText={
                  <>
                    <TrendingUp className="h-7 w-7" />
                    QUERO ACELERAR MEU NEGÓCIO
                    <ArrowRight className="h-7 w-7 group-hover:translate-x-1 transition-transform" />
                  </>
                }
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-dark-primary mb-2">100%</h4>
                <p className="text-gray-300">Empresários criteriosamente selecionados</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-dark-primary mb-2">15.000+</h4>
                <p className="text-gray-300">Empresas já transformadas</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-dark-primary mb-2">65+</h4>
                <p className="text-gray-300">Turmas realizadas com sucesso</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Os maiores empresários do Brasil são alunos do Acelerador Empresarial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
