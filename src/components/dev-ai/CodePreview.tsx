
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Play, Code } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import { useToast } from '@/hooks/use-toast';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Código copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O arquivo foi baixado com sucesso.",
    });
  };

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
          <div className="h-full">
            <pre className="h-full overflow-auto p-4 bg-gray-900 text-green-400 font-mono text-sm">
              <code>{generatedCode}</code>
            </pre>
          </div>
        ) : (
          <div className="h-full bg-white p-4">
            <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Preview funcional em desenvolvimento</p>
                <p className="text-sm text-gray-400 mt-2">
                  Por enquanto, copie o código e teste em seu ambiente
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
