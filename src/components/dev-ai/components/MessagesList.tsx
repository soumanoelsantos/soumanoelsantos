
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageItem from './MessageItem';
import LoadingIndicator from './LoadingIndicator';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
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
  // Reverse the messages array to show newest first
  const reversedMessages = [...messages].reverse();

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-3">
        <div ref={messagesStartRef} />
        
        {isLoading && <LoadingIndicator />}

        {reversedMessages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
