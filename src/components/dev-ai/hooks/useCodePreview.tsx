
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
    
    // Se é código React/JSX, criar preview HTML simples
    if (generatedCode.includes('import React') || generatedCode.includes('export default')) {
      console.log('🔧 Convertendo código React para preview HTML');
      
      // Extrair JSX básico do componente React
      const jsxMatch = generatedCode.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*}/);
      let jsxContent = '';
      
      if (jsxMatch) {
        jsxContent = jsxMatch[1]
          .replace(/className=/g, 'class=')
          .replace(/\{[^}]*\}/g, '') // Remover expressões JSX simples
          .replace(/\/>/g, '>'); // Converter tags auto-fechadas
      } else {
        // Fallback: mostrar o código como texto
        jsxContent = `<pre style="white-space: pre-wrap; font-family: monospace; padding: 20px; background: #f5f5f5;">${generatedCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
      }
      
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview React Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
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
    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
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
    body { margin: 20px; font-family: monospace; white-space: pre-wrap; }
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
