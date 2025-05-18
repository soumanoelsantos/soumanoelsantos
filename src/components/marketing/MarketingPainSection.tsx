
import React from "react";
import { BarChart4, TrendingUp, LineChart, BarChart, Activity, PieChart, BarChart2, ArrowUpCircle, Calendar, ArrowRight } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const MarketingPainSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-red-500">A Dor do Empresário</span> que Investe no Marketing às Cegas
          </h2>
          
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-10">
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-red-900/30 rounded-full">
                <BarChart4 className="h-10 w-10 text-red-400" />
              </div>
            </div>
            
            <p className="text-xl mb-6 text-gray-300">
              A maioria dos empresários vive uma <strong>situação de incerteza constante</strong> ao investir em marketing digital:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            </div>
            
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
            
            {/* New CRO Section */}
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
            
            <div className="p-5 rounded-lg bg-gray-700/50">
              <p className="text-lg">
                <span className="text-yellow-400 font-bold">A verdade:</span> Sem um sistema profissional de controle de indicadores, você está <strong className="text-red-400">apostando</strong>, não investindo. Meu trabalho é transformar seu marketing em uma máquina previsível de resultados, com <strong className="text-green-400">dados claros</strong> que permitem escalar com segurança.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <LeadCaptureForm 
                source="marketing_pain_section"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-lg py-6 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
                buttonText={
                  <>
                    <Calendar className="mr-2 h-5 w-5" />
                    QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                }
              />
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-3 mb-6 bg-blue-900/20 p-4 rounded-lg">
            <Activity className="text-dark-primary h-6 w-6" />
            <p className="text-lg">
              <strong>Metodologia comprovada</strong> para transformar incertezas em previsibilidade de resultados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingPainSection;
