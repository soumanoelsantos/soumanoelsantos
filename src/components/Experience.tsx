
import { Card } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

const Experience = () => {
  return (
    <div className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark-primary">
          Resultados Comprovados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center bg-dark-accent hover:bg-dark-accent/80 transition-all shadow-modern">
            <div className="text-4xl font-bold text-dark-primary mb-2">180+</div>
            <p className="text-dark-text/70">
              Empresas transformadas em 23 estados e 2 países
            </p>
          </Card>
          <Card className="p-6 text-center bg-dark-accent hover:bg-dark-accent/80 transition-all shadow-modern">
            <div className="text-4xl font-bold text-dark-primary mb-2">1B+</div>
            <p className="text-dark-text/70">Em vendas geradas para nossos clientes</p>
          </Card>
          <Card className="p-6 text-center bg-dark-accent hover:bg-dark-accent/80 transition-all shadow-modern">
            <div className="text-4xl font-bold text-dark-primary mb-2">18</div>
            <p className="text-dark-text/70">
              Anos de experiência em Gestão, Marketing e Vendas
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Experience;
