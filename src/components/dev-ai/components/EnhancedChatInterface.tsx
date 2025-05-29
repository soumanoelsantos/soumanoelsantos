
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  MessageSquare, 
  Bot, 
  Sparkles,
  Clock,
  Code2
} from 'lucide-react';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import ErrorDisplay from './ErrorDisplay';
import { useChatInterface } from '../hooks/useChatInterface';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useDevAI } from '../DevAIContext';

interface EnhancedChatInterfaceProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ 
  isSidebarOpen, 
  onToggleSidebar 
}) => {
  const { currentProject, generatedCode } = useDevAI();
  const [showStats, setShowStats] = useState(false);
  
  const {
    messages,
    input,
    setInput,
    selectedImage,
    isLoading,
    messagesStartRef,
    handleSubmit,
    handleImageSelect,
    handleRemoveImage
  } = useChatInterface();

  const {
    currentError,
    isFixing,
    autoFixError,
    clearError
  } = useErrorHandler();

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statsRef.current && !statsRef.current.contains(event.target as Node)) {
        setShowStats(false);
      }
    };

    if (showStats) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStats]);

  const messageCount = messages.length;
  const hasCode = generatedCode && generatedCode.trim().length > 0;
  const lastMessageTime = messages.length > 0 
    ? messages[messages.length - 1].timestamp 
    : null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <Button
                  onClick={onToggleSidebar}
                  variant="outline"
                  size="sm"
                  className="bg-white shadow-sm hover:shadow-md"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Assistente IA
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentProject 
                      ? `Trabalhando em: ${currentProject.name}`
                      : 'Selecione um projeto para começar'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats Button */}
            <div className="relative" ref={statsRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {messageCount}
              </Button>
              
              {showStats && (
                <Card className="absolute right-0 top-full mt-2 p-4 shadow-lg z-50 w-64">
                  <h3 className="font-semibold text-sm mb-3">Estatísticas da Sessão</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Mensagens</span>
                      </div>
                      <Badge variant="secondary">{messageCount}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Código</span>
                      </div>
                      <Badge variant={hasCode ? "default" : "secondary"}>
                        {hasCode ? "Gerado" : "Vazio"}
                      </Badge>
                    </div>
                    
                    {lastMessageTime && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Última</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {lastMessageTime.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {currentError && (
        <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-red-50">
          <ErrorDisplay
            error={currentError}
            isFixing={isFixing}
            onAutoFix={() => autoFixError(currentError)}
            onDismiss={clearError}
          />
        </div>
      )}
      
      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {messageCount === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Bot className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bem-vindo ao DevAI
              </h3>
              <p className="text-gray-600 mb-6">
                {currentProject 
                  ? `Projeto "${currentProject.name}" selecionado. Descreva o que você quer desenvolver.`
                  : 'Selecione um projeto na barra lateral ou crie um novo para começar a desenvolver com IA.'
                }
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <p>💡 Descreva componentes e funcionalidades</p>
                <p>🚀 Envie imagens para análise</p>
                <p>✨ Faça melhorias incrementais</p>
              </div>
            </div>
          </div>
        ) : (
          <MessagesList 
            messages={messages}
            isLoading={isLoading}
            messagesStartRef={messagesStartRef}
          />
        )}
      </div>
      
      {/* Enhanced Chat Input */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <ChatInput
          input={input}
          setInput={setInput}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onRemoveImage={handleRemoveImage}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EnhancedChatInterface;
