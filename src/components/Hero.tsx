import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, TrendingUp, Users, MessageSquare, Star } from "lucide-react";
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
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  aceleração empresarial
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  gestão
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  marketing
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  dashboard
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  crm
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  acompanhamento diário
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  vendas
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  treinamento
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  processos
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  pós-venda
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  sucesso do cliente
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  encantamento do cliente
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  cultura
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  processo seletivo
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  tutorias
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  comunidade de empresários
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  indicadores de performance
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  one on one
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  feedback
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  metas diárias
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  desenvolvimento de lideranças
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  plano de carreira
                </Badge>
                <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                  plano de fidelidade
                </Badge>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme sua empresa em uma <span className="text-dark-primary">máquina de vendas</span>
              </h1>
              
              <div className="glass-morphism p-4 sm:p-6 rounded-lg space-y-4 text-left mb-4">
                <p className="text-base sm:text-lg text-dark-text/80">
                  Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
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
                <p className="font-medium text-xl text-dark-primary">CRO - Manoel Santos</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">aceleração empresarial</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">gestão</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">marketing</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">dashboard</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">crm</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">acompanhamento diário</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">vendas</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">treinamento</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">processos</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">pós-venda</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">sucesso do cliente</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">encantamento do cliente</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">cultura</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">processo seletivo</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">tutorias</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">comunidade de empresários</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">indicadores de performance</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">one on one</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">feedback</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">metas diárias</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">desenvolvimento de lideranças</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">plano de carreira</span>
                  <span className="bg-dark-primary/10 text-dark-primary text-xs px-2 py-1 rounded-full">plano de fidelidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
