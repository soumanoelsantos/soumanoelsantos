
import React from 'react';
import { useDevAI } from './DevAIContext';
import { useCodePreview } from './hooks/useCodePreview';
import CodePreviewHeader from './components/CodePreviewHeader';
import CodeDisplay from './components/CodeDisplay';
import PreviewFrame from './components/PreviewFrame';

const CodePreview = () => {
  const { generatedCode } = useDevAI();
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
  };

  const handleLoad = () => {
    setCurrentUrl('Preview Loaded');
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
          <CodeDisplay code={generatedCode} />
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
