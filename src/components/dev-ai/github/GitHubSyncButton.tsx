
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GitHubService, GitHubIntegration } from '@/services/githubService';
import { Github, Upload, Settings, Loader2 } from 'lucide-react';
import GitHubIntegrationDialog from './GitHubIntegrationDialog';

interface GitHubSyncButtonProps {
  projectId: string;
  projectName: string;
  code: string;
}

const GitHubSyncButton: React.FC<GitHubSyncButtonProps> = ({
  projectId,
  projectName,
  code
}) => {
  const [integration, setIntegration] = useState<GitHubIntegration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIntegration();
  }, [projectId]);

  const loadIntegration = async () => {
    if (!projectId) return;
    
    setIsLoading(true);
    try {
      const data = await GitHubService.getProjectIntegration(projectId);
      setIntegration(data);
    } catch (error) {
      console.error('Error loading GitHub integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (!integration || !code) {
      toast({
        variant: "destructive",
        title: "Não é possível sincronizar",
        description: "Verifique se há código para sincronizar e se a integração está configurada."
      });
      return;
    }

    setIsSyncing(true);
    try {
      // Preparar arquivos para envio
      const files = [
        {
          path: 'index.html',
          content: code
        },
        {
          path: 'README.md',
          content: `# ${projectName}\n\nProjeto criado com DevAI\n\nGerado automaticamente em: ${new Date().toLocaleString()}`
        }
      ];

      const commitMessage = `Update from DevAI - ${new Date().toLocaleString()}`;
      
      const [owner, repo] = integration.repository_name.split('/');
      
      await GitHubService.pushCode(
        integration.github_token,
        owner,
        repo,
        integration.branch_name,
        files,
        commitMessage
      );

      toast({
        title: "Código sincronizado!",
        description: `O código foi enviado para o repositório ${integration.repository_name}.`
      });

      // Atualizar timestamp da última sincronização
      // Isso seria feito via edge function para atualizar a tabela
      
    } catch (error) {
      console.error('Error syncing code:', error);
      toast({
        variant: "destructive",
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar o código. Verifique sua conexão e tente novamente."
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConfigure = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadIntegration(); // Recarregar integração após configuração
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Carregando...
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        {integration ? (
          <>
            <Button
              onClick={handleSync}
              disabled={isSyncing || !code}
              size="sm"
              className="flex items-center space-x-2"
            >
              {isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <span>{isSyncing ? 'Sincronizando...' : 'Sync GitHub'}</span>
            </Button>
            
            <Button
              onClick={handleConfigure}
              variant="outline"
              size="sm"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            onClick={handleConfigure}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Github className="h-4 w-4" />
            <span>Conectar GitHub</span>
          </Button>
        )}
      </div>

      <GitHubIntegrationDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        projectId={projectId}
        projectName={projectName}
      />
    </>
  );
};

export default GitHubSyncButton;
