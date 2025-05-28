
import React from 'react';
import { User, Bot, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          message.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'
        }`}>
          {message.type === 'user' ? (
            <User className="h-3 w-3 text-white" />
          ) : (
            <Bot className="h-3 w-3 text-white" />
          )}
        </div>
        <div className="flex flex-col space-y-1">
          {message.image && (
            <img
              src={message.image.preview}
              alt="Imagem enviada"
              className="max-w-32 h-20 object-cover rounded border"
            />
          )}
          <div className={`px-3 py-2 rounded-lg ${
            message.type === 'user' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-xs whitespace-pre-wrap">{message.content}</p>
            {message.type === 'assistant' && (
              <div className="flex items-center mt-1 text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span className="text-xs">Preview atualizado</span>
              </div>
            )}
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
