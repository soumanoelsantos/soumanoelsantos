
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Code, 
  Copy, 
  Download, 
  ExternalLink, 
  RefreshCw,
  Bug,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useDevAI } from '../DevAIContext';
import { useCodePreview } from '../hooks/useCodePreview';
import { useErrorHandler } from '../hooks/useErrorHandler';
import CodeDisplay from './CodeDisplay';
import FileStructure from './FileStructure';
import ErrorDisplay from './ErrorDisplay';

const EnhancedCodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);
  const [codeStatus, setCodeStatus] = useState<'valid' | 'warning' | 'error'>('valid');

  const {
    copyToClipboard,
    downloadCode,
    openInNewTab,
    refreshPreview
  } = useCodePreview(generatedCode);

  const {
    currentError,
    isFixing,
    autoFixError,
    clearError
  } = useErrorHandler();

  // Analyze code quality
  useEffect(() => {
    if (generatedCode) {
      const hasErrors = generatedCode.includes('undefined') || 
                       generatedCode.includes('Error:') ||
                       currentError;
      const hasWarnings = generatedCode.length < 100 ||
                         !generatedCode.includes('export default');
      
      if (hasErrors) {
        setCodeStatus('error');
      } else if (hasWarnings) {
        setCodeStatus('warning');
      } else {
        setCodeStatus('valid');
      }
    }
  }, [generatedCode, currentError]);

  const handleFileSelect = (content: string, fileName: string) => {
    setSelectedFile({ content, name: fileName });
  };

  const getStatusIcon = () => {
    switch (codeStatus) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <Bug className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (codeStatus) {
      case 'valid':
        return 'Código válido';
      case 'warning':
        return 'Atenção necessária';
      case 'error':
        return 'Erro detectado';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Enhanced Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Código React</span>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <Badge 
                  variant={codeStatus === 'valid' ? 'default' : 
                          codeStatus === 'warning' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {getStatusText()}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCode}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Baixar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={openInNewTab}
                className="text-xs bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Nova Aba
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={refreshPreview}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {currentError && (
        <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-red-50">
          <ErrorDisplay
            error={currentError}
            isFixing={isFixing}
            onAutoFix={() => autoFixError(currentError)}
            onDismiss={clearError}
          />
        </div>
      )}
      
      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {!generatedCode ? (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <Card className="p-8 text-center max-w-md">
              <Code className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Nenhum código gerado
              </h3>
              <p className="text-gray-500 text-sm">
                Envie uma mensagem para o assistente IA para começar a gerar código React.
              </p>
            </Card>
          </div>
        ) : (
          <div className="flex h-full">
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <FileStructure 
                onFileSelect={handleFileSelect}
                generatedCode={generatedCode}
              />
            </div>
            <div className="flex-1 min-w-0">
              <CodeDisplay 
                code={selectedFile?.content || generatedCode} 
                fileName={selectedFile?.name || 'component.tsx'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCodePreview;
