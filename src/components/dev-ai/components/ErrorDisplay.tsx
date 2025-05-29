
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, X, Bug } from 'lucide-react';
import { DevAIError } from '../hooks/useErrorHandler';

interface ErrorDisplayProps {
  error: DevAIError;
  isFixing: boolean;
  onAutoFix: () => void;
  onDismiss: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  isFixing,
  onAutoFix,
  onDismiss
}) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'api':
      case 'network':
        return <AlertTriangle className="h-4 w-4" />;
      case 'code':
        return <Bug className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'network':
        return 'border-orange-500 bg-orange-50 text-orange-800';
      case 'code':
        return 'border-red-500 bg-red-50 text-red-800';
      case 'api':
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${getErrorColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getErrorIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">
              Erro no Sistema ({error.type})
            </h4>
            <p className="text-sm mb-2">
              {error.message}
            </p>
            <p className="text-xs opacity-75">
              {error.timestamp.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {error.canAutoFix && (
            <Button
              onClick={onAutoFix}
              disabled={isFixing}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isFixing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Corrigindo...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Corrigir
                </>
              )}
            </Button>
          )}
          
          <Button
            onClick={onDismiss}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
