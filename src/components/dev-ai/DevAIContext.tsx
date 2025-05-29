
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
  const [projectCodes, setProjectCodes] = useState<Record<string, string>>({});

  const getDefaultMessage = (): Message => ({
    id: '1',
    type: 'assistant',
    content: 'Olá! Sou seu assistente de desenvolvimento. Como posso te ajudar hoje?',
    timestamp: new Date()
  });

  const addMessage = (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }) => {
    console.log('💬 Adicionando nova mensagem:', { type, content: content.substring(0, 100) });
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      image
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      console.log('📝 Total de mensagens agora:', updatedMessages.length);
      
      // Salvar no cache local do projeto atual
      if (currentProject) {
        setProjectConversations(prevConversations => ({
          ...prevConversations,
          [currentProject.id]: updatedMessages
        }));
        console.log('💾 Mensagem salva no cache do projeto:', currentProject.name);
      }
      
      return updatedMessages;
    });
  };

  const updateCodeIncremental = async (code: string, isIncremental: boolean = true) => {
    console.log('🔧 Atualizando código do projeto...');
    console.log('📊 Detalhes da atualização:');
    console.log('- Projeto atual:', currentProject?.name || 'nenhum');
    console.log('- Modo incremental:', isIncremental);
    console.log('- Tamanho do código:', code.length);
    console.log('- Código anterior existia:', !!generatedCode);
    console.log('- Primeiros 100 chars do novo código:', code.substring(0, 100));
    
    setGeneratedCode(code);
    
    // Salvar no cache local do projeto atual
    if (currentProject) {
      setProjectCodes(prev => ({
        ...prev,
        [currentProject.id]: code
      }));
      console.log('💾 Código salvo no cache do projeto:', currentProject.name);
      
      try {
        await DevAIService.updateProjectCode(currentProject.id, code, isIncremental);
        console.log('✅ Código salvo no banco de dados com sucesso');
      } catch (error) {
        console.error('❌ Erro ao salvar código no banco:', error);
      }
    } else {
      console.warn('⚠️ Nenhum projeto ativo para salvar o código');
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

  // Carregar conversa e código quando projeto muda
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
        // Carregar conversa
        if (projectConversations[currentProject.id]) {
          console.log('💾 Carregando conversa do cache local');
          setMessages(projectConversations[currentProject.id]);
        } else {
          console.log('🗄️ Carregando conversa do banco de dados');
          const conversation = await DevAIService.loadConversation(currentProject.id);
          
          if (conversation.length > 0) {
            console.log(`✅ Conversa carregada: ${conversation.length} mensagens`);
            setMessages(conversation);
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
        
        // Carregar código - primeiro do cache local, depois do projeto
        let codeToLoad = '';
        
        if (projectCodes[currentProject.id]) {
          console.log('💻 Carregando código do cache local');
          codeToLoad = projectCodes[currentProject.id];
        } else if (currentProject.code) {
          console.log('💻 Carregando código do projeto no banco');
          codeToLoad = currentProject.code;
          // Salvar no cache local
          setProjectCodes(prev => ({
            ...prev,
            [currentProject.id]: currentProject.code
          }));
        }
        
        if (codeToLoad) {
          console.log(`💻 Código carregado: ${codeToLoad.length} caracteres`);
          setGeneratedCode(codeToLoad);
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
  }, [currentProject?.id]);

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
