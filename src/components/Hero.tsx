
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BriefcaseIcon, BarChart2, Target } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                Transformação Empresarial Elite
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Desbloqueie o <span className="text-dark-primary">Potencial</span> da sua Empresa
              </h1>
              
              <p className="text-xl md:text-2xl text-dark-text/80">
                Metodologia comprovada para escalar seu negócio com resultados excepcionais
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-xl text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="w-6 h-6 text-dark-primary" />
                </div>
                <p className="text-sm text-dark-text/70">Empresas Atendidas</p>
                <p className="text-2xl font-bold text-dark-primary">180+</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="w-6 h-6 text-dark-primary" />
                </div>
                <p className="text-sm text-dark-text/70">Em Vendas</p>
                <p className="text-2xl font-bold text-dark-primary">1B+</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-6 px-8 rounded-full shadow-gold"
                onClick={() => window.location.href = "#contato"}
              >
                <Target className="mr-2 h-5 w-5" />
                Iniciar Transformação
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="border-dark-primary text-dark-primary hover:bg-dark-primary/10 text-lg py-6 px-8 rounded-full"
                onClick={() => window.location.href = "#metodologia"}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Ver Metodologia
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="card-glow">
                <div className="relative z-10 rounded-2xl overflow-hidden">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="Manoel Santos"
                    className="w-full h-[600px] object-cover object-center"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Floating achievements */}
              <div className="glass-morphism absolute -top-6 -right-6 p-4 rounded-xl shadow-gold animate-float">
                <p className="text-sm font-semibold text-dark-primary">18+ Anos</p>
                <p className="text-xs text-dark-text/80">de Experiência</p>
              </div>
              
              <div className="glass-morphism absolute -bottom-6 -left-6 p-4 rounded-xl shadow-gold animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-semibold text-dark-primary">23 Estados</p>
                <p className="text-xs text-dark-text/80">Alcançados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
