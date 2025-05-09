
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import LeadCaptureForm from "./LeadCaptureForm";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text overflow-hidden">
      <div className="bg-dark-primary text-black text-center py-2 text-sm font-medium px-4">
        Exclusivo para empresas com faturamento acima de R$ 50 mil por mês
      </div>

      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12 lg:pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="lg:w-1/2 space-y-4 lg:space-y-6">
            <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  aceleração empresarial
                </Badge>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme sua empresa em uma <span className="text-dark-primary">máquina de vendas</span>
              </h1>
              
              <div className="glass-morphism p-4 sm:p-6 rounded-lg space-y-4 text-left mb-4">
                <p className="text-base sm:text-lg text-dark-text/80">
                  Em 30 minutos farei um PLANO DE AÇÃO GRATUITO para sua empresa DOBRAR o faturamento em 90 dias!
                </p>
              </div>

              <div className="flex flex-col items-center w-full">
                <LeadCaptureForm 
                  source="hero_section"
                  buttonClassName="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-base sm:text-lg py-6 px-6 sm:px-8 rounded-full shadow-gold group flex items-center"
                  buttonText={
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Agendar diagnóstico gratuito
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  }
                />
              
                <p className="text-sm text-dark-text/70 mt-2">
                  Clique acima e agende agora – As vagas são limitadas!
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="card-glow">
                <div className="relative z-10 rounded-2xl overflow-hidden">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="aceleração empresarial"
                    className="w-full h-[600px] object-cover object-center"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="font-medium text-xl text-dark-primary">Manoel Santos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
