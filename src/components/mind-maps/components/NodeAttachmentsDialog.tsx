
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paperclip } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import { attachmentService } from '@/services/attachmentService';
import AttachmentsList from './AttachmentsList';
import FileUploadSection from './FileUploadSection';
import AttachmentPreview from './AttachmentPreview';

interface NodeAttachmentsDialogProps {
  nodeId: string;
  mindMapId: string;
  attachments: MindMapAttachment[];
  onUpdateAttachments: (attachments: MindMapAttachment[]) => void;
}

const NodeAttachmentsDialog = ({ nodeId, mindMapId, attachments, onUpdateAttachments }: NodeAttachmentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<MindMapAttachment | null>(null);
  const [fileDataMap, setFileDataMap] = useState<Map<string, { file: File; url: string }>>(new Map());
  const { toast } = useToast();

  // Carregar anexos do banco quando abrir o diálogo
  useEffect(() => {
    if (isOpen && mindMapId && nodeId) {
      loadAttachments();
    }
  }, [isOpen, mindMapId, nodeId]);

  const loadAttachments = async () => {
    try {
      const loadedAttachments = await attachmentService.getAttachmentsByNode(mindMapId, nodeId);
      onUpdateAttachments(loadedAttachments);
    } catch (error) {
      console.error('Erro ao carregar anexos:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !mindMapId || !nodeId) return;

    setIsUploading(true);
    
    try {
      const newAttachment = await attachmentService.uploadFile(file, mindMapId, nodeId);
      
      onUpdateAttachments([...attachments, newAttachment]);
      
      toast({
        title: "Arquivo anexado!",
        description: `${file.name} foi salvo com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao anexar arquivo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao anexar arquivo",
        description: "Não foi possível salvar o arquivo."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAttachment = async (attachmentId: string) => {
    try {
      await attachmentService.deleteFile(attachmentId);
      
      const updatedAttachments = attachments.filter(att => att.id !== attachmentId);
      onUpdateAttachments(updatedAttachments);
      
      toast({
        title: "Anexo removido",
        description: "O arquivo foi removido com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover anexo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao remover anexo",
        description: "Não foi possível remover o arquivo."
      });
    }
  };

  const handleDownloadAttachment = async (attachment: MindMapAttachment) => {
    try {
      // Criar link de download direto
      const a = document.createElement('a');
      a.href = attachment.url;
      a.download = attachment.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Download iniciado!",
        description: `${attachment.name} foi baixado com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao baixar arquivo",
        description: "Não foi possível baixar o arquivo."
      });
    }
  };

  const handlePreview = (attachment: MindMapAttachment) => {
    console.log('Abrindo preview para:', attachment.name);
    setPreviewAttachment(attachment);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={`h-5 w-5 p-0 hover:bg-gray-100 ${
              attachments.length > 0 ? 'text-blue-600' : 'text-gray-400'
            }`}
            title={attachments.length > 0 ? `${attachments.length} anexo(s)` : "Adicionar anexos"}
          >
            <Paperclip className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Anexos do Nó</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="list" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="upload">Adicionar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-3 max-h-[60vh] overflow-y-auto">
              <AttachmentsList
                attachments={attachments}
                fileDataMap={fileDataMap}
                onPreview={handlePreview}
                onDownload={handleDownloadAttachment}
                onRemove={handleRemoveAttachment}
              />
            </TabsContent>
            
            <TabsContent value="upload">
              <FileUploadSection
                isUploading={isUploading}
                onFileUpload={handleFileUpload}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog de Preview */}
      {previewAttachment && (
        <Dialog open={!!previewAttachment} onOpenChange={() => setPreviewAttachment(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{previewAttachment.name}</DialogTitle>
            </DialogHeader>
            <AttachmentPreview
              attachment={previewAttachment}
              fileDataMap={fileDataMap}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NodeAttachmentsDialog;
