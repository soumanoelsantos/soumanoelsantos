
import React from 'react';
import MessagesList from './components/MessagesList';
import ChatInput from './components/ChatInput';
import { useChatInterface } from './hooks/useChatInterface';

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-900">Chat com IA</h2>
        <p className="text-xs text-gray-500">Descreva o que você quer ou envie uma imagem</p>
      </div>
      
      <MessagesList 
        messages={messages}
        isLoading={isLoading}
        messagesStartRef={messagesStartRef}
      />
      
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
  );
};

export default ChatInterface;
