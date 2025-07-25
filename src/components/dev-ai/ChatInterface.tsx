
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import MessagesList from './components/MessagesList';
import ChatInput from './components/ChatInput';
import ErrorDisplay from './components/ErrorDisplay';
import { useChatInterface } from './hooks/useChatInterface';
import { useErrorHandler } from './hooks/useErrorHandler';

interface ChatInterfaceProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isSidebarOpen, onToggleSidebar }) => {
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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header fixo */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Chat com IA</h2>
            <p className="text-sm text-gray-500">Descreva o que você quer ou envie uma imagem</p>
          </div>
          
          {/* Botão para abrir sidebar quando fechada */}
          {!isSidebarOpen && (
            <Button
              onClick={onToggleSidebar}
              variant="outline"
              size="sm"
              className="bg-white shadow-md hover:shadow-lg"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Área de erro (se houver) */}
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
      
      {/* Lista de mensagens */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessagesList 
          messages={messages}
          isLoading={isLoading}
          messagesStartRef={messagesStartRef}
        />
      </div>
      
      {/* Input fixo na parte inferior */}
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

export default ChatInterface;
