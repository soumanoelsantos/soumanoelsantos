
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { DevAIService } from '@/services/devaiService';
import { DevProject, CreateProjectData } from '@/types/devai';

export const useDevProjects = () => {
  const [projects, setProjects] = useState<DevProject[]>([]);
  const [currentProject, setCurrentProject] = useState<DevProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadProjects = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const projectsList = await DevAIService.getProjects();
      setProjects(projectsList);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os projetos."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (data: CreateProjectData): Promise<DevProject | null> => {
    setIsLoading(true);
    try {
      const newProject = await DevAIService.createProject(data);
      if (newProject) {
        setProjects(prev => [newProject, ...prev]);
        setCurrentProject(newProject);
        toast({
          title: "Projeto criado!",
          description: `O projeto "${data.name}" foi criado com sucesso.`
        });
        return newProject;
      }
      return null;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível criar o projeto."
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadProject = async (id: string) => {
    setIsLoading(true);
    try {
      const project = await DevAIService.getProject(id);
      if (project) {
        setCurrentProject(project);
      }
    } catch (error) {
      console.error('Erro ao carregar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar o projeto."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, updates: Partial<DevProject>) => {
    try {
      const success = await DevAIService.updateProject(id, updates);
      if (success) {
        await loadProjects();
        if (currentProject?.id === id) {
          setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o projeto."
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const success = await DevAIService.deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (currentProject?.id === id) {
          setCurrentProject(null);
        }
        toast({
          title: "Projeto deletado",
          description: "O projeto foi removido com sucesso."
        });
      }
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível deletar o projeto."
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  return {
    projects,
    currentProject,
    isLoading,
    createProject,
    loadProject,
    updateProject,
    deleteProject,
    setCurrentProject,
    loadProjects
  };
};
