
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <pre className="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </ScrollArea>
  );
};

export default CodeDisplay;
