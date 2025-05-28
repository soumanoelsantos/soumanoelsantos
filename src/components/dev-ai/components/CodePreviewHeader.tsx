
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Monitor, 
  Copy, 
  Download, 
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import BrowserNavigation from './BrowserNavigation';
import GitHubSyncButton from '../github/GitHubSyncButton';
import { useDevAI } from '../DevAIContext';

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
  const { currentProject, generatedCode } = useDevAI();

  return (
    <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            onClick={onToggleView}
            variant={showCode ? "default" : "outline"}
            size="sm"
          >
            <Code className="h-4 w-4 mr-2" />
            Código
          </Button>
          
          <Button
            onClick={onToggleView}
            variant={!showCode ? "default" : "outline"}
            size="sm"
          >
            <Monitor className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Integração GitHub */}
          {currentProject && (
            <GitHubSyncButton
              projectId={currentProject.id}
              projectName={currentProject.name}
              code={generatedCode}
            />
          )}
          
          {!showCode && (
            <BrowserNavigation
              currentUrl={currentUrl}
              onGoBack={onGoBack}
              onGoForward={onGoForward}
              onRefresh={onRefresh}
            />
          )}
          
          <Button onClick={onCopy} variant="outline" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button onClick={onDownload} variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button onClick={onOpenInNewTab} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewHeader;
