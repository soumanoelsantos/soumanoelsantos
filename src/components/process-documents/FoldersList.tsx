
import React, { useState } from 'react';
import { ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Folder, Edit, Trash2, Share2, Calendar } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import EditFolderDialog from './EditFolderDialog';
import ShareDialog from './ShareDialog';

interface FoldersListProps {
  folders: ProcessFolder[];
}

const FoldersList = ({ folders }: FoldersListProps) => {
  const { deleteFolder, toggleFolderPublic } = useProcessDocuments();
  const [editingFolder, setEditingFolder] = useState<ProcessFolder | null>(null);
  const [sharingFolder, setSharingFolder] = useState<ProcessFolder | null>(null);

  const handleDelete = async (folder: ProcessFolder) => {
    if (confirm(`Tem certeza que deseja excluir a pasta "${folder.name}"? Os documentos dentro dela não serão excluídos.`)) {
      await deleteFolder(folder.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (folders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Folder className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Nenhuma pasta criada</p>
        <p className="text-sm">Organize seus documentos criando pastas</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Folder className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium">{folder.name}</h3>
                {folder.is_public && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Público
                  </Badge>
                )}
              </div>
              
              {folder.description && (
                <p className="text-sm text-gray-600 mb-2">{folder.description}</p>
              )}
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Criada em {formatDate(folder.created_at)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingFolder(folder)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSharingFolder(folder)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(folder)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {editingFolder && (
        <EditFolderDialog
          folder={editingFolder}
          isOpen={!!editingFolder}
          onClose={() => setEditingFolder(null)}
        />
      )}

      {sharingFolder && (
        <ShareDialog
          type="folder"
          item={sharingFolder}
          isOpen={!!sharingFolder}
          onClose={() => setSharingFolder(null)}
          onTogglePublic={(isPublic) => toggleFolderPublic(sharingFolder.id, isPublic)}
        />
      )}
    </div>
  );
};

export default FoldersList;
