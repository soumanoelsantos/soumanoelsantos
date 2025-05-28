
import React, { useState } from 'react';
import DevAIHeader from './DevAIHeader';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';
import ProjectsSidebar from './ProjectsSidebar';
import { DevAIProvider } from './DevAIContext';

const DevAIContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DevAIProvider>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <DevAIHeader onToggleSidebar={toggleSidebar} />
        <div className="flex-1 flex overflow-hidden">
          <ProjectsSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          <div className={`flex-1 flex overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0' : ''}`}>
            <div className="w-1/2 border-r border-gray-200 flex flex-col">
              <ChatInterface />
            </div>
            <div className="w-1/2 flex flex-col">
              <CodePreview />
            </div>
          </div>
        </div>
      </div>
    </DevAIProvider>
  );
};

export default DevAIContent;
