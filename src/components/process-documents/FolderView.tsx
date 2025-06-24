
import React, { useState } from 'react';
import { ProcessDocument, ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Trash2, Share2, Eye, Calendar, Plus, Download } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import EditDocumentDialog from './EditDocumentDialog';
import ViewDocumentDialog from './ViewDocumentDialog';
import ShareDialog from './ShareDialog';
import CreateDocumentDialog from './CreateDocumentDialog';
import DocumentDownloadDialog from './DocumentDownloadDialog';

interface FolderViewProps {
  folder: ProcessFolder;
  documents: ProcessDocument[];
  folders: ProcessFolder[];
}

const FolderView = ({ folder, documents, folders }: FolderViewProps) => {
  const { deleteDocument, toggleDocumentPublic } = useProcessDocuments();
  const [editingDocument, setEditingDocument] = useState<ProcessDocument | null>(null);
  const [viewingDocument, setViewingDocument] = useState<ProcessDocument | null>(null);
  const [sharingDocument, setSharingDocument] = useState<ProcessDocument | null>(null);
  const [downloadingDocument, setDownloadingDocument] = useState<ProcessDocument | null>(null);
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);

  // Filtrar documentos que pertencem a esta pasta
  const folderDocuments = documents.filter(doc => doc.folder_id === folder.id);

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
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateDocumentOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Documento nesta Pasta
        </Button>
      </div>

      {folderDocuments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum documento nesta pasta</p>
          <p className="text-sm">Crie o primeiro documento para esta pasta</p>
        </div>
      ) : (
        <div className="space-y-3">
          {folderDocuments.map((document) => (
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
                    onClick={() => setDownloadingDocument(document)}
                    title="Baixar documento"
                  >
                    <Download className="h-4 w-4" />
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

      {/* Dialogs */}
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

      {downloadingDocument && (
        <DocumentDownloadDialog
          document={downloadingDocument}
          isOpen={!!downloadingDocument}
          onClose={() => setDownloadingDocument(null)}
        />
      )}

      <CreateDocumentDialog 
        isOpen={isCreateDocumentOpen}
        onClose={() => setIsCreateDocumentOpen(false)}
        folders={folders}
        defaultFolderId={folder.id}
      />
    </div>
  );
};

export default FolderView;
