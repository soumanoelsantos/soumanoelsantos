
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ProjectsSidebar from './ProjectsSidebar';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';

const DevAIContent = () => {
  return (
    <div className="h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ProjectsSidebar />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <ChatInterface />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={45} minSize={30}>
          <CodePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DevAIContent;
