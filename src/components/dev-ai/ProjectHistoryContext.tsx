
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProjectVersion, ProjectHistoryContextType } from '@/types/projectHistory';
import { useDevAI } from './DevAIContext';

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

export const ProjectHistoryProvider: React.FC<ProjectHistoryProviderProps> = ({ children }) => {
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<number>(0);
  const devAI = useDevAI();

  // Debug: Log quando o provider é inicializado
  useEffect(() => {
    console.log('🏗️ ProjectHistoryProvider inicializado');
    console.log('- DevAI context disponível:', !!devAI);
    console.log('- setGeneratedCode disponível:', !!(devAI?.setGeneratedCode));
  }, [devAI]);

  const addVersion = (code: string, message: string, userMessage?: string) => {
    if (!devAI?.currentProject) {
      console.warn('⚠️ Tentativa de adicionar versão sem projeto ativo');
      console.warn('- DevAI disponível:', !!devAI);
      console.warn('- Projeto atual:', devAI?.currentProject?.name || 'nenhum');
      return;
    }

    console.log('📝 Adicionando nova versão...');
    console.log('- Projeto:', devAI.currentProject.name);
    console.log('- Mensagem:', message);
    console.log('- Mensagem do usuário:', userMessage);
    console.log('- Código (primeiros 100 chars):', code.substring(0, 100));

    const newVersion: ProjectVersion = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      version: versions.length + 1,
      code,
      message,
      timestamp: new Date(),
      userMessage
    };

    console.log('🆕 Nova versão criada:', {
      id: newVersion.id,
      version: newVersion.version,
      timestamp: newVersion.timestamp.toISOString()
    });

    setVersions(prev => {
      const updated = [...prev, newVersion];
      console.log('📊 Versões após adicionar:', updated.length);
      console.log('📋 Lista de versões:');
      updated.forEach((v, i) => {
        console.log(`  ${i + 1}. v${v.version}: ${v.message} (${v.timestamp.toLocaleTimeString()})`);
      });
      return updated;
    });
    
    setCurrentVersion(newVersion.version);
    
    console.log(`✅ Nova versão adicionada: v${newVersion.version} - ${message}`);
  };

  const revertToVersion = (version: number) => {
    if (!devAI?.setGeneratedCode) {
      console.error('❌ setGeneratedCode não disponível para reverter');
      return;
    }

    const targetVersion = versions.find(v => v.version === version);
    if (!targetVersion) {
      console.error(`❌ Versão ${version} não encontrada`);
      console.log('📋 Versões disponíveis:', versions.map(v => v.version));
      return;
    }

    console.log(`⏪ Revertendo para versão ${version}: ${targetVersion.message}`);
    setCurrentVersion(version);
    devAI.setGeneratedCode(targetVersion.code);
    
    console.log('✅ Reversão concluída');
  };

  const getVersionByNumber = (version: number) => {
    const found = versions.find(v => v.version === version);
    console.log(`🔍 Buscando versão ${version}:`, found ? 'encontrada' : 'não encontrada');
    return found;
  };

  // Debug: Log sempre que versions mudar
  useEffect(() => {
    console.log('🔄 Estado de versões atualizado:');
    console.log('- Total de versões:', versions.length);
    console.log('- Versão atual:', currentVersion);
    
    if (versions.length > 0) {
      console.log('📋 Detalhes das versões:');
      versions.forEach((v, i) => {
        const isCurrent = v.version === currentVersion;
        console.log(`  ${isCurrent ? '👉' : '  '} v${v.version}: ${v.message} (${v.timestamp.toLocaleTimeString()})`);
      });
    } else {
      console.log('📭 Nenhuma versão salva ainda');
    }
  }, [versions, currentVersion]);

  // Debug: Log quando o projeto muda
  useEffect(() => {
    if (devAI?.currentProject) {
      console.log('🔄 Projeto mudou:', devAI.currentProject.name);
      console.log('- Limpando histórico para novo projeto');
      // Não limpar automaticamente - deixar para o usuário decidir
    }
  }, [devAI?.currentProject?.id]);

  const contextValue: ProjectHistoryContextType = {
    versions,
    currentVersion,
    addVersion,
    revertToVersion,
    getVersionByNumber
  };

  console.log('🎯 ProjectHistoryProvider renderizando com contexto:', {
    versionsCount: versions.length,
    currentVersion,
    hasAddVersion: !!addVersion,
    hasRevertToVersion: !!revertToVersion
  });

  return (
    <ProjectHistoryContext.Provider value={contextValue}>
      {children}
    </ProjectHistoryContext.Provider>
  );
};
