
import React, { useState } from 'react';
import { useDevAI } from '../DevAIContext';
import { useCodePreview } from '../hooks/useCodePreview';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import CodePreviewActions from './CodePreviewActions';
import CodePreviewContent from './CodePreviewContent';
import EmptyCodeState from './EmptyCodeState';
import ErrorDisplay from './ErrorDisplay';

const EnhancedCodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);

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

  const { codeStatus } = useCodeAnalysis(generatedCode, currentError);

  const handleFileSelect = (content: string, fileName: string) => {
    setSelectedFile({ content, name: fileName });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <CodePreviewActions
        status={codeStatus}
        onCopy={copyToClipboard}
        onDownload={downloadCode}
        onOpenInNewTab={openInNewTab}
        onRefresh={refreshPreview}
      />
      
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
        {!generatedCode ? (
          <EmptyCodeState />
        ) : (
          <CodePreviewContent
            generatedCode={generatedCode}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedCodePreview;
