
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Code, 
  Eye, 
  Copy, 
  Download, 
  ExternalLink, 
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet,
  Bug,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useDevAI } from '../DevAIContext';
import { useCodePreview } from '../hooks/useCodePreview';
import { useErrorHandler } from '../hooks/useErrorHandler';
import CodeDisplay from './CodeDisplay';
import PreviewFrame from './PreviewFrame';
import FileStructure from './FileStructure';
import ErrorDisplay from './ErrorDisplay';

const EnhancedCodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [codeStatus, setCodeStatus] = useState<'valid' | 'warning' | 'error'>('valid');

  const {
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
  } = useCodePreview(generatedCode);

  const {
    currentError,
    isFixing,
    autoFixError,
    clearError,
    reportError
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

  const handleLoad = () => {
    setCurrentUrl('Preview Carregado');
  };

  const handleFileSelect = (content: string, fileName: string) => {
    setSelectedFile({ content, name: fileName });
  };

  const handleIframeError = (error: any) => {
    console.error('🚨 Erro no iframe:', error);
    reportError('Erro na renderização do preview', 'code');
  };

  const getDeviceClasses = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
      default:
        return 'w-full';
    }
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
                <Monitor className="h-5 w-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Preview & Código</h2>
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
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'preview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('preview')}
                className="text-xs h-8"
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
              <Button
                variant={viewMode === 'code' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('code')}
                className="text-xs h-8"
              >
                <Code className="h-3 w-3 mr-1" />
                Código
              </Button>
              <Button
                variant={viewMode === 'split' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('split')}
                className="text-xs h-8"
              >
                Split
              </Button>
            </div>

            {/* Device Toggle (only for preview) */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewDevice('desktop')}
                  className="text-xs h-8 px-2"
                >
                  <Monitor className="h-3 w-3" />
                </Button>
                <Button
                  variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewDevice('tablet')}
                  className="text-xs h-8 px-2"
                >
                  <Tablet className="h-3 w-3" />
                </Button>
                <Button
                  variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewDevice('mobile')}
                  className="text-xs h-8 px-2"
                >
                  <Smartphone className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Refresh Button */}
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
                Envie uma mensagem para o assistente IA para começar a gerar código.
              </p>
            </Card>
          </div>
        ) : (
          <>
            {viewMode === 'preview' && (
              <div className={`h-full ${getDeviceClasses()}`}>
                <PreviewFrame
                  iframeRef={iframeRef}
                  previewHtml={getPreviewHtml()}
                  onLoad={handleLoad}
                  onError={handleIframeError}
                />
              </div>
            )}

            {viewMode === 'code' && (
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
                    fileName={selectedFile?.name}
                  />
                </div>
              </div>
            )}

            {viewMode === 'split' && (
              <div className="flex h-full">
                <div className="flex-1 border-r border-gray-200">
                  <div className={`h-full ${getDeviceClasses()}`}>
                    <PreviewFrame
                      iframeRef={iframeRef}
                      previewHtml={getPreviewHtml()}
                      onLoad={handleLoad}
                      onError={handleIframeError}
                    />
                  </div>
                </div>
                <div className="flex-1 flex">
                  <div className="w-48 border-r border-gray-200 bg-gray-50">
                    <FileStructure 
                      onFileSelect={handleFileSelect}
                      generatedCode={generatedCode}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CodeDisplay 
                      code={selectedFile?.content || generatedCode} 
                      fileName={selectedFile?.name}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedCodePreview;
