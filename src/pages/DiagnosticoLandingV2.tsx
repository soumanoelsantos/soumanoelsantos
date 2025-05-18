import React, { useState } from "react";
import { Check, Calendar, Clock, MessageSquare, PlayCircle, Target, TrendingUp, Users, Briefcase, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CountdownTimer from "@/components/CountdownTimer";

const DiagnosticoLandingV2 = () => {
  const [showUrgency, setShowUrgency] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#0d112b] to-[#1d365c] py-4 px-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-white">Programa Maximus | <span className="text-dark-primary">Aceleração de Vendas</span></h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-[#0d112b] to-[#1a1a2e] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 bg-red-600/30 rounded-full text-red-300 font-medium">
              Exclusivo para empresas com faturamento acima de R$ 50 mil/mês
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Está <span className="text-red-500">jogando dinheiro fora</span> com tráfego enquanto seu <span className="text-dark-primary">comercial não converte</span>?
            </h1>
            
            <p className="text-xl mb-8 text-gray-300">
              Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para estruturar seu comercial profissionalmente e <strong>DOBRAR</strong> seu faturamento em 90 dias!
            </p>
            
            {showUrgency && (
              <div className="mb-6 flex flex-col items-center">
                <p className="text-yellow-400 font-medium mb-2">Vagas limitadas para hoje</p>
                <CountdownTimer 
                  initialMinutes={30} 
                  initialSeconds={0} 
                  className="mb-4 text-yellow-400"
                />
              </div>
            )}
            
            <div className="mb-6">
              <LeadCaptureForm 
                source="diagnostico_landing_v2"
                showChallengeField={true}
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-lg py-6 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO"
              />
              <p className="mt-3 text-sm text-gray-400">
                Você será redirecionado para agendar seu melhor horário
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <img
                src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
                alt="Estrategista Digital - Manoel Santos"
                className="w-64 h-64 rounded-full object-cover border-4 border-dark-primary shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> <strong>Investe pesado em tráfego</strong>, mas seus leads não se convertem em vendas...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Seu time comercial não tem <strong>processos estruturados nem treinamento adequado</strong>...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> <strong>Gasta muito em marketing</strong>, mas o ROI é baixo ou inexistente...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> <strong>Não há acompanhamento e gestão efetiva</strong> dos vendedores e resultados...
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">—</span> Tentou vender <strong>produtos high ticket</strong> (mentorias, cursos, consultorias) sem sucesso...
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

            {/* Target Markets */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-dark-primary mr-3" />
                  <h3 className="text-xl font-bold">Para quem é ideal?</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span> 
                    <span>Vendedores de <strong>mentorias e cursos high ticket</strong></span>
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
                    <span>Gestão de <strong>empresas que faturam mais de 1 milhão/mês</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Wasted Money Section */}
      <section className="py-16 bg-[#0d1829]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="text-red-500">Pare de Rasgar Dinheiro</span> com Tráfego Sem Retorno
            </h2>
            
            <div className="bg-gray-800/50 rounded-lg p-8 shadow-lg mb-10 border border-red-900/30">
              <p className="text-xl mb-8 text-gray-300">
                Muitos empresários acreditam que o problema está apenas na geração de leads, mas a verdade é que:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-900/20 p-5 rounded-lg border border-red-800/30">
                  <h3 className="font-bold text-xl mb-3 text-red-400">O que empresários fazem:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span> Aumentam investimento em tráfego constantemente
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span> Trocam de agência ou consultor frequentemente
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span> Culpam a "qualidade dos leads" pelo baixo resultado
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span> Ignoram as falhas no processo comercial interno
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-900/20 p-5 rounded-lg border border-green-800/30">
                  <h3 className="font-bold text-xl mb-3 text-green-400">O que realmente funciona:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Estruturar processos comerciais profissionais
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Implementar treinamento constante de vendedores
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Criar sistemas de gestão e acompanhamento
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Alinhar marketing e vendas com estratégia integrada
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-lg bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30 mt-6">
                <strong className="text-yellow-400">A verdade inconveniente:</strong> Seu negócio não tem um problema de tráfego, mas sim um problema de <strong>estrutura comercial profissional</strong>. Sem isso, qualquer investimento em marketing é praticamente dinheiro desperdiçado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Solution Section */}
      <section className="py-16 bg-[#0d1829]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="text-yellow-400">A Solução Completa</span> para escalar seu negócio digital
            </h2>

            <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
              <div className="flex justify-center mb-8">
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="bg-blue-900/30 rounded-full px-4 py-1 text-sm font-medium text-blue-300">Gestão Comercial</span>
                  <span className="bg-green-900/30 rounded-full px-4 py-1 text-sm font-medium text-green-300">Aceleração de Vendas</span>
                  <span className="bg-purple-900/30 rounded-full px-4 py-1 text-sm font-medium text-purple-300">Alta Performance</span>
                  <span className="bg-yellow-900/30 rounded-full px-4 py-1 text-sm font-medium text-yellow-300">Estratégias de Vendas</span>
                </div>
              </div>
              
              <p className="text-xl mb-6">
                A <strong>estruturação profissional completa</strong> que farei para sua empresa:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700/50 p-6 rounded-lg border border-blue-900/30">
                  <h3 className="font-bold text-xl mb-4 text-blue-300">Comercial</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Estruturação de processos comerciais</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Treinamento de SDRs e Closers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Processo seletivo para equipe</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Acompanhamento de métricas</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg border border-green-900/30">
                  <h3 className="font-bold text-xl mb-4 text-green-300">Marketing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Criação de funis de vendas otimizados</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Otimização de tráfego pago</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Estratégias de captação de leads</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Alinhamento entre MKT e vendas</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg border border-purple-900/30">
                  <h3 className="font-bold text-xl mb-4 text-purple-300">Produto</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Estruturação de ofertas high ticket</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Definição de proposta de valor única</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Posicionamento estratégico</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span>Modelo de negócio escalável</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/30 mb-6">
                <p className="text-lg">
                  Na consultoria gratuita, você receberá um diagnóstico completo e um <strong>plano de ação personalizado</strong> para estruturar seu negócio digital profissionalmente, garantindo o máximo de ROI em seus investimentos.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-center text-gray-300">
                <Clock className="h-5 w-5 mr-2" />
                <span>Duração: 30 minutos | Online | Sem compromisso</span>
              </div>

              <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <div className="flex">
                  <Handshake className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-blue-200">
                    Como <strong>conselheiro e estrategista digital</strong>, já implementei estas estratégias em mais de 160 empresas no Brasil e Portugal, desde pequenos negócios até players que faturam mais de 1 milhão por mês, resultando em crescimentos de até <strong>900% em apenas 8 meses</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section - Enhanced */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="text-dark-primary">Quem Deve</span> Estruturar o Comercial?
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
                    <span>Empresas que vendem <strong>mentorias e cursos high ticket</strong></span>
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
                    <span>Qualquer empresa que queira <strong>vender no digital de forma profissional</strong></span>
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

      {/* Video Testimonial Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="text-yellow-500">Depoimento</span> real de um cliente
            </h2>
            
            <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/D4NPk7ZgmGU?si=YWF7se3PVbrb-N6D" 
                title="Depoimento de cliente" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="flex items-center justify-center mt-6 mb-8">
              <PlayCircle className="h-6 w-6 text-dark-primary mr-3" />
              <p className="text-lg text-gray-300">Assista o depoimento completo e descubra como transformamos os resultados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="text-yellow-500">Depoimentos</span> de clientes reais
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="italic text-gray-300">
                    "Após implementar as estratégias de comercial que o Manoel sugeriu, conseguimos triplicar nosso ticket médio na venda da nossa mentoria."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— Carlos M., CEO de Agência Digital</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="italic text-gray-300">
                    "Nossa equipe de vendas estava com dificuldade para fechar contratos de alto valor. Após a consultoria, nosso fechamento aumentou 78%."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— Ana F., Escritório de Advocacia</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="italic text-gray-300">
                    "Investimos pesado em tráfego mas não convertia. O problema era nossa falta de processos comerciais. Com as mudanças sugeridas, nosso ROI aumentou 4x."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— Rafael S., Lançamentos Digitais</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="italic text-gray-300">
                    "O treinamento da nossa equipe comercial e a implementação dos processos fez toda diferença para vendermos nossos pacotes premium."
                  </p>
                </div>
                <p className="text-sm text-gray-400">— Mariana L., Consultoria Empresarial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0d112b]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-dark-primary">Números</span> que falam por si
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
                <div className="text-4xl font-bold mb-2 text-white">+900%</div>
                <p className="text-gray-400">Crescimento em vendas de clientes em 8 meses</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
                <div className="text-4xl font-bold mb-2 text-white">+160</div>
                <p className="text-gray-400">Empresas aceleradas no Brasil e Portugal</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
                <div className="text-4xl font-bold mb-2 text-white">80%</div>
                <p className="text-gray-400">De aumento médio na conversão de vendas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Mini Form */}
      <section className="py-16 bg-gradient-to-b from-[#1a1a2e] to-[#0d112b]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-3 flex justify-center">
              <Calendar className="h-10 w-10 text-dark-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Escale seu negócio digital profissionalmente — garanta sua vaga agora
            </h2>
            
            <Button
              onClick={() => setShowUrgency(!showUrgency)}
              className="mb-6 text-sm bg-transparent border border-gray-600 hover:bg-gray-800 text-gray-400"
            >
              {showUrgency ? "Ocultar contador" : "Mostrar urgência com contador"}
            </Button>
            
            <div className="mb-8">
              <LeadCaptureForm 
                source="diagnostico_landing_v2_bottom"
                showChallengeField={true}
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-xl py-6 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO ESTRUTURAR MEU NEGÓCIO DIGITAL"
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

export default DiagnosticoLandingV2;
