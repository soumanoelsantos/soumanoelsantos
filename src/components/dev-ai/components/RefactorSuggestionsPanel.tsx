
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  X, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { useAutoRefactor } from '../hooks/useAutoRefactor';

const RefactorSuggestionsPanel = () => {
  const { 
    refactorSuggestions, 
    isAnalyzing, 
    executeAutoRefactor, 
    dismissSuggestion 
  } = useAutoRefactor();

  if (refactorSuggestions.length === 0 && !isAnalyzing) {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-200 bg-yellow-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <h3 className="font-semibold text-gray-900">Sugestões de Refatoração</h3>
        </div>
        
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Analisando código...
          </div>
        )}
      </div>

      <div className="space-y-3">
        {refactorSuggestions.map((suggestion) => (
          <Card key={suggestion.id} className="p-4 bg-white border-yellow-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{suggestion.fileName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      {suggestion.currentSize} linhas
                    </Badge>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      &lt; {suggestion.maxSize} linhas
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissSuggestion(suggestion.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-gray-700">{suggestion.reason}</p>
              </div>
              
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-900 mb-2">Ações sugeridas:</p>
                <ul className="list-disc list-inside space-y-1">
                  {suggestion.suggestedActions.map((action, index) => (
                    <li key={index} className="text-sm text-gray-600">{action}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => executeAutoRefactor(suggestion)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refatorar Automaticamente
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => dismissSuggestion(suggestion.id)}
              >
                Dispensar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RefactorSuggestionsPanel;
