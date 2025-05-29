
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

  // Auto-scroll para a última mensagem quando uma nova é adicionada
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div ref={messagesStartRef} />
          
          {/* Mostrar mensagens na ordem cronológica normal */}
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}

          {isLoading && <LoadingIndicator />}

          {/* Referência para scroll automático */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesList;
