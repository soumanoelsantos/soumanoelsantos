
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RefreshCw, Globe } from 'lucide-react';

interface BrowserNavigationProps {
  currentUrl: string;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
}

const BrowserNavigation: React.FC<BrowserNavigationProps> = ({
  currentUrl,
  onGoBack,
  onGoForward,
  onRefresh
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
      <Button
        variant="ghost"
        size="sm"
        onClick={onGoBack}
        className="h-6 w-6 p-0"
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onGoForward}
        className="h-6 w-6 p-0"
      >
        <ChevronRight className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        className="h-6 w-6 p-0"
      >
        <RefreshCw className="h-3 w-3" />
      </Button>
      <div className="flex items-center flex-1 bg-white border rounded px-2 py-1">
        <Globe className="h-3 w-3 text-gray-400 mr-2" />
        <span className="text-xs text-gray-600 truncate">{currentUrl}</span>
      </div>
    </div>
  );
};

export default BrowserNavigation;
