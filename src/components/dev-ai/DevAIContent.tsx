
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { X, Sidebar } from 'lucide-react';
import ImprovedProjectsSidebar from './components/ImprovedProjectsSidebar';
import EnhancedChatInterface from './components/EnhancedChatInterface';
import EnhancedCodePreview from './components/EnhancedCodePreview';

const DevAIContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        {/* Sidebar Panel */}
        {isSidebarOpen && (
          <>
            <ResizablePanel 
              defaultSize={25} 
              minSize={20} 
              maxSize={35} 
              className="min-w-0"
            >
              <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-2">
                    <Sidebar className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900 text-sm">Workspace</span>
                  </div>
                  <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-white/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Sidebar Content */}
                <div className="flex-1 overflow-hidden">
                  <ImprovedProjectsSidebar />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle 
              withHandle 
              className="w-1 bg-gray-200 hover:bg-blue-300 transition-colors border-l border-r border-gray-300"
            />
          </>
        )}
        
        {/* Chat Panel */}
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 37.5 : 50} 
          minSize={30} 
          maxSize={60}
          className="min-w-0"
        >
          <EnhancedChatInterface 
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </ResizablePanel>
        
        <ResizableHandle 
          withHandle 
          className="w-1 bg-gray-200 hover:bg-blue-300 transition-colors border-l border-r border-gray-300"
        />
        
        {/* Preview Panel */}
        <ResizablePanel 
          defaultSize={isSidebarOpen ? 37.5 : 50} 
          minSize={30}
          className="min-w-0"
        >
          <EnhancedCodePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DevAIContent;
