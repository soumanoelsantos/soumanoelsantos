
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState<DevProject | null>(null);
  const [projectConversations, setProjectConversations] = useState<Record<string, Message[]>>({});

  const getDefaultMessage = (): Message => ({
    id: '1',
    type: 'assistant',
    content: 'Olá! Sou seu assistente de desenvolvimento. Como posso te ajudar hoje?',
    timestamp: new Date()
  });

  const addMessage = (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      image
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      
      // Salvar no cache local do projeto atual
      if (currentProject) {
        setProjectConversations(prevConversations => ({
          ...prevConversations,
          [currentProject.id]: updatedMessages
        }));
      }
      
      return updatedMessages;
    });
  };

  const updateCodeIncremental = async (code: string, isIncremental: boolean = true) => {
    console.log(`🔧 Atualizando código do projeto ${currentProject?.name} - Incremental: ${isIncremental}`);
    setGeneratedCode(code);
    
    if (currentProject) {
      await DevAIService.updateProjectCode(currentProject.id, code, isIncremental);
    }
  };

  const clearMessages = () => {
    const defaultMessage = getDefaultMessage();
    setMessages([defaultMessage]);
    
    if (currentProject) {
      setProjectConversations(prev => ({
        ...prev,
        [currentProject.id]: [defaultMessage]
      }));
    }
  };

  // Carregar conversa quando projeto muda
  useEffect(() => {
    const loadProjectData = async () => {
      if (!currentProject) {
        console.log('📝 Nenhum projeto selecionado, limpando dados');
        setMessages([getDefaultMessage()]);
        setGeneratedCode('');
        return;
      }

      console.log(`📂 Carregando dados do projeto: ${currentProject.name} (${currentProject.id})`);
      
      try {
        // Primeiro, verificar se temos no cache local
        if (projectConversations[currentProject.id]) {
          console.log('💾 Carregando conversa do cache local');
          setMessages(projectConversations[currentProject.id]);
        } else {
          // Carregar do banco de dados
          console.log('🗄️ Carregando conversa do banco de dados');
          const conversation = await DevAIService.loadConversation(currentProject.id);
          
          if (conversation.length > 0) {
            console.log(`✅ Conversa carregada: ${conversation.length} mensagens`);
            setMessages(conversation);
            // Salvar no cache local
            setProjectConversations(prev => ({
              ...prev,
              [currentProject.id]: conversation
            }));
          } else {
            console.log('📝 Nenhuma conversa encontrada, iniciando nova');
            const defaultMessage = getDefaultMessage();
            setMessages([defaultMessage]);
            setProjectConversations(prev => ({
              ...prev,
              [currentProject.id]: [defaultMessage]
            }));
          }
        }
        
        // Carregar código do projeto
        if (currentProject.code) {
          console.log(`💻 Código do projeto carregado: ${currentProject.code.length} caracteres`);
          setGeneratedCode(currentProject.code);
        } else {
          console.log('📄 Nenhum código encontrado no projeto');
          setGeneratedCode('');
        }
        
      } catch (error) {
        console.error('❌ Erro ao carregar dados do projeto:', error);
        const defaultMessage = getDefaultMessage();
        setMessages([defaultMessage]);
        setGeneratedCode('');
      }
    };

    loadProjectData();
  }, [currentProject?.id]); // Dependência apenas no ID do projeto

  // Salvar conversa automaticamente quando mensagens mudam
  useEffect(() => {
    if (currentProject && messages.length > 1) {
      const saveConversation = async () => {
        console.log(`💾 Salvando conversa do projeto ${currentProject.name}`);
        await DevAIService.saveConversation(currentProject.id, messages);
      };
      
      const timeoutId = setTimeout(saveConversation, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, currentProject?.id]);

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
