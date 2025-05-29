
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-2 text-gray-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Gerando resposta...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
