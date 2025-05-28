
import React from 'react';
import DevAIHeader from './DevAIHeader';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';
import { DevAIProvider } from './DevAIContext';

const DevAIContent = () => {
  return (
    <DevAIProvider>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <DevAIHeader />
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            <ChatInterface />
          </div>
          <div className="w-1/2 flex flex-col">
            <CodePreview />
          </div>
        </div>
      </div>
    </DevAIProvider>
  );
};

export default DevAIContent;
