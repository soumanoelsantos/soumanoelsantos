
import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Sparkles, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const DevAIHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">DevAI</h1>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span>Powered by DeepSeek</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            New Project
          </Button>
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
