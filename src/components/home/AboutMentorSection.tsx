
import React from "react";
import { Award, Users, TrendingUp, Target } from "lucide-react";

const AboutMentorSection = () => {
  const achievements = [
    {
      icon: TrendingUp,
      number: "200M+",
      text: "Faturamento anual com suas empresas"
    },
    {
      icon: Award,
      number: "80M+",
      text: "Lucro anual gerado"
    },
    {
      icon: Users,
      number: "750+",
      text: "Colaboradores em suas empresas"
    },
    {
      icon: Target,
      number: "15K+",
      text: "Empresários treinados"
    }
  ];

  return (
    <section className="py-20 bg-[#0d112b]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Seu <span className="text-dark-primary">Mentor</span>
            </h2>
            <p className="text-xl text-gray-300">
              Conheça quem vai acelerar sua empresa
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Side */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-br from-dark-primary/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-dark-primary/30">
                  <img
                    src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                    alt="Manoel Santos - Mentor"
                    className="w-full h-[500px] object-contain object-center rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Manoel Santos</h3>
                <p className="text-xl text-dark-primary font-semibold mb-6">
                  Principal referência em gestão e aceleração de pequenas e médias empresas no Brasil
                </p>
                
                <div className="space-y-4 text-gray-300 text-lg">
                  <p>
                    Empresário com excelentes resultados, fundador do Grupo Acelerador, um ecossistema de empresas onde é sócio de 8 negócios.
                  </p>
                  <p>
                    Com mais de <strong className="text-dark-primary">18 anos de experiência</strong> empresarial, tem o propósito de Acelerar o Brasil, ajudando as empresas a se tornarem extraordinárias.
                  </p>
                  <p>
                    É fundador e líder do <strong className="text-dark-primary">Giants</strong>, a maior comunidade de empresários de alto valor no Brasil, com mais de 700 empresários membros.
                  </p>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <achievement.icon className="h-8 w-8 text-dark-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-2">{achievement.number}</div>
                    <div className="text-sm text-gray-300">{achievement.text}</div>
                  </div>
                ))}
              </div>

              <div className="bg-dark-primary/20 p-6 rounded-2xl border border-dark-primary/30">
                <p className="text-white font-semibold text-center text-lg">
                  "Processos Inteligentes + Talentos Competentes = Resultados Acelerados"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMentorSection;
