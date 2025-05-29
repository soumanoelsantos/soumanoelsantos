
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ProjectsSidebar from './ProjectsSidebar';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';

const DevAIContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Botão para abrir sidebar quando fechada */}
      {!isSidebarOpen && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="sm"
            className="bg-white shadow-md hover:shadow-lg"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      <ResizablePanelGroup direction="horizontal" className="w-full">
        {isSidebarOpen && (
          <>
            <ResizablePanel 
              defaultSize={25} 
              minSize={20} 
              maxSize={35} 
              className="min-w-0"
            >
              <div className="h-full flex flex-col bg-white border-r border-gray-200">
                {/* Header do sidebar com botão de fechar */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 text-sm">Projetos</h3>
                  <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Conteúdo do sidebar */}
                <div className="flex-1 overflow-hidden">
                  <ProjectsSidebar isOpen={true} onToggle={toggleSidebar} />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle 
              withHandle 
              className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors border-l border-r border-gray-300"
            />
          </>
        )}
        
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 37.5 : 50} 
          minSize={30} 
          maxSize={60}
          className="min-w-0"
        >
          <ChatInterface />
        </ResizablePanel>
        
        <ResizableHandle 
          withHandle 
          className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors border-l border-r border-gray-300"
        />
        
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 37.5 : 50} 
          minSize={30}
          className="min-w-0"
        >
          <CodePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DevAIContent;
