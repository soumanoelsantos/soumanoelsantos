
import React, { useState, useEffect } from 'react';
import { useDevAI } from './DevAIContext';
import { useCodePreview } from './hooks/useCodePreview';
import { useErrorHandler } from './hooks/useErrorHandler';
import CodePreviewHeader from './components/CodePreviewHeader';
import CodeDisplay from './components/CodeDisplay';
import PreviewFrame from './components/PreviewFrame';
import FileStructure from './components/FileStructure';
import ErrorDisplay from './components/ErrorDisplay';
import SimpleWebsite from '../SimpleWebsite';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);
  const [showCode, setShowCode] = useState(false);
  const {
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

  const handleToggleView = () => {
    setShowCode(!showCode);
    if (!showCode && !selectedFile && generatedCode) {
      setSelectedFile({ content: generatedCode, name: 'component.tsx' });
    }
  };

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

  // Mostrar preview visual por padrão
  useEffect(() => {
    if (!generatedCode) {
      setShowCode(false);
    }
  }, [generatedCode]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-shrink-0">
        <CodePreviewHeader
          showCode={showCode}
          onToggleView={handleToggleView}
          onCopy={copyToClipboard}
          onDownload={downloadCode}
          onOpenInNewTab={openInNewTab}
          currentUrl={currentUrl}
          onGoBack={goBack}
          onGoForward={goForward}
          onRefresh={refreshPreview}
        />
      </div>
      
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
      
      <div className="flex-1 min-h-0 overflow-hidden">
        {showCode ? (
          <div className="flex h-full">
            <div className="w-64 border-r border-gray-200">
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
        ) : (
          // Mostrar preview visual - se há código gerado, usar iframe, senão mostrar componente diretamente
          generatedCode ? (
            <PreviewFrame
              iframeRef={iframeRef}
              previewHtml={getPreviewHtml()}
              onLoad={handleLoad}
              onError={handleIframeError}
            />
          ) : (
            <div className="w-full h-full overflow-auto">
              <SimpleWebsite />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CodePreview;
