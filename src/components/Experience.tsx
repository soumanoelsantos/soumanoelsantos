
import { Card } from "@/components/ui/card";
import { ChartBar, Award, Users } from "lucide-react";

const Experience = () => {
  return (
    <div className="py-32 bg-gradient-to-b from-dark-secondary to-[#252525] relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Nossa Excelência</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Resultados Comprovados
          </h2>
          <div className="w-16 h-1 bg-dark-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-morphism rounded-xl p-8 text-center hover-scale">
            <div className="w-16 h-16 rounded-full bg-dark-primary/20 flex items-center justify-center mx-auto mb-6">
              <Users className="text-dark-primary w-8 h-8" />
            </div>
            <div className="text-5xl font-bold text-dark-primary mb-3">180+</div>
            <p className="text-dark-text/70">
              Empresas transformadas em 23 estados e 2 países
            </p>
          </div>
          
          <div className="glass-morphism rounded-xl p-8 text-center hover-scale">
            <div className="w-16 h-16 rounded-full bg-dark-primary/20 flex items-center justify-center mx-auto mb-6">
              <ChartBar className="text-dark-primary w-8 h-8" />
            </div>
            <div className="text-5xl font-bold text-dark-primary mb-3">1B+</div>
            <p className="text-dark-text/70">
              Em vendas geradas para nossos clientes
            </p>
          </div>
          
          <div className="glass-morphism rounded-xl p-8 text-center hover-scale">
            <div className="w-16 h-16 rounded-full bg-dark-primary/20 flex items-center justify-center mx-auto mb-6">
              <Award className="text-dark-primary w-8 h-8" />
            </div>
            <div className="text-5xl font-bold text-dark-primary mb-3">18</div>
            <p className="text-dark-text/70">
              Anos de experiência em Gestão, Marketing e Vendas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
