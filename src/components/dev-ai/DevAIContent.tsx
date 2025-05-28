
import React from 'react';
import DevAIHeader from './DevAIHeader';
import ChatInterface from './ChatInterface';
import CodePreview from './CodePreview';
import { DevAIProvider } from './DevAIContext';

const DevAIContent = () => {
  return (
    <DevAIProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DevAIHeader />
        <div className="flex-1 flex">
          <div className="w-1/2 border-r border-gray-200">
            <ChatInterface />
          </div>
          <div className="w-1/2">
            <CodePreview />
          </div>
        </div>
      </div>
    </DevAIProvider>
  );
};

export default DevAIContent;
