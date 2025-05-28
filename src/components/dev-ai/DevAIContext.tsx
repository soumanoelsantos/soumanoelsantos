
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
}

interface DevAIContextType {
  messages: Message[];
  addMessage: (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }) => void;
  generatedCode: string;
  setGeneratedCode: (code: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DevAIContext = createContext<DevAIContextType | undefined>(undefined);

export const useDevAI = () => {
  const context = useContext(DevAIContext);
  if (!context) {
    throw new Error('useDevAI must be used within a DevAIProvider');
  }
  return context;
};

interface DevAIProviderProps {
  children: ReactNode;
}

export const DevAIProvider: React.FC<DevAIProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou seu assistente de desenvolvimento. Como posso te ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      image
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <DevAIContext.Provider value={{
      messages,
      addMessage,
      generatedCode,
      setGeneratedCode,
      isLoading,
      setIsLoading
    }}>
      {children}
    </DevAIContext.Provider>
  );
};
