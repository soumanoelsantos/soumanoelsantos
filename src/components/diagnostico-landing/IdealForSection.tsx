
import React from "react";
import { Check } from "lucide-react";

const IdealForSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-dark-primary">Quem Deve</span> Solicitar o Plano de Ação?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center text-dark-primary border-b border-gray-700 pb-3">
                Tipos de Negócios
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Mentores que vendem <strong>produtos high ticket</strong> online</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que fazem <strong>lançamentos digitais</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span><strong>Escritórios de advocacia e contabilidade</strong> que querem escalar</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span><strong>Agências e consultorias</strong> que buscam aumentar ticket médio</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span><strong>Clínicas de estética, odontologia, empresas de energia solar</strong> ou qualquer outra empresas que queira escalar suas vendas usando a internet</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center text-dark-primary border-b border-gray-700 pb-3">
                Cenários de Empresas
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que <strong>investem em tráfego</strong> mas não convertem os leads</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que <strong>precisam contratar e treinar</strong> time de vendas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que <strong>já perderam dinheiro</strong> tentando vender high ticket</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que <strong>precisam criar novos funis</strong> de vendas no marketing</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-dark-primary/20 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-dark-primary" />
                  </div>
                  <span>Empresas que <strong>querem escalar resultados</strong> de forma profissional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdealForSection;
