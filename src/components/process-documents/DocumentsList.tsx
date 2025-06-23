
import React, { useState } from 'react';
import { ProcessDocument, ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Edit, Trash2, Share2, Eye, Folder, Calendar } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import EditDocumentDialog from './EditDocumentDialog';
import ViewDocumentDialog from './ViewDocumentDialog';
import ShareDialog from './ShareDialog';

interface DocumentsListProps {
  documents: ProcessDocument[];
  folders: ProcessFolder[];
}

const DocumentsList = ({ documents, folders }: DocumentsListProps) => {
  const { deleteDocument, toggleDocumentPublic } = useProcessDocuments();
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [editingDocument, setEditingDocument] = useState<ProcessDocument | null>(null);
  const [viewingDocument, setViewingDocument] = useState<ProcessDocument | null>(null);
  const [sharingDocument, setSharingDocument] = useState<ProcessDocument | null>(null);

  const filteredDocuments = documents.filter(doc => {
    if (selectedFolder === 'all') return true;
    if (selectedFolder === 'no-folder') return !doc.folder_id;
    return doc.folder_id === selectedFolder;
  });

  const getFolderName = (folderId?: string) => {
    if (!folderId) return null;
    const folder = folders.find(f => f.id === folderId);
    return folder?.name;
  };

  const handleDelete = async (document: ProcessDocument) => {
    if (confirm(`Tem certeza que deseja excluir o documento "${document.title}"?`)) {
      await deleteDocument(document.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por pasta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os documentos</SelectItem>
            <SelectItem value="no-folder">Sem pasta</SelectItem>
            {folders.map(folder => (
              <SelectItem key={folder.id} value={folder.id}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum documento encontrado</p>
          <p className="text-sm">Crie seu primeiro documento de processo</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium">{document.title}</h3>
                    {document.is_public && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Público
                      </Badge>
                    )}
                  </div>
                  
                  {document.description && (
                    <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {document.folder_id && (
                      <div className="flex items-center gap-1">
                        <Folder className="h-3 w-3" />
                        <span>{getFolderName(document.folder_id)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Criado em {formatDate(document.created_at)}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {document.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingDocument(document)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDocument(document)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSharingDocument(document)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(document)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingDocument && (
        <EditDocumentDialog
          document={editingDocument}
          folders={folders}
          isOpen={!!editingDocument}
          onClose={() => setEditingDocument(null)}
        />
      )}

      {viewingDocument && (
        <ViewDocumentDialog
          document={viewingDocument}
          isOpen={!!viewingDocument}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {sharingDocument && (
        <ShareDialog
          type="document"
          item={sharingDocument}
          isOpen={!!sharingDocument}
          onClose={() => setSharingDocument(null)}
          onTogglePublic={(isPublic) => toggleDocumentPublic(sharingDocument.id, isPublic)}
        />
      )}
    </div>
  );
};

export default DocumentsList;
