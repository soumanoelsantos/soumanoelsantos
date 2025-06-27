
import React, { useState } from 'react';
import { ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Folder, Edit, Trash2, Share2, Calendar, Upload, Plus, FolderPlus } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import EditFolderDialog from './EditFolderDialog';
import ShareDialog from './ShareDialog';
import FileUploadDialog from './FileUploadDialog';
import CreateFolderDialog from './CreateFolderDialog';

interface FoldersListProps {
  folders: ProcessFolder[];
  onFolderClick?: (folder: ProcessFolder) => void;
  parentFolderId?: string;
  level?: number;
}

const FoldersList = ({ folders, onFolderClick, parentFolderId, level = 0 }: FoldersListProps) => {
  const { deleteFolder, toggleFolderPublic, getSubfolders } = useProcessDocuments();
  const [editingFolder, setEditingFolder] = useState<ProcessFolder | null>(null);
  const [sharingFolder, setSharingFolder] = useState<ProcessFolder | null>(null);
  const [uploadingFolder, setUploadingFolder] = useState<ProcessFolder | null>(null);
  const [creatingSubfolder, setCreatingSubfolder] = useState<string | null>(null);

  // Filter folders based on parent
  const currentLevelFolders = folders.filter(folder => folder.parent_folder_id === parentFolderId);

  const handleDelete = async (folder: ProcessFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if folder has subfolders or documents
    const subfolders = getSubfolders(folder.id);
    const hasSubfolders = subfolders.length > 0;
    
    let confirmMessage = `Tem certeza que deseja excluir a pasta "${folder.name}"?`;
    if (hasSubfolders) {
      confirmMessage += ` Esta pasta contém ${subfolders.length} subpasta(s).`;
    }
    confirmMessage += ' Os documentos dentro dela não serão excluídos.';
    
    if (confirm(confirmMessage)) {
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
    setCreatingSubfolder(folder.id);
  };

  const handleFolderClick = (folder: ProcessFolder) => {
    if (onFolderClick) {
      onFolderClick(folder);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (currentLevelFolders.length === 0 && level === 0) {
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
      {currentLevelFolders.map((folder) => {
        const subfolders = getSubfolders(folder.id);
        const hasSubfolders = subfolders.length > 0;
        
        return (
          <div key={folder.id} className="space-y-2">
            <div
              className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                level > 0 ? 'ml-6 border-l-4 border-l-blue-200' : ''
              }`}
              onClick={() => handleFolderClick(folder)}
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
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {subfolders.length} subpasta{subfolders.length > 1 ? 's' : ''}
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
            
            {/* Render subfolders recursively */}
            {hasSubfolders && (
              <FoldersList
                folders={folders}
                onFolderClick={onFolderClick}
                parentFolderId={folder.id}
                level={level + 1}
              />
            )}
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
          parentFolderId={creatingSubfolder}
          folders={folders}
        />
      )}
    </div>
  );
};

export default FoldersList;
