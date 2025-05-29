
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DevProject } from '@/types/devai';
import { Calendar, Code, ExternalLink, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: DevProject;
  onSelect: (project: DevProject) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelect, 
  onDelete, 
  isSelected 
}) => {
  const handleSelect = () => {
    onSelect(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(project.id);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-50' 
          : 'hover:border-gray-300'
      }`}
      onClick={handleSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 truncate">
            {project.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(project.updated_at), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Code className="h-3 w-3" />
            <span>{project.code ? 'Com código' : 'Vazio'}</span>
          </div>
        </div>
        
        {isSelected && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Abrir Projeto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
