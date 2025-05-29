
import React from 'react';
import MessagesList from './components/MessagesList';
import ChatInput from './components/ChatInput';
import ErrorDisplay from './components/ErrorDisplay';
import { useChatInterface } from './hooks/useChatInterface';
import { useErrorHandler } from './hooks/useErrorHandler';

const ChatInterface = () => {
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
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Chat com IA</h2>
        <p className="text-sm text-gray-500">Descreva o que você quer ou envie uma imagem</p>
      </div>
      
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
      
      <div className="flex-1 min-h-0">
        <MessagesList 
          messages={messages}
          isLoading={isLoading}
          messagesStartRef={messagesStartRef}
        />
      </div>
      
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
