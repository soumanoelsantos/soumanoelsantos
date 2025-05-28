
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { GitHubService, GitHubRepository } from '@/services/githubService';
import { Loader2, Github, ExternalLink } from 'lucide-react';

interface GitHubIntegrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

const GitHubIntegrationDialog: React.FC<GitHubIntegrationDialogProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName
}) => {
  const [step, setStep] = useState<'auth' | 'repository' | 'success'>('auth');
  const [token, setToken] = useState('');
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [newRepoName, setNewRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-'));
  const [createNew, setCreateNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [githubUser, setGithubUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setStep('auth');
      setToken('');
      setRepositories([]);
      setSelectedRepo('');
      setGithubUser(null);
    }
  }, [isOpen]);

  const handleAuthenticate = async () => {
    if (!token.trim()) {
      toast({
        variant: "destructive",
        title: "Token necessário",
        description: "Por favor, insira seu Personal Access Token do GitHub."
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await GitHubService.authenticateWithToken(token);
      setGithubUser(user);
      
      const repos = await GitHubService.listRepositories(token);
      setRepositories(repos);
      setStep('repository');
      
      toast({
        title: "Autenticação realizada!",
        description: `Conectado como ${user.name || user.login}`
      });
    } catch (error) {
      console.error('Error authenticating:', error);
      toast({
        variant: "destructive",
        title: "Erro na autenticação",
        description: "Verifique se seu token está correto e tem as permissões necessárias."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRepository = async () => {
    if (!newRepoName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome necessário",
        description: "Por favor, insira um nome para o repositório."
      });
      return;
    }

    setIsLoading(true);
    try {
      const repo = await GitHubService.createRepository(
        token,
        newRepoName,
        `Código gerado pelo DevAI para o projeto: ${projectName}`,
        true
      );
      
      await saveIntegration(repo.full_name, repo.html_url, repo.default_branch);
      
      toast({
        title: "Repositório criado!",
        description: `O repositório ${repo.name} foi criado com sucesso.`
      });
      
      setStep('success');
    } catch (error) {
      console.error('Error creating repository:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar repositório",
        description: "Não foi possível criar o repositório. Tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectRepository = async () => {
    if (!selectedRepo) {
      toast({
        variant: "destructive",
        title: "Repositório necessário",
        description: "Por favor, selecione um repositório."
      });
      return;
    }

    setIsLoading(true);
    try {
      const repo = repositories.find(r => r.full_name === selectedRepo);
      if (!repo) {
        throw new Error('Repositório não encontrado');
      }

      await saveIntegration(repo.full_name, repo.html_url, repo.default_branch);
      
      toast({
        title: "Repositório conectado!",
        description: `Integração configurada com ${repo.name}.`
      });
      
      setStep('success');
    } catch (error) {
      console.error('Error connecting repository:', error);
      toast({
        variant: "destructive",
        title: "Erro ao conectar repositório",
        description: "Não foi possível conectar ao repositório. Tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveIntegration = async (repoFullName: string, repoUrl: string, branch: string) => {
    await GitHubService.saveIntegration({
      project_id: projectId,
      github_token: token,
      github_username: githubUser.login,
      repository_name: repoFullName,
      repository_url: repoUrl,
      branch_name: branch
    });
  };

  const renderAuthStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <Github className="h-12 w-12 mx-auto mb-4 text-gray-600" />
        <h3 className="text-lg font-semibold mb-2">Conectar ao GitHub</h3>
        <p className="text-sm text-gray-600 mb-4">
          Para integrar com o GitHub, você precisa de um Personal Access Token
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="token">Personal Access Token</Label>
        <Input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
        />
        <p className="text-xs text-gray-500">
          O token deve ter permissões: repo, user
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleAuthenticate} disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Conectar
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <p className="text-xs text-gray-500">
          <a 
            href="https://github.com/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            Criar Personal Access Token <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>
    </div>
  );

  const renderRepositoryStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Escolher Repositório</h3>
        <p className="text-sm text-gray-600">
          Conecte a um repositório existente ou crie um novo
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={!createNew}
              onChange={() => setCreateNew(false)}
            />
            <span>Usar repositório existente</span>
          </Label>
          
          {!createNew && (
            <div className="mt-2">
              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um repositório" />
                </SelectTrigger>
                <SelectContent>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.full_name}>
                      {repo.full_name} {repo.private && '(privado)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div>
          <Label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={createNew}
              onChange={() => setCreateNew(true)}
            />
            <span>Criar novo repositório</span>
          </Label>
          
          {createNew && (
            <div className="mt-2">
              <Input
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                placeholder="nome-do-repositorio"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('auth')}>
          Voltar
        </Button>
        <Button 
          onClick={createNew ? handleCreateRepository : handleConnectRepository}
          disabled={isLoading || (!createNew && !selectedRepo) || (createNew && !newRepoName)}
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {createNew ? 'Criar Repositório' : 'Conectar'}
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-4 text-center">
      <div className="text-green-600">
        <Github className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Integração Configurada!</h3>
        <p className="text-sm text-gray-600">
          Seu projeto está agora conectado ao GitHub. Você pode sincronizar o código automaticamente.
        </p>
      </div>
      
      <Button onClick={onClose} className="w-full">
        Concluir
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Integração com GitHub</DialogTitle>
        </DialogHeader>
        
        {step === 'auth' && renderAuthStep()}
        {step === 'repository' && renderRepositoryStep()}
        {step === 'success' && renderSuccessStep()}
      </DialogContent>
    </Dialog>
  );
};

export default GitHubIntegrationDialog;
