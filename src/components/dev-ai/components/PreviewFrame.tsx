
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Code, Globe } from 'lucide-react';

interface PreviewFrameProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  previewHtml: string;
  onLoad: () => void;
  onError?: (error: any) => void;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ 
  iframeRef, 
  previewHtml, 
  onLoad,
  onError 
}) => {
  const getDefaultWebsiteHtml = (): string => {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeuSite - Site Demonstrativo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        .transition-all { transition: all 0.3s ease; }
        .hover\\:scale-105:hover { transform: scale(1.05); }
        .hover\\:bg-blue-700:hover { background-color: rgb(29 78 216); }
        .hover\\:bg-green-600:hover { background-color: rgb(22 163 74); }
        .hover\\:text-blue-600:hover { color: rgb(37 99 235); }
        .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    </style>
</head>
<body>
    <div id="app">
        <!-- Navigation -->
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <div class="text-2xl font-bold text-blue-600">
                        MeuSite
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <button onclick="showPage('home')" class="nav-btn font-medium transition-colors text-blue-600 border-b-2 border-blue-600">
                            Início
                        </button>
                        <button onclick="showPage('about')" class="nav-btn font-medium transition-colors text-gray-600 hover:text-blue-600">
                            Sobre
                        </button>
                        <button onclick="showPage('services')" class="nav-btn font-medium transition-colors text-gray-600 hover:text-blue-600">
                            Serviços
                        </button>
                        <button onclick="showPage('contact')" class="nav-btn font-medium transition-colors text-gray-600 hover:text-blue-600">
                            Contato
                        </button>
                    </div>
                    
                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button class="text-gray-600 hover:text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Home Page -->
        <div id="home-page" class="page">
            <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div class="container mx-auto px-4 py-16">
                    <div class="text-center">
                        <h1 class="text-5xl font-bold text-gray-800 mb-6">
                            Bem-vindo ao Nosso Site
                        </h1>
                        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Oferecemos soluções inovadoras para o seu negócio crescer e prosperar no mercado digital.
                        </p>
                        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                            Comece Agora
                        </button>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8 mt-16">
                        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span class="text-blue-600 text-xl">🚀</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Inovação</h3>
                            <p class="text-gray-600">Soluções tecnológicas de ponta para impulsionar seu negócio.</p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span class="text-green-600 text-xl">💡</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Criatividade</h3>
                            <p class="text-gray-600">Designs únicos e experiências memoráveis para seus clientes.</p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span class="text-purple-600 text-xl">⭐</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Qualidade</h3>
                            <p class="text-gray-600">Padrões elevados de qualidade em todos os nossos projetos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Page -->
        <div id="about-page" class="page hidden">
            <div class="min-h-screen bg-gray-50 py-16">
                <div class="container mx-auto px-4">
                    <div class="max-w-4xl mx-auto">
                        <h1 class="text-4xl font-bold text-center mb-8">Sobre Nós</h1>
                        <div class="bg-white rounded-lg shadow-md p-8">
                            <p class="text-lg text-gray-700 mb-6">
                                Somos uma empresa dedicada a fornecer soluções digitais inovadoras que transformam negócios e criam valor para nossos clientes.
                            </p>
                            <p class="text-lg text-gray-700 mb-6">
                                Nossa equipe é composta por profissionais experientes e apaixonados por tecnologia, design e resultados excepcionais.
                            </p>
                            <div class="grid md:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h3 class="text-xl font-semibold mb-4">Nossa Missão</h3>
                                    <p class="text-gray-600">Democratizar o acesso à tecnologia e ajudar empresas a alcançarem seu potencial máximo.</p>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold mb-4">Nossa Visão</h3>
                                    <p class="text-gray-600">Ser referência em inovação tecnológica e excelência em atendimento ao cliente.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Services Page -->
        <div id="services-page" class="page hidden">
            <div class="min-h-screen bg-white py-16">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold text-center mb-12">Nossos Serviços</h1>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">🌐</div>
                            <h3 class="text-xl font-semibold mb-2">Desenvolvimento Web</h3>
                            <p class="text-gray-600">Sites modernos e responsivos</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">📱</div>
                            <h3 class="text-xl font-semibold mb-2">Marketing Digital</h3>
                            <p class="text-gray-600">Estratégias para aumentar sua presença online</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">💼</div>
                            <h3 class="text-xl font-semibold mb-2">Consultoria</h3>
                            <p class="text-gray-600">Orientação especializada para seu negócio</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">🎨</div>
                            <h3 class="text-xl font-semibold mb-2">Design Gráfico</h3>
                            <p class="text-gray-600">Identidade visual marcante</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">🛒</div>
                            <h3 class="text-xl font-semibold mb-2">E-commerce</h3>
                            <p class="text-gray-600">Lojas virtuais completas</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all">
                            <div class="text-3xl mb-4">🔧</div>
                            <h3 class="text-xl font-semibold mb-2">Suporte Técnico</h3>
                            <p class="text-gray-600">Assistência especializada 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Page -->
        <div id="contact-page" class="page hidden">
            <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold text-center mb-12">Entre em Contato</h1>
                    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <div class="bg-white p-8 rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
                            <form class="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Seu Nome" 
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Seu Email" 
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea 
                                    placeholder="Sua Mensagem" 
                                    rows="5"
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                <button type="button" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold mb-6">Informações de Contato</h2>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <span class="text-2xl mr-4">📍</span>
                                    <div>
                                        <p class="font-semibold">Endereço</p>
                                        <p class="text-gray-600">Rua das Flores, 123 - São Paulo, SP</p>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-2xl mr-4">📞</span>
                                    <div>
                                        <p class="font-semibold">Telefone</p>
                                        <p class="text-gray-600">(11) 99999-9999</p>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-2xl mr-4">✉️</span>
                                    <div>
                                        <p class="font-semibold">Email</p>
                                        <p class="text-gray-600">contato@empresa.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentPage = 'home';

        function showPage(page) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
            
            // Show selected page
            document.getElementById(page + '-page').classList.remove('hidden');
            
            // Update navigation
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
                btn.classList.add('text-gray-600');
            });
            
            // Highlight active nav
            event.target.classList.remove('text-gray-600');
            event.target.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            
            currentPage = page;
        }
    </script>
