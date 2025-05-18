
import React from "react";

const ProblemSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-red-500">Os Problemas</span> que estão travando seu crescimento
          </h2>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-10">
            <p className="text-xl mb-6">
              Se você se identifica com um destes cenários:
            </p>
            <ul className="space-y-6 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 text-xl">—</span> 
                <div>
                  <span className="font-bold text-white">Investe pesado em tráfego</span>
                  <span>, mas seus leads não se convertem em vendas...</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 text-xl">—</span> 
                <div>
                  <span>Seu time comercial não tem </span>
                  <span className="font-bold text-white">processos estruturados nem treinamento adequado</span>
                  <span>...</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 text-xl">—</span> 
                <div>
                  <span className="font-bold text-white">Gasta muito em marketing</span>
                  <span>, mas o ROI é baixo ou inexistente...</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 text-xl">—</span> 
                <div>
                  <span className="font-bold text-white">Não há acompanhamento e gestão efetiva</span>
                  <span> dos vendedores e resultados...</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 text-xl">—</span> 
                <div>
                  <span>Tentou vender </span>
                  <span className="font-bold text-white">produtos high ticket</span>
                  <span> (mentorias, cursos, consultorias) sem sucesso...</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 p-4 border-l-4 border-yellow-500 bg-gray-700">
              <p className="text-lg">
                <span className="text-yellow-400 font-bold">→</span> O problema não está apenas no seu produto ou no tráfego, mas na <strong>falta de estruturação profissional do seu comercial</strong>.
              </p>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-red-500 bg-gray-700">
              <p className="text-lg">
                <span className="text-red-500 font-bold">⚠️</span> <strong>Você está literalmente rasgando dinheiro</strong> ao investir em tráfego sem uma estratégia comercial estruturada e processos definidos.
              </p>
            </div>
          </div>

          <TargetMarkets />
        </div>
      </div>
    </section>
  );
};

const TargetMarkets = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Briefcase className="h-6 w-6 text-dark-primary mr-3" />
          <h3 className="text-xl font-bold">Para quem é ideal?</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Mentores que vendem <strong>produtos high ticket</strong> online</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Escritórios de <strong>advocacia e contabilidade</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span><strong>Agências e consultorias</strong> que querem escalar</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Empresas que fazem <strong>lançamentos digitais</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Clínicas de <strong>estética e odontologia</strong>, <strong>energia solar</strong> ou qualquer outra empresas que queira escalar suas vendas usando a internet</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-dark-primary mr-3" />
          <h3 className="text-xl font-bold">Resultados comprovados</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Crescimento de <strong>+900% em 8 meses</strong> com grandes players</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Mais de <strong>160 empresas aceleradas</strong> no Brasil e Portugal</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span> 
            <span>Atualmente acompanhamos várias operações no digital que faturam mais de 1 milhão/mês</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Need to add the import for icons
import { Briefcase, Target } from "lucide-react";

export default ProblemSection;
