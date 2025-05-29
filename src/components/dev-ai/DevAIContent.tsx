
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
    <div className="h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {isSidebarOpen && (
          <>
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ProjectsSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}
        
        <ResizablePanel defaultSize={isSidebarOpen ? 35 : 50} minSize={25} maxSize={50}>
          <ChatInterface />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={isSidebarOpen ? 45 : 50} minSize={30}>
          <CodePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DevAIContent;
