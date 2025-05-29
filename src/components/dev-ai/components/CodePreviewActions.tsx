
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Download, 
  ExternalLink, 
  RefreshCw
} from 'lucide-react';
import CodeStatusIndicator from './CodeStatusIndicator';

interface CodePreviewActionsProps {
  status: 'valid' | 'warning' | 'error';
  onCopy: () => void;
  onDownload: () => void;
  onOpenInNewTab: () => void;
  onRefresh: () => void;
  compact?: boolean;
}

const CodePreviewActions: React.FC<CodePreviewActionsProps> = ({
  status,
  onCopy,
  onDownload,
  onOpenInNewTab,
  onRefresh,
  compact = false
}) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          className="text-xs"
        >
          <Copy className="h-3 w-3" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="text-xs"
        >
          <Download className="h-3 w-3" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenInNewTab}
          className="text-xs"
        >
          <ExternalLink className="h-3 w-3" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="text-xs"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CodeStatusIndicator status={status} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copiar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Baixar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenInNewTab}
              className="text-xs bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Nova Aba
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewActions;
