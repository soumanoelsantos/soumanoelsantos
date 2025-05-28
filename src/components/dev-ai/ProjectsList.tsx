
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, MessageSquare, Calendar } from 'lucide-react';
import { DevProject } from '@/types/devai';

interface ProjectsListProps {
  projects: DevProject[];
  currentProject: DevProject | null;
  onSelectProject: (project: DevProject) => void;
  onDeleteProject: (id: string) => void;
  isLoading: boolean;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  currentProject,
  onSelectProject,
  onDeleteProject,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Nenhum projeto encontrado.</p>
        <p className="text-sm">Crie seu primeiro projeto para começar!</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            currentProject?.id === project.id 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelectProject(project)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold truncate flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                {project.name}
              </CardTitle>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-red-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProject(project.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {project.description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(project.updated_at).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex space-x-1">
                {project.code && (
                  <Badge variant="secondary" className="text-xs">
                    Com código
                  </Badge>
                )}
                {currentProject?.id === project.id && (
                  <Badge variant="default" className="text-xs bg-blue-500">
                    Ativo
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsList;
