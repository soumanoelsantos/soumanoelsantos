
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
  const generatePreviewHtml = (code: string): string => {
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

    // Se não conseguir identificar o tipo, mostrar mensagem explicativa
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <div class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Código Não Renderizável</h3>
            <p class="text-gray-600 text-sm">Este tipo de código não pode ser visualizado como preview. Use a aba "Código" para ver o código fonte.</p>
        </div>
    </div>
</body>
</html>`;
  };

  useEffect(() => {
    if (iframeRef.current && previewHtml) {
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
