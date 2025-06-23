
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProcessDocument } from '@/types/processDocuments';
import { Calendar, FileText } from 'lucide-react';

interface ViewDocumentDialogProps {
  document: ProcessDocument;
  isOpen: boolean;
  onClose: () => void;
}

const ViewDocumentDialog = ({ document, isOpen, onClose }: ViewDocumentDialogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <DialogTitle>{document.title}</DialogTitle>
            {document.is_public && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Público
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {document.description && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-1">Descrição</h4>
              <p className="text-gray-600">{document.description}</p>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 border-b pb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Criado em {formatDate(document.created_at)}</span>
            </div>
            <Badge variant="secondary">{document.category}</Badge>
            {document.updated_at !== document.created_at && (
              <span>• Atualizado em {formatDate(document.updated_at)}</span>
            )}
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-3">Conteúdo</h4>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[300px]">
              <div className="whitespace-pre-wrap text-gray-700">
                {document.content || 'Nenhum conteúdo adicionado ainda.'}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDocumentDialog;
