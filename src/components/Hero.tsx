
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-dark-background text-dark-text overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-dark-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-dark-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-24">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-dark-primary">
                Manoel Santos
              </h1>
              <p className="text-xl md:text-2xl text-dark-text/80 font-light">
                Especialista em Transformação Empresarial com mais de 18 anos de experiência em Gestão, Marketing e Vendas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-secondary/50 backdrop-blur-sm rounded-xl border border-dark-primary/20">
                <ul className="space-y-3 text-dark-text/70">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    Mestrando em Administração
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    Pós-Graduação em Marketing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    Graduação em Psicologia
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-dark-secondary/50 backdrop-blur-sm rounded-xl border border-dark-primary/20">
                <ul className="space-y-3 text-dark-text/70">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    Pós em Administração
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    Extensão em RH
                  </li>
                </ul>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-dark-primary hover:bg-dark-primary/80 text-dark-background text-lg py-6"
              onClick={() => window.location.href = "#contato"}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Agendar diagnóstico gratuito
            </Button>
          </div>

          {/* Right content - Profile Images */}
          <div className="md:w-1/2 space-y-8">
            <div className="relative">
              {/* Main profile image */}
              <div className="rounded-2xl overflow-hidden w-80 h-96 mx-auto border-4 border-dark-primary shadow-modern">
                <img
                  src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                  alt="Manoel Santos"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-dark-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-dark-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
