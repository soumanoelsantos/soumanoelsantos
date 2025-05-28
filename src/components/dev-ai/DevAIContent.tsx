
import React, { useState } from 'react';
import DevAIHeader from './DevAIHeader';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';
import ProjectsSidebar from './ProjectsSidebar';
import ProjectHistoryPanel from './components/ProjectHistoryPanel';

const DevAIContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleHistory = () => {
    console.log('🔄 Toggling history panel:', !historyOpen);
    setHistoryOpen(!historyOpen);
  };

  // Debug: Log do estado atual
  React.useEffect(() => {
    console.log('🎛️ DevAIContent - Estado dos painéis:');
    console.log('- Sidebar aberta:', sidebarOpen);
    console.log('- Histórico aberto:', historyOpen);
  }, [sidebarOpen, historyOpen]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <DevAIHeader onToggleSidebar={toggleSidebar} onToggleHistory={toggleHistory} />
      <div className="flex-1 flex overflow-hidden">
        <ProjectsSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div className={`flex-1 flex overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0' : ''}`}>
          <div className={`${historyOpen ? 'w-1/3' : 'w-1/2'} border-r border-gray-200 flex flex-col transition-all duration-300`}>
            <ChatInterface />
          </div>
          <div className={`${historyOpen ? 'w-1/3' : 'w-1/2'} flex flex-col transition-all duration-300`}>
            <CodePreview />
          </div>
          <ProjectHistoryPanel isOpen={historyOpen} onToggle={toggleHistory} />
        </div>
      </div>
    </div>
  );
};

export default DevAIContent;
