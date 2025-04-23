
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-[#1A365D] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Manoel Santos
            </h1>
            <p className="text-xl text-gray-300">
              Especialista em Transformação Empresarial com mais de 18 anos de experiência em Gestão, Marketing e Vendas
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>Mestrando em Administração de Empresas</li>
              <li>Pós-Graduação em Administração de Empresas</li>
              <li>Pós-Graduação em Marketing</li>
              <li>Extensão em Gestão de Recursos Humanos</li>
              <li>Graduação em Psicologia com ênfase Organizacional</li>
            </ul>
            <Button 
              size="lg"
              className="bg-[#C4A14D] hover:bg-[#B39040] text-white"
              onClick={() => window.location.href = "#contato"}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consultoria Gratuita
            </Button>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="rounded-full overflow-hidden w-64 h-64 mx-auto border-4 border-[#C4A14D]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
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
