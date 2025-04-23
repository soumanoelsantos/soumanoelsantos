import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, BriefcaseIcon, Star, Target, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text overflow-hidden">
      {/* Background pattern and overlays */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-6 py-3 text-lg">
                Programa Exclusivo 2024
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Transforme sua <span className="text-dark-primary">empresa</span> em uma máquina de resultados
              </h1>
              
              <p className="text-xl md:text-2xl text-dark-text/80">
                Aprenda com quem já transformou mais de 180 empresas em 23 estados
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  "Vendas Sistematizadas",
                  "Marketing Estratégico",
                  "Gestão de Alta Performance",
                  "Liderança Empresarial"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-dark-primary/10 px-4 py-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-dark-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-xl text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-dark-primary" />
                </div>
                <p className="text-sm text-dark-text/70">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-dark-primary">97%</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl text-center hover-scale">
                <div className="bg-dark-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="w-6 h-6 text-dark-primary" />
                </div>
                <p className="text-sm text-dark-text/70">Empresas Impactadas</p>
                <p className="text-2xl font-bold text-dark-primary">180+</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-xl py-8 px-10 rounded-full shadow-gold group"
                onClick={() => window.location.href = "#contato"}
              >
                <Target className="mr-2 h-6 w-6" />
                Quero Transformar Minha Empresa
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="glass-morphism p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-dark-primary bg-dark-accent overflow-hidden">
                      <img 
                        src={`/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png`}
                        alt={`Empresário ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-dark-text/90 text-sm">Junte-se a + de <span className="text-dark-primary font-semibold">180 empresários</span> que já transformaram seus negócios</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="card-glow">
                <div className="relative z-10 rounded-3xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="Manoel Santos"
                    className="w-full h-[700px] object-cover object-center"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              <div className="glass-morphism absolute -top-6 -right-6 p-6 rounded-xl shadow-gold animate-float">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-dark-primary/20 rounded-full">
                    <Star className="w-6 h-6 text-dark-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-dark-primary">18+ Anos</p>
                    <p className="text-sm text-dark-text/80">de Experiência</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-morphism absolute -bottom-6 -left-6 p-6 rounded-xl shadow-gold animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-dark-primary/20 rounded-full">
                    <BriefcaseIcon className="w-6 h-6 text-dark-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-dark-primary">23 Estados</p>
                    <p className="text-sm text-dark-text/80">Alcançados</p>
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
