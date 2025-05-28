
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Code, Sparkles, Menu, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDevAI } from './DevAIContext';
import NewProjectDialog from './NewProjectDialog';
import { useDevProjects } from '@/hooks/useDevProjects';

interface DevAIHeaderProps {
  onToggleSidebar: () => void;
}

const DevAIHeader: React.FC<DevAIHeaderProps> = ({ onToggleSidebar }) => {
  const { currentProject } = useDevAI();
  const { createProject } = useDevProjects();

  const handleCreateProject = async (data: { name: string; description?: string }) => {
    await createProject(data);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="h-8 w-8 p-0"
          >
            <FolderOpen className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">DevAI</h1>
              {currentProject && (
                <p className="text-xs text-gray-500">{currentProject.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span>Powered by DeepSeek</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <NewProjectDialog onCreateProject={handleCreateProject} />
          <Button variant="outline" size="sm">
            Deploy
          </Button>
          <Link to="/membros">
            <Button variant="ghost" size="sm">
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DevAIHeader;
