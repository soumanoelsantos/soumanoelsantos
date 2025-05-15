
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, FileText, TrendingUp, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActionButton from "@/components/ui/action-button";

const Ferramentas = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      {/* Header Section */}
      <header className="bg-gradient-radial text-dark-text relative overflow-hidden pt-8 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <Link to="/" className="text-2xl font-bold text-dark-primary">
              Manoel Santos
            </Link>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10">
                  Login
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-dark-primary hover:bg-dark-primary/90 text-black">
                  Cadastre-se grátis
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ferramentas para <span className="text-dark-primary">acelerar seu negócio</span> gratuitamente
            </h1>
            <p className="text-lg mb-8 text-dark-text/80">
              Acesse ferramentas estratégicas exclusivas que ajudarão você a organizar, planejar e crescer seu negócio
            </p>
            <Link to="/cadastro">
              <ActionButton
                size="lg"
                className="rounded-full px-8 py-6 text-lg group"
              >
                Começar gratuitamente
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ActionButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Tools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossas Ferramentas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Todas as ferramentas foram desenvolvidas com base em anos de experiência 
              prática em empresas de diferentes segmentos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tool Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Teste de Diagnóstico</h3>
              <p className="text-gray-600 mb-4">
                Avalie a situação atual da sua empresa e receba insights personalizados para melhorias
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Análise completa</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Plano de ação</span>
                </div>
              </div>
            </div>
            
            {/* Tool Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Checklist de Contratação</h3>
              <p className="text-gray-600 mb-4">
                Um guia passo a passo para contratar os profissionais certos para sua empresa
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Modelos prontos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Critérios de seleção</span>
                </div>
              </div>
            </div>
            
            {/* Tool Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mapa de Equipe</h3>
              <p className="text-gray-600 mb-4">
                Organize sua equipe e defina responsabilidades para maximizar a produtividade
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Estrutura organizacional</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Definição de papéis</span>
                </div>
              </div>
            </div>
            
            {/* Tool Card 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proposta de Valor Única</h3>
              <p className="text-gray-600 mb-4">
                Defina o que torna seu negócio único e atrativo para seus clientes ideais
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Diferenciação competitiva</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Posicionamento estratégico</span>
                </div>
              </div>
            </div>
            
            {/* Tool Card 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Análise SWOT</h3>
              <p className="text-gray-600 mb-4">
                Identifique forças, fraquezas, oportunidades e ameaças do seu negócio
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Análise completa</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Estratégias recomendadas</span>
                </div>
              </div>
            </div>
            
            {/* Tool Card 6 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-dark-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-dark-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mapa de Negócio</h3>
              <p className="text-gray-600 mb-4">
                Visualize todos os componentes do seu modelo de negócio em um único lugar
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Visão estratégica</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Alinhamento de objetivos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que usar nossas ferramentas?</h2>
            <p className="text-lg text-gray-600">
              Cada ferramenta foi desenvolvida para resolver problemas específicos enfrentados por 
              empreendedores e gestores de pequenas e médias empresas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">100% Gratuitas</h3>
              <p className="text-gray-600">
                Acesso completo a todas as ferramentas sem nenhum custo ou período de teste
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Fáceis de usar</h3>
              <p className="text-gray-600">
                Interface intuitiva e amigável, sem necessidade de conhecimentos técnicos
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Resultados imediatos</h3>
              <p className="text-gray-600">
                Obtenha insights valiosos e planos de ação que você pode implementar hoje mesmo
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Baseadas em experiência</h3>
              <p className="text-gray-600">
                Criadas a partir de anos de experiência prática em consultorias empresariais
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Atualizações constantes</h3>
              <p className="text-gray-600">
                Novas ferramentas e melhorias são adicionadas regularmente
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Suporte comunitário</h3>
              <p className="text-gray-600">
                Acesse exemplos e dicas de outros empreendedores que já utilizaram as ferramentas
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-background text-dark-text">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Comece a transformar seu negócio hoje mesmo
            </h2>
            <p className="text-lg mb-8 text-dark-text/80">
              Crie sua conta gratuitamente e tenha acesso a todas as ferramentas estratégicas
            </p>
            <Link to="/cadastro">
              <ActionButton
                size="lg"
                className="rounded-full px-8 py-6 text-lg"
              >
                Cadastre-se gratuitamente
              </ActionButton>
            </Link>
            <p className="mt-4 text-sm text-dark-text/60">
              Não requer cartão de crédito. Sem cobranças surpresa.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-dark-background border-t border-dark-text/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-text/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} Manoel Santos. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-dark-text/60 hover:text-dark-primary">Início</Link>
              <Link to="/login" className="text-dark-text/60 hover:text-dark-primary">Login</Link>
              <Link to="/cadastro" className="text-dark-text/60 hover:text-dark-primary">Cadastro</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Ferramentas;
