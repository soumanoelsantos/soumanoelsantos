import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Download, Code, RefreshCw, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import { useToast } from '@/hooks/use-toast';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
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
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O arquivo foi baixado com sucesso.",
    });
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

  // Preparar o HTML para o preview
  const getPreviewHtml = () => {
    if (!generatedCode) return '';
    
    console.log('Preparando HTML para preview:', generatedCode);
    
    // Se o código já é um documento HTML completo
    if (generatedCode.includes('<!DOCTYPE html>') || generatedCode.includes('<html')) {
      return generatedCode;
    }
    
    // Se contém tags HTML mas não é documento completo
    if (generatedCode.includes('<')) {
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
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

  return (
    <div className="flex flex-col h-full">
      {/* Header com controles */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-semibold text-gray-900">Preview</h2>
            <Button
              variant={showCode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="h-7 px-2 text-xs"
            >
              <Code className="h-3 w-3 mr-1" />
              {showCode ? 'Preview' : 'Código'}
            </Button>
          </div>
          
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-7 px-2">
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCode} className="h-7 px-2">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Navegação do browser */}
        {!showCode && (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="h-6 w-6 p-0"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goForward}
              className="h-6 w-6 p-0"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPreview}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            <div className="flex items-center flex-1 bg-white border rounded px-2 py-1">
              <Globe className="h-3 w-3 text-gray-400 mr-2" />
              <span className="text-xs text-gray-600 truncate">{currentUrl}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        {showCode ? (
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full bg-white border">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Preview"
              srcDoc={getPreviewHtml()}
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={() => setCurrentUrl('Preview Loaded')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
