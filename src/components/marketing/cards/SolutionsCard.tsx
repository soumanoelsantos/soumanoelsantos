
import React from "react";
import { PieChart } from "lucide-react";

const SolutionsCard = () => {
  return (
    <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-800/30 mb-8">
      <h3 className="font-bold text-xl mb-4 text-blue-400 flex items-center">
        <span className="bg-blue-900/40 p-2 rounded-full mr-3">
          <PieChart className="h-5 w-5 text-blue-300" />
        </span>
        Algumas das soluções que colocarei de forma personalizada para sua empresa no seu plano de ação gratuito
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Dashboard completo</strong> com todos os indicadores críticos</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Rastreamento preciso</strong> do ROI de cada canal</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span>Implementação de <strong>métricas de conversão</strong> em cada etapa</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Modelos preditivos</strong> para projetar resultados</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Planejamento estratégico</strong> detalhado passo a passo</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span>Metodologia <strong>validada e testada</strong> em mais de 160 empresas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SolutionsCard;
