
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BriefcaseIcon, GraduationCap, Book, Award, Target, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text overflow-hidden">
      {/* Yellow Banner */}
      <div className="bg-dark-primary text-black text-center py-2 text-sm font-medium">
        CRO Diretor de Receita: Alinhando Marketing, Produto e Comercial como uma Engrenagem Perfeita
      </div>

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
              <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                Programa Exclusivo 2025
              </Badge>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Seja o próximo <span className="text-dark-primary">caso de sucesso</span>
              </h1>
              
              <p className="text-lg md:text-xl text-dark-text/80">
                Programa exclusivo de alta performance para empresas que querem escalar seus resultados através da gestão integrada de Marketing, Comercial e Produto
              </p>
            </div>

            {/* Credentials Section */}
            <div className="glass-morphism p-8 rounded-xl space-y-4">
              <h2 className="text-2xl font-bold text-dark-primary mb-4">Quem é Manoel Santos?</h2>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Mestrando em Administração de Empresas</p>
                </div>
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Pós-Graduação em Administração de Empresas</p>
                </div>
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Pós-Graduação em Marketing</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Extensão em Gestão de Recursos Humanos</p>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Graduação em Psicologia com ênfase Organizacional</p>
                </div>
                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">18 anos de experiência em Gestão, Marketing e Vendas</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Mais de 180 empresas transformadas em 23 estados e 2 países</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">Mais de 1 Bilhão em vendas geradas</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-6 px-8 rounded-full shadow-gold group"
                onClick={() => window.open('https://calendly.com/contato-soumanoelsantos/45min', '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agende diagnóstico gratuito da sua empresa
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
