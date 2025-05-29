
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Code, Monitor, Files } from 'lucide-react';
import { useDevAI } from '../DevAIContext';
import { useCodePreview } from '../hooks/useCodePreview';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import CodePreviewActions from './CodePreviewActions';
import CodePreviewContent from './CodePreviewContent';
import PreviewFrame from './PreviewFrame';
import SimpleWebsite from '../../SimpleWebsite';
import EmptyCodeState from './EmptyCodeState';
import ErrorDisplay from './ErrorDisplay';

type ViewMode = 'code' | 'preview' | 'files';

const EnhancedCodePreview = () => {
  const { generatedCode } = useDevAI();
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const {
    currentUrl,
    setCurrentUrl,
    iframeRef,
    copyToClipboard,
    downloadCode,
    openInNewTab,
    refreshPreview,
    getPreviewHtml
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

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'code' && !selectedFile && generatedCode) {
      setSelectedFile({ content: generatedCode, name: 'component.tsx' });
    }
  };

  const handleLoad = () => {
    setCurrentUrl('Preview Carregado');
  };

  const handleIframeError = (error: any) => {
    console.error('🚨 Erro no iframe:', error);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header com botões de alternância */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleViewModeChange('preview')}
              variant={viewMode === 'preview' ? "default" : "outline"}
              size="sm"
            >
              <Monitor className="h-4 w-4 mr-2" />
              Preview
            </Button>

            <Button
              onClick={() => handleViewModeChange('files')}
              variant={viewMode === 'files' ? "default" : "outline"}
              size="sm"
            >
              <Files className="h-4 w-4 mr-2" />
              Arquivos
            </Button>
            
            <Button
              onClick={() => handleViewModeChange('code')}
              variant={viewMode === 'code' ? "default" : "outline"}
              size="sm"
            >
              <Code className="h-4 w-4 mr-2" />
              Código
            </Button>
          </div>

          {generatedCode && (
            <CodePreviewActions
              status={codeStatus}
              onCopy={copyToClipboard}
              onDownload={downloadCode}
              onOpenInNewTab={openInNewTab}
              onRefresh={refreshPreview}
              compact={true}
            />
          )}
        </div>
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
        {viewMode === 'preview' ? (
          // Visualização de preview
          <div className="w-full h-full">
            {generatedCode ? (
              <PreviewFrame
                iframeRef={iframeRef}
                previewHtml={getPreviewHtml()}
                onLoad={handleLoad}
                onError={handleIframeError}
              />
            ) : (
              <div className="w-full h-full overflow-auto bg-white">
                <SimpleWebsite />
              </div>
            )}
          </div>
        ) : viewMode === 'files' || viewMode === 'code' ? (
          // Visualização de arquivos e código
          !generatedCode ? (
            <EmptyCodeState />
          ) : (
            <CodePreviewContent
              generatedCode={generatedCode}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default EnhancedCodePreview;
