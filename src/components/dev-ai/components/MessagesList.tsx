
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
  // Reverse the messages array to show newest first
  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 pb-20">
          <div ref={messagesStartRef} />
          
          {isLoading && <LoadingIndicator />}

          {reversedMessages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesList;
