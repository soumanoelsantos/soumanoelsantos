
import React from 'react';
import FileStructure from './FileStructure';
import CodeDisplay from './CodeDisplay';

interface CodePreviewContentProps {
  generatedCode: string;
  selectedFile: { content: string; name: string } | null;
  onFileSelect: (content: string, fileName: string) => void;
}

const CodePreviewContent: React.FC<CodePreviewContentProps> = ({
  generatedCode,
  selectedFile,
  onFileSelect
}) => {
  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <FileStructure 
          onFileSelect={onFileSelect}
          generatedCode={generatedCode}
        />
      </div>
      <div className="flex-1 min-w-0">
        <CodeDisplay 
          code={selectedFile?.content || generatedCode} 
          fileName={selectedFile?.name || 'component.tsx'}
        />
      </div>
    </div>
  );
};

export default CodePreviewContent;
