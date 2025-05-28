
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
  const [step, setStep] = useState<'auth' | 'repo' | 'config'>('auth');
  const [token, setToken] = useState('');
  const [user, setUser] = useState<any>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [branchName, setBranchName] = useState('main');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewRepo, setCreateNewRepo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && projectName && !newRepoName) {
      setNewRepoName(projectName.toLowerCase().replace(/\s+/g, '-'));
      setNewRepoDescription(`Projeto ${projectName} criado com DevAI`);
    }
  }, [isOpen, projectName, newRepoName]);

  const handleAuth = async () => {
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
      const githubUser = await GitHubService.authenticateWithToken(token);
      setUser(githubUser);
      
      const repos = await GitHubService.listRepositories(token);
      setRepositories(repos);
      
      setStep('repo');
      toast({
        title: "Autenticação bem-sucedida!",
        description: `Conectado como ${githubUser.name || githubUser.login}`
      });
    } catch (error) {
      console.error('Error authenticating:', error);
      toast({
        variant: "destructive",
        title: "Erro na autenticação",
        description: "Token inválido ou erro na conexão com GitHub."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepoSelection = () => {
    if (!createNewRepo && !selectedRepo) {
      toast({
        variant: "destructive",
        title: "Repositório necessário",
        description: "Por favor, selecione um repositório existente."
      });
      return;
    }

    if (createNewRepo && !newRepoName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome necessário",
        description: "Por favor, insira um nome para o novo repositório."
      });
      return;
    }

    setStep('config');
  };

  const handleCreateRepo = async () => {
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
        newRepoDescription,
        isPrivate
      );
      
      setSelectedRepo(repo);
      toast({
        title: "Repositório criado!",
        description: `Repositório ${repo.name} foi criado com sucesso.`
      });
    } catch (error) {
      console.error('Error creating repository:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar repositório",
        description: "Não foi possível criar o repositório. Verifique se o nome não está em uso."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveIntegration = async () => {
    if (!selectedRepo || !user) {
      toast({
        variant: "destructive",
        title: "Dados incompletos",
        description: "Faltam informações necessárias para salvar a integração."
      });
      return;
    }

    setIsLoading(true);
    try {
      await GitHubService.saveIntegration({
        project_id: projectId,
        github_token: token,
        github_username: user.login,
        repository_name: selectedRepo.full_name,
        repository_url: selectedRepo.html_url,
        branch_name: branchName,
        auto_sync: true // Adicionado o campo obrigatório auto_sync
      });

      toast({
        title: "Integração configurada!",
        description: `Projeto conectado ao repositório ${selectedRepo.full_name}.`
      });

      onClose();
      
      // Reset do estado
      setStep('auth');
      setToken('');
      setUser(null);
      setSelectedRepo(null);
      setRepositories([]);
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar a integração. Tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = () => {
    setStep('auth');
    setToken('');
    setUser(null);
    setSelectedRepo(null);
    setRepositories([]);
    setCreateNewRepo(false);
    setBranchName('main');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetDialog();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Github className="h-5 w-5" />
            <span>Integração GitHub</span>
          </DialogTitle>
        </DialogHeader>

        {step === 'auth' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Personal Access Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Você precisa de um token com permissões de 'repo' e 'user'. 
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline ml-1 inline-flex items-center"
                >
                  Criar token <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </p>
            </div>
            
            <Button onClick={handleAuth} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Github className="h-4 w-4 mr-2" />
              )}
              Conectar GitHub
            </Button>
          </div>
        )}

        {step === 'repo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Escolher Repositório</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant={createNewRepo ? "outline" : "default"}
                  size="sm"
                  onClick={() => setCreateNewRepo(false)}
                >
                  Existente
                </Button>
                <Button
                  variant={createNewRepo ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCreateNewRepo(true)}
                >
                  Criar Novo
                </Button>
              </div>
            </div>

            {createNewRepo ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="repoName">Nome do Repositório</Label>
                  <Input
                    id="repoName"
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    placeholder="meu-projeto"
                  />
                </div>
                <div>
                  <Label htmlFor="repoDesc">Descrição (opcional)</Label>
                  <Input
                    id="repoDesc"
                    value={newRepoDescription}
                    onChange={(e) => setNewRepoDescription(e.target.value)}
                    placeholder="Descrição do projeto..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                  <Label htmlFor="private">Repositório privado</Label>
                </div>
                <Button onClick={handleCreateRepo} disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Criar Repositório
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Label>Selecionar Repositório</Label>
                <Select value={selectedRepo?.id.toString()} onValueChange={(value) => {
                  const repo = repositories.find(r => r.id.toString() === value);
                  setSelectedRepo(repo || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um repositório..." />
                  </SelectTrigger>
                  <SelectContent>
                    {repositories.map((repo) => (
                      <SelectItem key={repo.id} value={repo.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <span>{repo.name}</span>
                          {repo.private && <span className="text-xs bg-gray-200 px-1 rounded">privado</span>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep('auth')} className="flex-1">
                Voltar
              </Button>
              <Button 
                onClick={handleRepoSelection} 
                disabled={!selectedRepo && !createNewRepo}
                className="flex-1"
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 'config' && selectedRepo && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuração Final</h3>
            
            <div className="space-y-2">
              <Label>Repositório Selecionado</Label>
              <div className="p-2 bg-gray-50 rounded border">
                <p className="font-medium">{selectedRepo.full_name}</p>
                <p className="text-sm text-gray-600">{selectedRepo.html_url}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="main"
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep('repo')} className="flex-1">
                Voltar
              </Button>
              <Button onClick={handleSaveIntegration} disabled={isLoading} className="flex-1">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Salvar Integração
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GitHubIntegrationDialog;
