
import React, { createContext, useContext, ReactNode } from 'react';
import { ProjectHistoryContextType } from '@/types/projectHistory';

const ProjectHistoryContext = createContext<ProjectHistoryContextType | undefined>(undefined);

export const useProjectHistory = () => {
  const context = useContext(ProjectHistoryContext);
  if (!context) {
    console.warn('⚠️ useProjectHistory chamado fora do ProjectHistoryProvider');
    return undefined;
  }
  return context;
};

interface ProjectHistoryProviderProps {
  children: ReactNode;
}

// Provider simplificado - agora o histórico é gerenciado através das mensagens do chat
export const ProjectHistoryProvider: React.FC<ProjectHistoryProviderProps> = ({ children }) => {
  console.log('🏗️ ProjectHistoryProvider inicializado (modo simplificado)');

  // Funções vazias para manter compatibilidade
  const addVersion = () => {
    console.log('⚠️ addVersion chamado mas não é mais usado - histórico gerenciado via mensagens');
  };

  const revertToVersion = () => {
    console.log('⚠️ revertToVersion chamado mas não é mais usado - use os botões nas mensagens');
  };

  const getVersionByNumber = () => {
    console.log('⚠️ getVersionByNumber chamado mas não é mais usado');
    return undefined;
  };

  const contextValue: ProjectHistoryContextType = {
    versions: [],
    currentVersion: 0,
    addVersion,
    revertToVersion,
    getVersionByNumber
  };

  return (
    <ProjectHistoryContext.Provider value={contextValue}>
      {children}
    </ProjectHistoryContext.Provider>
  );
};
