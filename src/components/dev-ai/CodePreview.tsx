
import React, { useState } from 'react';
import { useDevAI } from './DevAIContext';
import { useCodePreview } from './hooks/useCodePreview';
import CodePreviewHeader from './components/CodePreviewHeader';
import CodeDisplay from './components/CodeDisplay';
import PreviewFrame from './components/PreviewFrame';
import FileStructure from './components/FileStructure';

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

  const handleToggleView = () => {
    setShowCode(!showCode);
    if (!showCode && !selectedFile && generatedCode) {
      // Auto-selecionar o primeiro arquivo quando abrir código
      setSelectedFile({ content: generatedCode, name: 'index.html' });
    }
  };

  const handleLoad = () => {
    setCurrentUrl('Preview Loaded');
  };

  const handleFileSelect = (content: string, fileName: string) => {
    setSelectedFile({ content, name: fileName });
  };

  return (
    <div className="flex flex-col h-full">
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
      
      <div className="flex-1 overflow-hidden">
        {showCode ? (
          <div className="flex h-full">
            <div className="w-64">
              <FileStructure 
                onFileSelect={handleFileSelect}
                generatedCode={generatedCode}
              />
            </div>
            <div className="flex-1">
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
          />
        )}
      </div>
    </div>
  );
};

export default CodePreview;
