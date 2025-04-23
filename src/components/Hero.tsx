
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-dark-background text-dark-text py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-dark-primary">
              Manoel Santos
            </h1>
            <p className="text-xl text-dark-text/80">
              Especialista em Transformação Empresarial com mais de 18 anos de experiência em Gestão, Marketing e Vendas
            </p>
            <ul className="space-y-2 text-dark-text/70">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                Mestrando em Administração de Empresas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                Pós-Graduação em Administração de Empresas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                Pós-Graduação em Marketing
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                Extensão em Gestão de Recursos Humanos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                Graduação em Psicologia com ênfase Organizacional
              </li>
            </ul>
            <Button 
              size="lg"
              className="bg-dark-primary hover:bg-dark-primary/80 text-dark-background"
              onClick={() => window.location.href = "#contato"}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar diagnóstico gratuito
            </Button>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="rounded-full overflow-hidden w-64 h-64 mx-auto border-4 border-dark-primary shadow-modern">
              <img
                src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                alt="Manoel Santos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
