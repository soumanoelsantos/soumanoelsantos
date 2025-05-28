
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Code, ExternalLink } from 'lucide-react';
import BrowserNavigation from './BrowserNavigation';

interface CodePreviewHeaderProps {
  showCode: boolean;
  onToggleView: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onOpenInNewTab: () => void;
  currentUrl: string;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
}

const CodePreviewHeader: React.FC<CodePreviewHeaderProps> = ({
  showCode,
  onToggleView,
  onCopy,
  onDownload,
  onOpenInNewTab,
  currentUrl,
  onGoBack,
  onGoForward,
  onRefresh
}) => {
  return (
    <div className="p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <h2 className="text-sm font-semibold text-gray-900">Preview</h2>
          <Button
            variant={showCode ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleView}
            className="h-7 px-2 text-xs"
          >
            <Code className="h-3 w-3 mr-1" />
            {showCode ? 'Preview' : 'Código'}
          </Button>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" onClick={onOpenInNewTab} className="h-7 px-2">
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" onClick={onCopy} className="h-7 px-2">
            <Copy className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload} className="h-7 px-2">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!showCode && (
        <BrowserNavigation
          currentUrl={currentUrl}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

export default CodePreviewHeader;