</body>
</html>`;
  };

  const generatePreviewHtml = (code: string): string => {
    // Se não há código, usar o site demonstrativo
    if (!code || code.trim().length === 0) {
      return getDefaultWebsiteHtml();
    }

    // Se é um HTML completo, usar diretamente
    if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
      return code;
    }

    // Se é um componente React, gerar um HTML que renderiza o componente
    if (code.includes('import React') || code.includes('export default') || code.includes('const ') && code.includes('return')) {
      // Extrair JSX do componente React
      const jsxMatch = code.match(/return\s*\(([\s\S]*?)\);?\s*};\s*$/);
      const jsxContent = jsxMatch ? jsxMatch[1].trim() : '';
      
      if (jsxContent) {
        return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview do Componente</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
        .error { color: red; padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px; }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        try {
            ${code.replace(/export default/g, 'const Component =')}
            
            const App = () => {
                return React.createElement(Component, null);
            };
            
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(App));
        } catch (error) {
            console.error('Erro ao renderizar componente:', error);
            document.getElementById('root').innerHTML = 
                '<div class="error"><h3>Erro ao renderizar componente</h3><p>' + error.message + '</p></div>';
        }
    </script>
</body>
</html>`;
      }
    }

    // Para outros tipos de código, tentar renderizar como HTML
    if (code.includes('<') && code.includes('>')) {
      return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
    }

    // Se não conseguir identificar o tipo, usar o site demonstrativo
    return getDefaultWebsiteHtml();
  };

  useEffect(() => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const htmlToRender = generatePreviewHtml(previewHtml);
        
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (doc) {
          doc.open();
          doc.write(htmlToRender);
          doc.close();
          
          if (iframe.contentWindow) {
            iframe.contentWindow.addEventListener('error', (error) => {
              console.error('Erro JavaScript no preview:', error);
              onError?.(error);
            });
            
            iframe.contentWindow.addEventListener('unhandledrejection', (error) => {
              console.error('Promise rejeitada no preview:', error);
              onError?.(error);
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar HTML no iframe:', error);
        onError?.(error);
      }
    }
  }, [previewHtml, iframeRef, onError]);

  return (
    <div className="w-full h-full bg-white">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        onLoad={onLoad}
        onError={(e) => {
          console.error('Erro no iframe:', e);
          onError?.(e);
        }}
      />
    </div>
  );
};

export default PreviewFrame;
