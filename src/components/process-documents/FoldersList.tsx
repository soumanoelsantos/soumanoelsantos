
import React, { useState } from 'react';
import { ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Folder, Edit, Trash2, Share2, Calendar, Upload, FolderPlus } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import EditFolderDialog from './EditFolderDialog';
import ShareDialog from './ShareDialog';
import FileUploadDialog from './FileUploadDialog';
import CreateFolderDialog from './CreateFolderDialog';

interface FoldersListProps {
  folders: ProcessFolder[];
  onFolderClick?: (folder: ProcessFolder) => void;
  currentFolderId?: string; // Para mostrar apenas subpastas quando necessário
}

const FoldersList = ({ folders, onFolderClick, currentFolderId }: FoldersListProps) => {
  const { deleteFolder, toggleFolderPublic } = useProcessDocuments();
  const [editingFolder, setEditingFolder] = useState<ProcessFolder | null>(null);
  const [sharingFolder, setSharingFolder] = useState<ProcessFolder | null>(null);
  const [uploadingFolder, setUploadingFolder] = useState<ProcessFolder | null>(null);
  const [creatingSubfolder, setCreatingSubfolder] = useState<ProcessFolder | null>(null);

  // Filtrar pastas baseado no contexto atual
  const displayFolders = folders.filter(folder => {
    if (currentFolderId) {
      // Se estamos dentro de uma pasta, mostrar apenas suas subpastas
      return folder.parent_folder_id === currentFolderId;
    } else {
      // Se estamos na raiz, mostrar apenas pastas sem pai
      return !folder.parent_folder_id;
    }
  });

  const handleDelete = async (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir a pasta "${folder.name}"? Os documentos e subpastas dentro dela não serão excluídos.`)) {
      await deleteFolder(folder.id);
    }
  };

  const handleEdit = (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFolder(folder);
  };

  const handleShare = (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setSharingFolder(folder);
  };

  const handleUpload = (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadingFolder(folder);
  };

  const handleCreateSubfolder = (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setCreatingSubfolder(folder);
  };

  const handleFolderClick = (folder: ProcessFolder) => {
    if (onFolderClick) {
      onFolderClick(folder);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFolderDepth = (folder: ProcessFolder): number => {
    if (!folder.parent_folder_id) return 0;
    const parentFolder = folders.find(f => f.id === folder.parent_folder_id);
    return parentFolder ? getFolderDepth(parentFolder) + 1 : 0;
  };

  if (displayFolders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Folder className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>{currentFolderId ? 'Nenhuma subpasta criada' : 'Nenhuma pasta criada'}</p>
        <p className="text-sm">
          {currentFolderId ? 'Crie subpastas para organizar melhor seus documentos' : 'Organize seus documentos criando pastas'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayFolders.map((folder) => {
        const depth = getFolderDepth(folder);
        const hasSubfolders = folders.some(f => f.parent_folder_id === folder.id);
        
        return (
          <div
            key={folder.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleFolderClick(folder)}
            style={{ marginLeft: `${depth * 20}px` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium hover:text-blue-600 transition-colors">
                    {folder.name}
                  </h3>
                  {folder.is_public && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Público
                    </Badge>
                  )}
                  {hasSubfolders && (
                    <Badge variant="secondary" className="text-xs">
                      {folders.filter(f => f.parent_folder_id === folder.id).length} subpasta(s)
                    </Badge>
                  )}
                </div>
                
                {folder.description && (
                  <p className="text-sm text-gray-600 mb-2">{folder.description}</p>
                )}
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Criada em {formatDate(folder.created_at)}</span>
                  {folder.parent_folder_id && (
                    <>
                      <span>•</span>
                      <span>Subpasta</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleCreateSubfolder(folder, e)}
                  title="Criar subpasta"
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleUpload(folder, e)}
                  title="Upload de arquivos"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleEdit(folder, e)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleShare(folder, e)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleDelete(folder, e)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}

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

      {uploadingFolder && (
        <FileUploadDialog
          isOpen={!!uploadingFolder}
          onClose={() => setUploadingFolder(null)}
          folderId={uploadingFolder.id}
        />
      )}

      {creatingSubfolder && (
        <CreateFolderDialog
          isOpen={!!creatingSubfolder}
          onClose={() => setCreatingSubfolder(null)}
          parentFolderId={creatingSubfolder.id}
          folders={folders}
        />
      )}
    </div>
  );
};

export default FoldersList;
