
import React from "react";
import { BarChart, LineChart } from "lucide-react";

const PredictabilityCard = () => {
  return (
    <>
      <div className="bg-red-900/20 p-6 rounded-lg border border-red-800/30">
        <h3 className="font-bold text-xl mb-4 text-red-400 flex items-center">
          <span className="bg-red-900/40 p-2 rounded-full mr-3">
            <BarChart className="h-5 w-5 text-red-300" />
          </span>
          Investimento sem Visibilidade
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span>Não sabe quanto cada canal realmente <strong>retorna em ROI</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span>Decisões baseadas em <strong>achismos</strong>, não em dados concretos</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span>Fica <strong>refém de parceiros</strong> que não entregam relatórios claros</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-red-900/20 p-6 rounded-lg border border-red-800/30">
        <h3 className="font-bold text-xl mb-4 text-red-400 flex items-center">
          <span className="bg-red-900/40 p-2 rounded-full mr-3">
            <LineChart className="h-5 w-5 text-red-300" />
          </span>
          Falta de Previsibilidade
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span>Não consegue <strong>prever resultados</strong> de novos investimentos</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span><strong>Insegurança</strong> para escalar os investimentos</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span> 
            <span>Dificuldade para tomar <strong>decisões estratégicas</strong></span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PredictabilityCard;
