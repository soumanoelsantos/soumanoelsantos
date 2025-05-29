
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useCodePreview = (generatedCode: string) => {
  const { toast } = useToast();
  const [showCode, setShowCode] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('Preview');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Código copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const downloadCode = () => {
    // Detectar se é React ou HTML
    const fileName = generatedCode.includes('import React') ? 'component.tsx' : 'generated-code.html';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O arquivo foi baixado com sucesso.",
    });
  };

  const openInNewTab = () => {
    const previewHtml = getPreviewHtml();
    if (!previewHtml) {
      toast({
        title: "Erro",
        description: "Nenhum código para visualizar.",
        variant: "destructive"
      });
      return;
    }

    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(previewHtml);
      newTab.document.close();
      toast({
        title: "Nova aba aberta!",
        description: "O preview foi aberto em uma nova aba.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível abrir uma nova aba. Verifique se o bloqueador de pop-ups está desabilitado.",
        variant: "destructive"
      });
    }
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    toast({
      title: "Preview atualizado!",
      description: "A página foi recarregada.",
    });
  };

  const goBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const goForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const getPreviewHtml = () => {
    if (!generatedCode) return '';
    
    console.log('Preparando HTML para preview:', generatedCode.substring(0, 200));
    
    // Se o código já é um documento HTML completo
    if (generatedCode.includes('<!DOCTYPE html>') || generatedCode.includes('<html')) {
      return generatedCode;
    }
    
    // Se é código React/JSX, criar um preview HTML interpretado
    if (generatedCode.includes('import React') || generatedCode.includes('export default')) {
      console.log('🔧 Criando preview para código React');
      
      // Extrair o nome do componente
      const componentNameMatch = generatedCode.match(/export default (\w+)/);
      const componentName = componentNameMatch ? componentNameMatch[1] : 'Componente';
      
      // Extrair JSX do return statement
      const returnMatch = generatedCode.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*}/);
      let jsxContent = '';
      
      if (returnMatch) {
        jsxContent = returnMatch[1]
          .replace(/className=/g, 'class=')
          .replace(/\{[^}]*\}/g, '') // Remover expressões JSX simples
          .replace(/\/>/g, '>'); // Converter tags auto-fechadas
        
        // Limpar código JSX complexo e manter apenas HTML básico
        jsxContent = jsxContent
          .replace(/\{.*?\}/g, '') // Remover todas as expressões JSX
          .replace(/onClick=.*?(?=\s|\/>|>)/g, '') // Remover handlers
          .replace(/onChange=.*?(?=\s|\/>|>)/g, '') // Remover handlers
          .replace(/onSubmit=.*?(?=\s|\/>|>)/g, '') // Remover handlers
          .replace(/setState.*?(?=\s|\/>|>)/g, ''); // Remover estado
      } else {
        // Se não conseguir extrair JSX, mostrar informações do componente
        jsxContent = `
          <div class="p-8 max-w-4xl mx-auto">
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Componente React: ${componentName}</h1>
                <p class="text-gray-600 text-lg">Componente React criado com sucesso!</p>
                <div class="mt-6 p-4 bg-white rounded-lg border">
                  <p class="text-sm text-gray-500">Este é um preview simplificado do componente React gerado.</p>
                  <p class="text-sm text-gray-500 mt-2">Para ver o código completo, clique na aba "Código".</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview - ${componentName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; }
  </style>
</head>
<body>
  ${jsxContent}
</body>
</html>`;
    }
    
    // Se contém tags HTML mas não é documento completo
    if (generatedCode.includes('<')) {
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
  </style>
</head>
<body>
  ${generatedCode}
</body>
</html>`;
    }
    
    // Se não é HTML, mostrar como texto
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    body { margin: 20px; font-family: monospace; white-space: pre-wrap; background: #f8fafc; }
  </style>
</head>
<body>${generatedCode}</body>
</html>`;
  };

  return {
    showCode,
    setShowCode,
    currentUrl,
    setCurrentUrl,
    iframeRef,
    copyToClipboard,
    downloadCode,
    openInNewTab,
    refreshPreview,
    goBack,
    goForward,
    getPreviewHtml
  };
};
