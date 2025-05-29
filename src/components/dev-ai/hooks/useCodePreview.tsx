
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useCodePreview = (generatedCode: string) => {
  const { toast } = useToast();
  const [showCode, setShowCode] = useState(true); // Sempre mostrar código por padrão
  const [currentUrl, setCurrentUrl] = useState('React Code');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Código copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const downloadCode = () => {
    // Sempre baixar como arquivo React/TypeScript
    const fileName = 'component.tsx';
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
      description: "O arquivo React foi baixado com sucesso.",
    });
  };

  const openInNewTab = () => {
    // Abrir código React em nova aba
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <title>React Code</title>
            <style>
              body { 
                font-family: 'Fira Code', 'Courier New', monospace; 
                margin: 20px; 
                background: #1e1e1e; 
                color: #d4d4d4;
              }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word;
                background: #1e1e1e;
                padding: 20px;
                border-radius: 8px;
                overflow-x: auto;
              }
            </style>
          </head>
          <body>
            <h2>Código React Gerado</h2>
            <pre><code>${generatedCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </body>
        </html>
      `);
      newTab.document.close();
      toast({
        title: "Nova aba aberta!",
        description: "O código React foi aberto em uma nova aba.",
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
    // Apenas atualizar a visualização do código
    toast({
      title: "Código atualizado!",
      description: "A visualização foi atualizada.",
    });
  };

  const goBack = () => {
    // Não aplicável para visualização de código
  };

  const goForward = () => {
    // Não aplicável para visualização de código
  };

  const getPreviewHtml = () => {
    // Retornar código React puro sem conversão
    return generatedCode || '';
  };

  return {
    showCode: true, // Sempre mostrar código
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
