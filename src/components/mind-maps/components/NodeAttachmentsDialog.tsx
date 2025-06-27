
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paperclip } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import AttachmentsList from './AttachmentsList';
import FileUploadSection from './FileUploadSection';
import AttachmentPreview from './AttachmentPreview';
import { mindMapAttachmentsService, MindMapAttachmentRecord } from '@/services/mindMapAttachmentsService';

interface NodeAttachmentsDialogProps {
  nodeId: string;
  mindMapId: string;
  attachments: MindMapAttachment[];
  onUpdateAttachments: (attachments: MindMapAttachment[]) => void;
}

const NodeAttachmentsDialog = ({ 
  nodeId, 
  mindMapId, 
  attachments, 
  onUpdateAttachments 
}: NodeAttachmentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<MindMapAttachment | null>(null);
  const [storedAttachments, setStoredAttachments] = useState<MindMapAttachmentRecord[]>([]);
  const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);
  const { toast } = useToast();

  // Carregar anexos do banco quando abrir o dialog
  useEffect(() => {
    if (isOpen && mindMapId) {
      loadStoredAttachments();
    }
  }, [isOpen, mindMapId, nodeId]);

  const loadStoredAttachments = async () => {
    try {
      setIsLoadingAttachments(true);
      const attachments = await mindMapAttachmentsService.getAttachmentsByNode(mindMapId, nodeId);
      setStoredAttachments(attachments);
    } catch (error) {
      console.error('Erro ao carregar anexos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar anexos",
        description: "Não foi possível carregar os anexos salvos."
      });
    } finally {
      setIsLoadingAttachments(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !mindMapId) return;

    setIsUploading(true);
    
    try {
      // Upload para o storage e banco
      const attachmentRecord = await mindMapAttachmentsService.uploadAttachment(
        mindMapId,
        nodeId, 
        file
      );

      // Obter URL pública
      const url = await mindMapAttachmentsService.getAttachmentUrl(attachmentRecord.storage_path);
      
      // Criar objeto compatível com MindMapAttachment
      const newAttachment: MindMapAttachment = {
        id: attachmentRecord.id,
        type: attachmentRecord.attachment_type,
        name: attachmentRecord.file_name,
        url,
        size: attachmentRecord.file_size
      };
      
      // Atualizar estado local e do mapa mental
      setStoredAttachments(prev => [attachmentRecord, ...prev]);
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
      await mindMapAttachmentsService.removeAttachment(attachmentId);
      
      // Atualizar estados locais
      setStoredAttachments(prev => prev.filter(att => att.id !== attachmentId));
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
      console.log('Iniciando download para anexo:', attachment.name);
      
      // Buscar o registro no banco para obter o storage_path
      const storedAttachment = storedAttachments.find(stored => stored.id === attachment.id);
      
      if (storedAttachment) {
        await mindMapAttachmentsService.downloadAttachment(
          storedAttachment.storage_path, 
          attachment.name
        );
        
        toast({
          title: "Download iniciado!",
          description: `${attachment.name} foi baixado com sucesso.`
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao baixar arquivo",
          description: "Não foi possível encontrar o arquivo no storage."
        });
      }
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

  // Combinar anexos locais (em memória) com anexos salvos no banco
  const allAttachments = React.useMemo(() => {
    const stored = storedAttachments.map(stored => ({
      id: stored.id,
      type: stored.attachment_type,
      name: stored.file_name,
      url: '', // URL será obtida quando necessário
      size: stored.file_size
    }));
    
    return [...stored, ...attachments.filter(att => !stored.some(s => s.id === att.id))];
  }, [storedAttachments, attachments]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={`h-5 w-5 p-0 hover:bg-gray-100 ${
              allAttachments.length > 0 ? 'text-blue-600' : 'text-gray-400'
            }`}
            title={allAttachments.length > 0 ? `${allAttachments.length} anexo(s)` : "Adicionar anexos"}
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
              {isLoadingAttachments ? (
                <div className="text-center py-8 text-gray-500">
                  Carregando anexos...
                </div>
              ) : (
                <AttachmentsList
                  attachments={allAttachments}
                  fileDataMap={new Map()} // Não mais necessário
                  onPreview={handlePreview}
                  onDownload={handleDownloadAttachment}
                  onRemove={handleRemoveAttachment}
                />
              )}
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
              fileDataMap={new Map()} // Não mais necessário
              onClose={() => setPreviewAttachment(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NodeAttachmentsDialog;
