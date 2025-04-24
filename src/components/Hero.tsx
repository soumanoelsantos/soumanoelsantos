import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BriefcaseIcon, GraduationCap, Book, Award, Target, Calendar } from "lucide-react";

const Hero = () => {
  const handleScheduleClick = () => {
    window.location.href = 'https://wa.me/31986994906';
  };

  return (
    <div className="relative min-h-screen bg-gradient-radial text-dark-text overflow-hidden">
      {/* Yellow Banner */}
      <div className="bg-dark-primary text-black text-center py-2 text-sm font-medium px-4">
        Exclusivo para empresas com faturamento acima de R$ 50 mil por mês
      </div>

      {/* Background pattern and overlays */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="bg-dark-primary/10 text-dark-primary border-dark-primary/20 px-4 py-2">
                Programa Maximus
              </Badge>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme seu negócio em uma <span className="text-dark-primary">máquina de faturamento</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-dark-text/80 mb-4">
                Mentoria de alta performance para empresários que querem vender MUITO MAIS
              </p>

              {/* Business Challenges Section */}
              <div className="glass-morphism p-4 sm:p-6 rounded-lg space-y-4 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-dark-primary mb-4">
                  Isso acontece em sua empresa?
                </h3>
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-dark-text/90">
                    ❌ Multiplicidade de demandas, processos desorganizados e falta de indicadores
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    ❌ Política do "Apaga Incêndio", negligenciando o importante por conta das urgências
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    ❌ Time dependente, sem autonomia ou iniciativa
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    ❌ Falta de clareza e perspectiva no processo de crescimento e escalada
                  </p>
                </div>
              </div>

              {/* Personal Challenges Section */}
              <div className="glass-morphism p-4 sm:p-6 rounded-lg space-y-4 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-dark-primary mb-4">
                  Você sofre com:
                </h3>
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-dark-text/90">
                    😓 Sobrecarga de trabalho, mais de 12 horas por dia
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    😓 Dificuldade em se ausentar da empresa e tirar férias
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    😓 Falta de tempo para a família, amigos e lazer
                  </p>
                  <p className="text-sm sm:text-base text-dark-text/90">
                    😓 Reflexos na saúde, como estresse e vida sedentária
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="glass-morphism p-4 sm:p-6 rounded-lg space-y-4 text-left">
                <p className="text-sm sm:text-base text-dark-text/90">
                  Eu sou Manoel Santos, especialista em escalar negócios. Como CRO (Chief Revenue Officer), minha missão é conectar comercial, marketing e produto para transformar sua empresa em uma máquina de vendas. E tudo começa com um diagnóstico gratuito ao vivo comigo.
                </p>
              </div>

              <Button 
                size="lg"
                className="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-base sm:text-lg py-6 px-6 sm:px-8 rounded-full shadow-gold group"
                onClick={handleScheduleClick}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar diagnóstico gratuito
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <p className="text-sm text-dark-text/70">
                Clique acima e agende agora – As vagas são limitadas!
              </p>
            </div>

            {/* Credentials Section */}
            <div className="glass-morphism p-6 sm:p-8 rounded-xl space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-dark-primary mb-4">Quem é Manoel Santos?</h2>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ Mestrando em Administração de Empresas</p>
                </div>
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ Pós-Graduado em Marketing e Gestão Empresarial</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ Psicólogo com foco em comportamento organizacional</p>
                </div>
                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ 18 anos de experiência</p>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ Mais de 180 empresas transformadas em 23 estados e 2 países</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-dark-primary" />
                  <p className="text-dark-text/90">✅ Mais de 1 bilhão de reais em vendas geradas</p>
                </div>
              </div>
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
