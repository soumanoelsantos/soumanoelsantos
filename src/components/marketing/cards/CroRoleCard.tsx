
import React from "react";
import { BarChart2, ArrowUpCircle } from "lucide-react";

const CroRoleCard = () => {
  return (
    <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-800/30 mb-8">
      <h3 className="font-bold text-xl mb-4 text-purple-400 flex items-center">
        <span className="bg-purple-900/40 p-2 rounded-full mr-3">
          <BarChart2 className="h-5 w-5 text-purple-300" />
        </span>
        Como CRO, transformo seu crescimento em algo previsível e sustentável
      </h3>
      
      <p className="text-lg mb-4 text-gray-300">
        Como <strong>Chief Revenue Officer (CRO)</strong>, meu papel é garantir que sua empresa cresça de forma estratégica, alinhando marketing, vendas e produto em um único objetivo: <span className="text-purple-300">aumento de receita</span>.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="bg-purple-900/10 p-4 rounded-lg">
          <h4 className="font-semibold text-md mb-3 text-purple-300 flex items-center">
            <ArrowUpCircle className="h-4 w-4 text-purple-400 mr-2" />
            O que faço
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span> 
              <span>Alinhar times de <strong>marketing, vendas e sucesso do cliente</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span> 
              <span>Desenvolver <strong>estratégias de crescimento</strong> personalizadas</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span> 
              <span>Implementar <strong>gestão orientada por dados</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span> 
              <span>Otimizar <strong>processos e times</strong> para escalar</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-green-900/10 p-4 rounded-lg">
          <h4 className="font-semibold text-md mb-3 text-green-300 flex items-center">
            <ArrowUpCircle className="h-4 w-4 text-green-400 mr-2" />
            Benefícios para sua empresa
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Crescimento de receita</strong> previsível e escalável</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Redução de atritos</strong> entre áreas com metas diferentes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span>Time comercial <strong>mais eficiente</strong> e focado em dados</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span> 
              <span><strong>Clientes mais satisfeitos</strong> e com maior retenção</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CroRoleCard;
