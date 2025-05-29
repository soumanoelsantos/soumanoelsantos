import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DevProject } from '@/types/devai';
import { DevAIService } from '@/services/devaiService';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
  projectState?: string; // Estado do projeto no momento da mensagem
}

interface DevAIContextType {
  messages: Message[];
  addMessage: (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }, projectState?: string) => void;
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

  const addMessage = (content: string, type: 'user' | 'assistant', image?: { file: File; preview: string }, projectState?: string) => {
    console.log('💬 Adicionando nova mensagem:', { type, content: content.substring(0, 100) });
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      image,
      projectState // Salvar o estado do projeto na mensagem
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
    console.log('- Primeiros 200 chars do novo código:', code.substring(0, 200));
    
    if (isIncremental && generatedCode && generatedCode.trim().length > 100) {
      console.log('🔄 Combinando código existente com novo código');
      
      // Verificar se o novo código é uma página adicional ou substituição
      const isNewPage = code.includes('class="page-content"') || 
                       code.includes('data-page=') ||
                       code.includes('nav-tab');
      
      if (isNewPage) {
        console.log('📄 Detectada nova página, integrando ao código existente...');
        
        // Se o código existente tem estrutura de navegação, integrar
        if (generatedCode.includes('nav-tab') && generatedCode.includes('page-content')) {
          console.log('🔗 Integrando nova página ao sistema de navegação existente');
          
          // Extrair o conteúdo da nova página mais rigorosamente
          const newPageTabMatch = code.match(/<div[^>]*class="[^"]*nav-tab[^"]*"[^>]*data-page="([^"]*)"[^>]*>([^<]*)<\/div>/);
          const newPageContentMatch = code.match(/<div[^>]*class="[^"]*page-content[^"]*"[^>]*data-page="([^"]*)"[^>]*>([\s\S]*?)<\/div>/);
          
          if (newPageTabMatch && newPageContentMatch && newPageTabMatch[1] === newPageContentMatch[1]) {
            const pageId = newPageTabMatch[1];
            const tabContent = newPageTabMatch[0];
            const pageContent = newPageContentMatch[0];
            
            // Verificar se a página já existe
            const pageExists = generatedCode.includes(`data-page="${pageId}"`);
            
            if (!pageExists) {
              // Adicionar nova aba ao menu existente
              let updatedCode = generatedCode.replace(
                /(<div class="nav-tabs">[\s\S]*?)(\s*<\/div>)/,
                `$1            ${tabContent}\n$2`
              );
              
              // Adicionar novo conteúdo da página antes do fechamento do container
              updatedCode = updatedCode.replace(
                /(\s*<\/div>\s*<\/div>\s*<style>)/,
                `        ${pageContent}\n$1`
              );
              
              console.log('✅ Nova página integrada com sucesso');
              setGeneratedCode(updatedCode);
            } else {
              console.log('⚠️ Página já existe, substituindo conteúdo');
              // Substituir conteúdo da página existente
              const updatedCode = generatedCode.replace(
                new RegExp(`<div[^>]*class="[^"]*page-content[^"]*"[^>]*data-page="${pageId}"[^>]*>[\\s\\S]*?<\\/div>`),
                pageContent
              );
              setGeneratedCode(updatedCode);
            }
          } else {
            console.log('⚠️ Estrutura de página não reconhecida, usando código novo');
            setGeneratedCode(code);
          }
        } else {
          console.log('📄 Código existente sem navegação, substituindo');
          setGeneratedCode(code);
        }
      } else {
        // Verificar se os códigos são muito similares
        const similarity = calculateSimilarity(generatedCode, code);
        console.log('📊 Similaridade entre códigos:', similarity);
        
        if (similarity > 0.8) {
          console.log('⚠️ Códigos muito similares, mantendo existente');
          // Não atualizar se muito similar para evitar perder o estado atual
        } else {
          console.log('🔄 Atualizando com novo código');
          setGeneratedCode(code);
        }
      }
    } else {
      console.log('📄 Definindo novo código (não incremental ou sem código anterior)');
      setGeneratedCode(code);
    }
    
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

  // Função para calcular similaridade entre dois códigos
  const calculateSimilarity = (code1: string, code2: string): number => {
    const normalize = (str: string) => str.replace(/\s+/g, ' ').trim().toLowerCase();
    const norm1 = normalize(code1);
    const norm2 = normalize(code2);
    
    if (norm1 === norm2) return 1;
    if (norm1.length === 0 || norm2.length === 0) return 0;
    
    const longer = norm1.length > norm2.length ? norm1 : norm2;
    const shorter = norm1.length > norm2.length ? norm2 : norm1;
    
    const editDistance = calculateEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  // Função para calcular distância de edição
  const calculateEditDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
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
