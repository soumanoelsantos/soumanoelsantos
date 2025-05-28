
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FolderOpen, Settings, MessageSquare } from 'lucide-react';
import ProjectsList from './ProjectsList';
import NewProjectDialog from './NewProjectDialog';
import { useDevProjects } from '@/hooks/useDevProjects';
import { useDevAI } from './DevAIContext';

interface ProjectsSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({ isOpen, onToggle }) => {
  const {
    projects,
    createProject,
    deleteProject,
    isLoading
  } = useDevProjects();
  
  const { currentProject, setCurrentProject } = useDevAI();

  const handleCreateProject = async (data: { name: string; description?: string }) => {
    const newProject = await createProject(data);
    if (newProject) {
      console.log(`✅ Novo projeto criado: ${newProject.name}`);
      setCurrentProject(newProject);
    }
  };

  const handleSelectProject = (project: any) => {
    console.log(`🔄 Selecionando projeto: ${project.name} (${project.id})`);
    setCurrentProject(project);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    // Se o projeto deletado era o atual, limpar seleção
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Projetos</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            ×
          </Button>
        </div>
        
        {currentProject && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {currentProject.name}
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Chat ativo - Histórico preservado
            </p>
          </div>
        )}
        
        <NewProjectDialog onCreateProject={handleCreateProject} />
      </div>
      
      <ScrollArea className="flex-1">
        <ProjectsList
          projects={projects}
          currentProject={currentProject}
          onSelectProject={handleSelectProject}
          onDeleteProject={handleDeleteProject}
          isLoading={isLoading}
        />
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
      </div>
    </div>
  );
};

export default ProjectsSidebar;
