
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DevProject } from '@/types/devai';
import { DevAIService } from '@/services/devaiService';

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
  updateCodeIncremental: (code: string, isIncremental?: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentProject: DevProject | null;
  setCurrentProject: (project: DevProject | null) => void;
  clearMessages: () => void;
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
  const [currentProject, setCurrentProject] = useState<DevProject | null>(null);

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

  const updateCodeIncremental = async (code: string, isIncremental: boolean = true) => {
    setGeneratedCode(code);
    
    if (currentProject) {
      console.log(`Atualizando código do projeto ${currentProject.name} - Incremental: ${isIncremental}`);
      await DevAIService.updateProjectCode(currentProject.id, code, isIncremental);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Olá! Sou seu assistente de desenvolvimento. Como posso te ajudar hoje?',
        timestamp: new Date()
      }
    ]);
  };

  // Salvar conversa automaticamente quando mensagens mudam
  useEffect(() => {
    if (currentProject && messages.length > 1) {
      const saveConversation = async () => {
        await DevAIService.saveConversation(currentProject.id, messages);
      };
      
      const timeoutId = setTimeout(saveConversation, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, currentProject]);

  // Carregar conversa quando projeto muda
  useEffect(() => {
    if (currentProject) {
      const loadData = async () => {
        const conversation = await DevAIService.loadConversation(currentProject.id);
        if (conversation.length > 0) {
          setMessages(conversation);
        } else {
          clearMessages();
        }
        
        if (currentProject.code) {
          setGeneratedCode(currentProject.code);
        } else {
          setGeneratedCode('');
        }
      };
      
      loadData();
    }
  }, [currentProject]);

  return (
    <DevAIContext.Provider value={{
      messages,
      addMessage,
      generatedCode,
      setGeneratedCode,
      updateCodeIncremental,
      isLoading,
      setIsLoading,
      currentProject,
      setCurrentProject,
      clearMessages
    }}>
      {children}
    </DevAIContext.Provider>
  );
};
