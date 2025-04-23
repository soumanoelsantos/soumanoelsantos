
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, BriefcaseIcon, ChartLine, ShoppingCart, LayoutGrid } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                Programa Exclusivo 2025
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Transforme sua <span className="text-dark-primary">empresa digital</span> em uma máquina de resultados
              </h1>
              
              <p className="text-lg md:text-xl text-dark-text/80 max-w-2xl">
                Como seu CRO (Chief Revenue Officer), vou integrar e otimizar seus setores de Marketing, Comercial e Produto para maximizar sua receita.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="glass-morphism p-4 rounded-xl text-center hover-scale">
                  <ShoppingCart className="w-8 h-8 text-dark-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Marketing Digital</h3>
                  <p className="text-sm text-dark-text/70">Estratégias comprovadas de aquisição</p>
                </div>
                
                <div className="glass-morphism p-4 rounded-xl text-center hover-scale">
                  <ChartLine className="w-8 h-8 text-dark-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Gestão Comercial</h3>
                  <p className="text-sm text-dark-text/70">Processos de vendas otimizados</p>
                </div>
                
                <div className="glass-morphism p-4 rounded-xl text-center hover-scale">
                  <LayoutGrid className="w-8 h-8 text-dark-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Gestão de Produto</h3>
                  <p className="text-sm text-dark-text/70">Desenvolvimento focado em resultados</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-6 px-8 rounded-full shadow-gold group"
                onClick={() => window.location.href = "#contato"}
              >
                <Target className="mr-2 h-5 w-5" />
                Quero Maximizar Minha Receita
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="glass-morphism p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <BriefcaseIcon className="w-12 h-12 text-dark-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-xl mb-1">Seu CRO Dedicado</h4>
                  <p className="text-dark-text/90 text-sm">Vou integrar e otimizar todos os setores da sua empresa, garantindo que cada engrenagem funcione em perfeita harmonia para maximizar seus resultados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="card-glow">
                <div className="relative z-10 rounded-3xl overflow-hidden">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="Manoel Santos"
                    className="w-full h-[700px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              <div className="glass-morphism absolute -top-6 -right-6 p-6 rounded-xl shadow-gold">
                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="w-6 h-6 text-dark-primary" />
                  <div>
                    <p className="text-xl font-bold text-dark-primary">CRO</p>
                    <p className="text-sm text-dark-text/80">Diretor de Receita</p>
                  </div>
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
