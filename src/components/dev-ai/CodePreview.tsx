
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Download, Play, Code } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import { useToast } from '@/hooks/use-toast';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
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

  // Atualizar o preview quando o código mudar
  useEffect(() => {
    if (iframeRef.current && generatedCode && activeTab === 'preview') {
      console.log('Atualizando preview com código:', generatedCode);
      
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        try {
          // Limpar conteúdo anterior
          doc.open();
          
          // Se o código contém HTML completo
          if (generatedCode.includes('<!DOCTYPE html>') || generatedCode.includes('<html')) {
            doc.write(generatedCode);
          } else if (generatedCode.includes('<')) {
            // Se contém tags HTML mas não é documento completo
            const htmlContent = `
              <!DOCTYPE html>
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
              </html>
            `;
            doc.write(htmlContent);
          } else {
            // Se não é HTML, mostrar como texto
            const textContent = `
              <!DOCTYPE html>
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
              </html>
            `;
            doc.write(textContent);
          }
          
          doc.close();
          console.log('Preview atualizado com sucesso');
        } catch (error) {
          console.error('Erro ao atualizar preview:', error);
        }
      }
    }
  }, [generatedCode, activeTab]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-gray-900">Código Gerado</h2>
            <div className="flex space-x-1">
              <Button
                variant={activeTab === 'code' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('code')}
              >
                <Code className="h-4 w-4 mr-1" />
                Código
              </Button>
              <Button
                variant={activeTab === 'preview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('preview')}
              >
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
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
        {activeTab === 'code' ? (
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
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
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
