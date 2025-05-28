
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FolderOpen, Settings } from 'lucide-react';
import ProjectsList from './ProjectsList';
import NewProjectDialog from './NewProjectDialog';
import { useDevProjects } from '@/hooks/useDevProjects';

interface ProjectsSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({ isOpen, onToggle }) => {
  const {
    projects,
    currentProject,
    createProject,
    loadProject,
    deleteProject,
    isLoading,
    setCurrentProject
  } = useDevProjects();

  const handleCreateProject = async (data: { name: string; description?: string }) => {
    const newProject = await createProject(data);
    if (newProject) {
      setCurrentProject(newProject);
    }
  };

  const handleSelectProject = (project: any) => {
    setCurrentProject(project);
    loadProject(project.id);
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
        <NewProjectDialog onCreateProject={handleCreateProject} />
      </div>
      
      <ScrollArea className="flex-1">
        <ProjectsList
          projects={projects}
          currentProject={currentProject}
          onSelectProject={handleSelectProject}
          onDeleteProject={deleteProject}
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
