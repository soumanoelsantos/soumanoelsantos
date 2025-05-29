
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ProjectsSidebar from './ProjectsSidebar';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';

const DevAIContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        {isSidebarOpen && (
          <>
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="min-w-0">
              <ProjectsSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}
        
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 40 : 50} 
          minSize={30} 
          maxSize={60}
          className="min-w-0"
        >
          <ChatInterface />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 40 : 50} 
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
