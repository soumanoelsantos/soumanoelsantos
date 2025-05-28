
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProjectVersion, ProjectHistoryContextType } from '@/types/projectHistory';
import { useDevAI } from './DevAIContext';

const ProjectHistoryContext = createContext<ProjectHistoryContextType | undefined>(undefined);

export const useProjectHistory = () => {
  const context = useContext(ProjectHistoryContext);
  if (!context) {
    throw new Error('useProjectHistory must be used within a ProjectHistoryProvider');
  }
  return context;
};

interface ProjectHistoryProviderProps {
  children: ReactNode;
}

export const ProjectHistoryProvider: React.FC<ProjectHistoryProviderProps> = ({ children }) => {
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<number>(0);
  const { setGeneratedCode, currentProject } = useDevAI();

  const addVersion = (code: string, message: string, userMessage?: string) => {
    if (!currentProject) {
      console.warn('⚠️ Tentativa de adicionar versão sem projeto ativo');
      return;
    }

    console.log('📝 Adicionando nova versão...');
    console.log('- Projeto:', currentProject.name);
    console.log('- Mensagem:', message);
    console.log('- Código (primeiros 100 chars):', code.substring(0, 100));

    const newVersion: ProjectVersion = {
      id: Date.now().toString(),
      version: versions.length + 1,
      code,
      message,
      timestamp: new Date(),
      userMessage
    };

    setVersions(prev => {
      const updated = [...prev, newVersion];
      console.log('📊 Versões após adicionar:', updated.length);
      return updated;
    });
    
    setCurrentVersion(newVersion.version);
    
    console.log(`✅ Nova versão adicionada: v${newVersion.version} - ${message}`);
  };

  const revertToVersion = (version: number) => {
    const targetVersion = versions.find(v => v.version === version);
    if (!targetVersion) {
      console.error(`❌ Versão ${version} não encontrada`);
      return;
    }

    console.log(`⏪ Revertendo para versão ${version}: ${targetVersion.message}`);
    setCurrentVersion(version);
    setGeneratedCode(targetVersion.code);
  };

  const getVersionByNumber = (version: number) => {
    return versions.find(v => v.version === version);
  };

  // Debug: Log sempre que versions mudar
  React.useEffect(() => {
    console.log('🔄 Versões atualizadas:', versions.length);
    versions.forEach((v, i) => {
      console.log(`  v${v.version}: ${v.message} (${v.timestamp.toLocaleTimeString()})`);
    });
  }, [versions]);

  return (
    <ProjectHistoryContext.Provider value={{
      versions,
      currentVersion,
      addVersion,
      revertToVersion,
      getVersionByNumber
    }}>
      {children}
    </ProjectHistoryContext.Provider>
  );
};
