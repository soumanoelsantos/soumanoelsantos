
import React from 'react';
import { Button } from '@/components/ui/button';
import { PanelLeft, History, Zap } from 'lucide-react';

interface DevAIHeaderProps {
  onToggleSidebar: () => void;
  onToggleHistory: () => void;
}

const DevAIHeader: React.FC<DevAIHeaderProps> = ({ onToggleSidebar, onToggleHistory }) => {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">Dev AI</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleHistory}
          className="h-8"
        >
          <History className="h-4 w-4 mr-2" />
          Histórico
        </Button>
      </div>
    </div>
  );
};

export default DevAIHeader;
