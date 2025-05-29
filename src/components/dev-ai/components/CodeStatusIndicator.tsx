
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Bug } from 'lucide-react';

interface CodeStatusIndicatorProps {
  status: 'valid' | 'warning' | 'error';
}

const CodeStatusIndicator: React.FC<CodeStatusIndicatorProps> = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <Bug className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'valid':
        return 'Código válido';
      case 'warning':
        return 'Atenção necessária';
      case 'error':
        return 'Erro detectado';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <Badge 
        variant={status === 'valid' ? 'default' : 
                status === 'warning' ? 'secondary' : 'destructive'}
        className="text-xs"
      >
        {getStatusText()}
      </Badge>
    </div>
  );
};

export default CodeStatusIndicator;
