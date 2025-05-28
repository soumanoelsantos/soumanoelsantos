
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Download, Play, Code } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import { useToast } from '@/hooks/use-toast';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
  const { toast } = useToast();
  const [showCode, setShowCode] = useState(false);

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
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-gray-900">Preview</h2>
            <Button
              variant={showCode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              <Code className="h-4 w-4 mr-1" />
              {showCode ? 'Voltar ao Preview' : 'Ver Código'}
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCode}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {showCode ? (
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full bg-white border">
            <iframe
              className="w-full h-full border-0"
              title="Preview"
              srcDoc={getPreviewHtml()}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
