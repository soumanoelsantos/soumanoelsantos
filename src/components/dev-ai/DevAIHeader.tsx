
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, History } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import PublishButton from './components/PublishButton';

interface DevAIHeaderProps {
  onToggleSidebar: () => void;
  onToggleHistory: () => void;
}

const DevAIHeader: React.FC<DevAIHeaderProps> = ({ onToggleSidebar, onToggleHistory }) => {
  const { currentProject } = useDevAI();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onToggleSidebar}
          variant="outline"
          size="sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-900">DevAI</h1>
          {currentProject && (
            <span className="text-sm text-gray-500">
              - {currentProject.name}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <PublishButton />
        
        <Button
          onClick={onToggleHistory}
          variant="outline"
          size="sm"
        >
          <History className="h-4 w-4 mr-2" />
          Histórico
        </Button>
      </div>
    </header>
  );
};

export default DevAIHeader;
