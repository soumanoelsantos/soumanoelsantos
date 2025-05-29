import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  FolderOpen, 
  Clock, 
  Code2,
  Filter,
  SortAsc
} from 'lucide-react';
import { useDevAI } from '../DevAIContext';
import { useDevProjects } from '@/hooks/useDevProjects';
import NewProjectDialog from '../NewProjectDialog';
import ProjectCard from './ProjectCard';
import { DevProject } from '@/types/devai';

const ImprovedProjectsSidebar = () => {
  const { currentProject, setCurrentProject } = useDevAI();
  const { projects, createProject, deleteProject, isLoading } = useDevProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'updated' | 'created'>('updated');

  const filteredProjects = projects
    .filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  const handleSelectProject = (project: DevProject) => {
    setCurrentProject(project);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      await deleteProject(id);
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }
    }
  };

  const handleCreateProject = async (data: { name: string; description?: string; }) => {
    await createProject(data);
  };

  const recentProjects = filteredProjects.slice(0, 5);
  const otherProjects = filteredProjects.slice(5);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Projetos</h2>
            <Badge variant="secondary" className="text-xs">
              {projects.length}
            </Badge>
          </div>
          
          <NewProjectDialog
            onCreateProject={handleCreateProject}
            trigger={
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Novo
              </Button>
            }
          />
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === 'updated' ? 'name' : 'updated')}
              className="flex-1 text-xs"
            >
              <SortAsc className="h-3 w-3 mr-1" />
              {sortBy === 'updated' ? 'Recente' : 'Nome'}
            </Button>
            
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Code2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {searchQuery ? 'Nenhum projeto encontrado' : 'Nenhum projeto ainda'}
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {searchQuery 
                  ? 'Tente ajustar sua busca' 
                  : 'Crie seu primeiro projeto para começar'
                }
              </p>
              {!searchQuery && (
                <NewProjectDialog
                  onCreateProject={handleCreateProject}
                  trigger={
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Criar Projeto
                    </Button>
                  }
                />
              )}
            </div>
          ) : (
            <>
              {/* Recent Projects */}
              {recentProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-700">Recentes</h3>
                  </div>
                  <div className="space-y-2">
                    {recentProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={handleSelectProject}
                        onDelete={handleDeleteProject}
                        isSelected={currentProject?.id === project.id}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Projects */}
              {otherProjects.length > 0 && (
                <>
                  {recentProjects.length > 0 && <Separator className="my-4" />}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Outros Projetos
                    </h3>
                    <div className="space-y-2">
                      {otherProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onSelect={handleSelectProject}
                          onDelete={handleDeleteProject}
                          isSelected={currentProject?.id === project.id}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{projects.length} projeto{projects.length !== 1 ? 's' : ''}</span>
          {currentProject && (
            <span className="text-blue-600 font-medium">
              {currentProject.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovedProjectsSidebar;
