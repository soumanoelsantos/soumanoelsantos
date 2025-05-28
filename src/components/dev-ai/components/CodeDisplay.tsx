
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeDisplayProps {
  code: string;
  fileName?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, fileName = 'código' }) => {
  return (
    <div className="h-full bg-gray-50">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h4 className="text-sm font-medium text-gray-900">{fileName}</h4>
      </div>
      <ScrollArea className="h-full">
        <div className="p-4">
          <pre className="bg-white text-gray-900 font-mono text-sm p-4 rounded-lg border border-gray-200 overflow-x-auto whitespace-pre-wrap shadow-sm">
            <code>{code || 'Nenhum código para exibir'}</code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CodeDisplay;
