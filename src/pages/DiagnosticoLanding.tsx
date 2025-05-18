import React from "react";
import { Check, Calendar, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const DiagnosticoLanding = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#0d112b] to-[#1d365c] py-4 px-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-white">Programa Maximus</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-[#0d112b] to-[#1a1a2e] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Está <span className="text-dark-primary">cansado de investir</span> em tráfego pago e <span className="text-dark-primary">não ver resultados?</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Descubra por que suas vendas não escalam — e como resolver isso em apenas 30 minutos
            </p>
            <LeadCaptureForm 
              source="diagnostico_landing"
              buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-lg py-6 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              buttonText="QUERO MEU PLANO DE AÇÃO GRATUITO"
            />
            <p className="mt-3 text-sm text-gray-400">
              Você será redirecionado para agendar seu melhor horário
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="text-red-500">O Problema</span> que você está enfrentando
            </h2>

            <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-10">
              <p className="text-xl mb-6">
                Se você sente que está gastando com anúncios mas:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Não consegue escalar as vendas...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Tem leads que não compram...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Seu time comercial não converte...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Seu produto parece "bom demais" para não estar vendendo...
                </li>
              </ul>
              
              <div className="mt-8 p-4 border-l-4 border-yellow-500 bg-gray-700">
                <p className="text-lg">
                  <span className="text-yellow-400 font-bold">→</span> Então, provavelmente, você não tem um Marketing e Comercial alinhados.
                </p>
              </div>
              
              <div className="mt-6 p-4 border-l-4 border-red-500 bg-gray-700">
                <p className="text-lg">
                  <span className="text-red-500 font-bold">⚠️</span> Tráfego sem estratégia é dinheiro queimado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-[#0d1829]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="text-yellow-400">A Solução</span> para o seu negócio
            </h2>

            <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
              <p className="text-xl mb-6">
                Na reunião gratuita, você vai receber:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <span>Um diagnóstico claro do seu funil de vendas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <span>Um plano de ação com os ajustes mais urgentes</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <span>A visão de um especialista que já ajudou dezenas de empresas</span>
                </li>
              </ul>
              
              <div className="mt-8 flex items-center justify-center text-gray-300">
                <Clock className="h-5 w-5 mr-2" />
                <span>Duração: 30 minutos | Online | Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="text-yellow-500">Depoimentos</span> de quem já participou
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1" />
                  <p className="italic text-gray-300">
                    "Depois dessa reunião, consegui identificar exatamente onde estávamos errando no nosso funil de vendas."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— João Pedro, Consultor Digital</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1" />
                  <p className="italic text-gray-300">
                    "É como se alguém abrisse os olhos pra algo que estava na minha frente o tempo todo."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— Mariana L., Lojista Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#1a1a2e] to-[#0d112b]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-3 flex justify-center">
              <Calendar className="h-10 w-10 text-dark-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vagas limitadas por semana — garanta a sua agora
            </h2>
            <div className="mb-8">
              <LeadCaptureForm 
                source="diagnostico_landing_bottom"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-xl py-6 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO MEU PLANO DE AÇÃO GRATUITO"
              />
              <p className="mt-3 text-sm text-gray-400">
                Você será redirecionado para agendar seu melhor horário
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d112b] py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Programa Maximus. Todos os direitos reservados.</p>
            <p className="mt-2">
              Exclusivo para empresas com faturamento acima de R$ 50 mil por mês.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiagnosticoLanding;
