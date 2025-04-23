
import { Button } from "@/components/ui/button";
import { Calendar, Award, ChartBar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-dark-background text-dark-text overflow-hidden">
      {/* Efeito de fundo com particulas */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-dark-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-dark-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-dark-primary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-32">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Coluna da esquerda */}
          <div className="lg:w-1/2 space-y-8">
            <Badge className="bg-dark-primary/20 text-dark-primary border-dark-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm">
              Especialista em Transformação Empresarial
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight font-serif">
                <span className="text-gradient">Manoel Santos</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-text/80 font-light">
                Transformando negócios há mais de 18 anos com expertise em Gestão, Marketing e Vendas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="glass-morphism rounded-xl p-6 text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-dark-primary" />
                </div>
                <h3 className="font-bold text-dark-primary text-xl mb-1">180+</h3>
                <p className="text-sm text-dark-text/70">Empresas transformadas</p>
              </div>
              
              <div className="glass-morphism rounded-xl p-6 text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChartBar className="w-6 h-6 text-dark-primary" />
                </div>
                <h3 className="font-bold text-dark-primary text-xl mb-1">1B+</h3>
                <p className="text-sm text-dark-text/70">Em vendas geradas</p>
              </div>
              
              <div className="glass-morphism rounded-xl p-6 text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-dark-primary" />
                </div>
                <h3 className="font-bold text-dark-primary text-xl mb-1">18</h3>
                <p className="text-sm text-dark-text/70">Anos de experiência</p>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-7 px-8 rounded-full shadow-gold"
              onClick={() => window.location.href = "#contato"}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Agendar diagnóstico gratuito
            </Button>
          </div>

          {/* Coluna da direita - Imagem de perfil */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Imagem principal */}
              <div className="card-glow">
                <div className="relative z-10 rounded-2xl overflow-hidden w-[350px] h-[450px] mx-auto border-2 border-dark-primary/30 shadow-modern">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="Manoel Santos"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-dark-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-dark-primary/20 rounded-full blur-xl"></div>
              
              {/* Credenciais flutuantes */}
              <div className="glass-morphism absolute -bottom-5 -right-5 p-4 rounded-lg shadow-gold animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-medium text-dark-primary">Mestrando em</p>
                <p className="text-xs text-dark-text/80">Administração</p>
              </div>
              
              <div className="glass-morphism absolute -top-5 -left-5 p-4 rounded-lg shadow-gold animate-float" style={{ animationDelay: '2s' }}>
                <p className="text-sm font-medium text-dark-primary">Pós-Graduado em</p>
                <p className="text-xs text-dark-text/80">Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
