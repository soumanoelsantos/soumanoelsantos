
import React, { useState, useEffect } from 'react';
import { useDevAI } from './DevAIContext';
import { useCodePreview } from './hooks/useCodePreview';
import { useErrorHandler } from './hooks/useErrorHandler';
import CodePreviewHeader from './components/CodePreviewHeader';
import CodeDisplay from './components/CodeDisplay';
import PreviewFrame from './components/PreviewFrame';
import FileStructure from './components/FileStructure';
import ErrorDisplay from './components/ErrorDisplay';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);
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

  const handleToggleView = () => {
    setShowCode(!showCode);
    if (!showCode && !selectedFile && generatedCode) {
      setSelectedFile({ content: generatedCode, name: 'index.html' });
    }
  };

  const handleLoad = () => {
    setCurrentUrl('Preview Loaded');
  };

  const handleFileSelect = (content: string, fileName: string) => {
    setSelectedFile({ content, name: fileName });
  };

  const handleIframeError = (error: any) => {
    console.error('🚨 Erro no iframe:', error);
    reportError('Erro na renderização do preview', 'code');
  };

  useEffect(() => {
    if (generatedCode) {
      const hasOpeningTag = generatedCode.includes('<html') || generatedCode.includes('<body') || generatedCode.includes('<div');
      const hasClosingTag = generatedCode.includes('</html>') || generatedCode.includes('</body>') || generatedCode.includes('</div>');
      
      if (!hasOpeningTag || !hasClosingTag) {
        reportError('Código HTML pode estar incompleto ou malformado', 'code');
      }
      
      if (generatedCode.includes('undefined') && generatedCode.includes('function')) {
        reportError('Possível erro de JavaScript detectado no código', 'code');
      }
    }
  }, [generatedCode, reportError]);

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
          <PreviewFrame
            iframeRef={iframeRef}
            previewHtml={getPreviewHtml()}
            onLoad={handleLoad}
            onError={handleIframeError}
          />
        )}
      </div>
    </div>
  );
};

export default CodePreview;
