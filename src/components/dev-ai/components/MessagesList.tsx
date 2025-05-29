
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageItem from './MessageItem';
import LoadingIndicator from './LoadingIndicator';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
  projectState?: string;
}

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
  messagesStartRef: React.RefObject<HTMLDivElement>;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  isLoading, 
  messagesStartRef 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem apenas quando uma nova mensagem é adicionada
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        
        // Só faz scroll automático se o usuário estiver perto do final
        if (isNearBottom || messages.length === 1) {
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea ref={scrollAreaRef} className="flex-1 h-0">
        <div className="p-4 space-y-4">
          <div ref={messagesStartRef} />
          
          {/* Indicador de início do histórico */}
          {messages.length > 0 && (
            <div className="text-center py-2">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Início da conversa
              </span>
            </div>
          )}
          
          {/* Mostrar todas as mensagens na ordem cronológica */}
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}

          {isLoading && <LoadingIndicator />}

          {/* Referência para scroll automático */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesList;
