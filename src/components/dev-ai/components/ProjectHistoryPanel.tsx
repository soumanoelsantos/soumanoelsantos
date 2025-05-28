
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, RotateCcw, Eye, EyeOff, Clock, MessageSquare, RefreshCw } from 'lucide-react';
import { useProjectHistory } from '../ProjectHistoryContext';
import { Separator } from '@/components/ui/separator';

interface ProjectHistoryPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectHistoryPanel: React.FC<ProjectHistoryPanelProps> = ({ isOpen, onToggle }) => {
  const { versions, currentVersion, revertToVersion } = useProjectHistory();
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [showCode, setShowCode] = useState<{ [key: number]: boolean }>({});

  // Debug: Log do estado atual
  React.useEffect(() => {
    console.log('🔍 ProjectHistoryPanel - Estado atual:');
    console.log('- Painel aberto:', isOpen);
    console.log('- Número de versões:', versions.length);
    console.log('- Versão atual:', currentVersion);
  }, [isOpen, versions.length, currentVersion]);

  const handleRevert = (version: number) => {
    console.log(`🔄 Revertendo para versão ${version}`);
    revertToVersion(version);
    setSelectedVersion(null);
  };

  const toggleCodeView = (version: number) => {
    setShowCode(prev => ({
      ...prev,
      [version]: !prev[version]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Histórico de Versões</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            ×
          </Button>
        </div>
        <p className="text-xs text-gray-500 mb-2">
          Retorne para qualquer etapa anterior do projeto
        </p>
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          <RefreshCw className="h-3 w-3 inline mr-1" />
          Versões salvas: {versions.length}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {versions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <History className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Nenhuma versão salva ainda</p>
              <p className="text-xs">As versões aparecerão aqui conforme você gera código</p>
              <div className="mt-4 text-xs text-gray-400 bg-gray-50 p-2 rounded">
                Debug: {versions.length} versões carregadas
              </div>
            </div>
          ) : (
            [...versions].reverse().map((version) => (
              <Card 
                key={version.id}
                className={`transition-all duration-200 ${
                  currentVersion === version.version 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                } ${
                  selectedVersion === version.version ? 'ring-2 ring-blue-300' : ''
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={currentVersion === version.version ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        v{version.version}
                      </Badge>
                      {currentVersion === version.version && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          Atual
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => toggleCodeView(version.version)}
                      >
                        {showCode[version.version] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      {currentVersion !== version.version && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-blue-100"
                          onClick={() => handleRevert(version.version)}
                        >
                          <RotateCcw className="h-3 w-3 text-blue-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {version.userMessage && (
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-3 w-3 mt-1 text-blue-500" />
                        <p className="text-xs text-gray-700 font-medium">
                          "{version.userMessage}"
                        </p>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-600">
                      {version.message}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {version.timestamp.toLocaleString('pt-BR')}
                    </div>

                    {showCode[version.version] && (
                      <>
                        <Separator className="my-2" />
                        <div className="bg-gray-100 rounded p-2 max-h-32 overflow-y-auto">
                          <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                            {version.code.substring(0, 300)}
                            {version.code.length > 300 && '...'}
                          </pre>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectHistoryPanel;
