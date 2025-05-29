
import React, { useState } from 'react';

const SimpleWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Bem-vindo ao Nosso Site
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oferecemos soluções inovadoras para o seu negócio crescer e prosperar no mercado digital.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Comece Agora
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Inovação</h3>
            <p className="text-gray-600">Soluções tecnológicas de ponta para impulsionar seu negócio.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Criatividade</h3>
            <p className="text-gray-600">Designs únicos e experiências memoráveis para seus clientes.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
            <p className="text-gray-600">Padrões elevados de qualidade em todos os nossos projetos.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Sobre Nós</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-700 mb-6">
              Somos uma empresa dedicada a fornecer soluções digitais inovadoras que transformam negócios e criam valor para nossos clientes.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nossa equipe é composta por profissionais experientes e apaixonados por tecnologia, design e resultados excepcionais.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
                <p className="text-gray-600">Democratizar o acesso à tecnologia e ajudar empresas a alcançarem seu potencial máximo.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
                <p className="text-gray-600">Ser referência em inovação tecnológica e excelência em atendimento ao cliente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Desenvolvimento Web", desc: "Sites modernos e responsivos", icon: "🌐" },
            { title: "Marketing Digital", desc: "Estratégias para aumentar sua presença online", icon: "📱" },
            { title: "Consultoria", desc: "Orientação especializada para seu negócio", icon: "💼" },
            { title: "Design Gráfico", desc: "Identidade visual marcante", icon: "🎨" },
            { title: "E-commerce", desc: "Lojas virtuais completas", icon: "🛒" },
            { title: "Suporte Técnico", desc: "Assistência especializada 24/7", icon: "🔧" }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Entre em Contato</h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu Nome" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                placeholder="Seu Email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Sua Mensagem" 
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-gray-600">Rua das Flores, 123 - São Paulo, SP</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-gray-600">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-4">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">contato@empresa.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">
              MeuSite
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'services', label: 'Serviços' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`font-medium transition-colors ${
                    currentPage === item.id 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {renderPage()}
    </div>
  );
};

export default SimpleWebsite;
