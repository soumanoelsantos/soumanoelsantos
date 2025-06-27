
import React, { useState } from 'react';
import { ProcessDocument, ProcessFolder } from '@/types/processDocuments';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Download, ExternalLink, Trash2, Edit, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import FileUploadDialog from './FileUploadDialog';
import EditDocumentDialog from './EditDocumentDialog';
import ViewDocumentDialog from './ViewDocumentDialog';
import { toast } from 'sonner';

interface FolderViewProps {
  folder: ProcessFolder;
  documents: ProcessDocument[];
  folders: ProcessFolder[];
}

const FolderView = ({ folder, documents, folders }: FolderViewProps) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<ProcessDocument | null>(null);
  const [viewingDocument, setViewingDocument] = useState<ProcessDocument | null>(null);
  const { deleteDocument, refetch } = useProcessDocuments();

  // Filter documents that belong to this folder
  const folderDocuments = documents.filter(doc => doc.folder_id === folder.id);

  const handleUploadSuccess = () => {
    console.log('Upload success, refreshing documents...');
    refetch();
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      try {
        await deleteDocument(documentId);
        toast.success('Documento excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir documento:', error);
        toast.error('Erro ao excluir documento');
      }
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documentos da Pasta</h3>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload de Arquivos
        </Button>
      </div>

      {folderDocuments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum documento nesta pasta</p>
          <p className="text-sm">Faça upload de arquivos para começar</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {folderDocuments.map((document) => (
            <div key={document.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{document.title}</h4>
                  {document.description && (
                    <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Criado em {format(new Date(document.created_at), 'dd/MM/yyyy', { locale: ptBR })}</span>
                    {document.file_size && (
                      <span>{formatFileSize(document.file_size)}</span>
                    )}
                    {document.file_type && (
                      <span className="uppercase">{document.file_type.split('/')[1] || document.file_type}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewingDocument(document)}
                    title="Visualizar"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingDocument(document)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(document.id)}
                    title="Excluir"
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

      <FileUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        folderId={folder.id}
        onUploadSuccess={handleUploadSuccess}
      />

      {editingDocument && (
        <EditDocumentDialog
          isOpen={!!editingDocument}
          onClose={() => setEditingDocument(null)}
          document={editingDocument}
          folders={folders}
        />
      )}

      {viewingDocument && (
        <ViewDocumentDialog
          isOpen={!!viewingDocument}
          onClose={() => setViewingDocument(null)}
          document={viewingDocument}
        />
      )}
    </div>
  );
};

export default FolderView;
