
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

interface NodeAttachmentsDialogProps {
  attachments: MindMapAttachment[];
  onUpdateAttachments: (attachments: MindMapAttachment[]) => void;
}

const NodeAttachmentsDialog = ({ attachments, onUpdateAttachments }: NodeAttachmentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<MindMapAttachment | null>(null);
  const [fileDataMap, setFileDataMap] = useState<Map<string, { file: File; url: string }>>(new Map());
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      const url = URL.createObjectURL(file);
      
      let type: 'pdf' | 'image' | 'video' = 'pdf';
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      
      const attachmentId = Date.now().toString();
      const newAttachment: MindMapAttachment = {
        id: attachmentId,
        type,
        name: file.name,
        url,
        size: file.size
      };
      
      setFileDataMap(prev => new Map(prev).set(attachmentId, { file, url }));
      onUpdateAttachments([...attachments, newAttachment]);
      
      toast({
        title: "Arquivo anexado!",
        description: `${file.name} foi adicionado ao nó.`
      });
    } catch (error) {
      console.error('Erro ao anexar arquivo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao anexar arquivo",
        description: "Não foi possível anexar o arquivo."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    const attachment = attachments.find(att => att.id === attachmentId);
    if (attachment) {
      const fileData = fileDataMap.get(attachmentId);
      if (fileData) {
        URL.revokeObjectURL(fileData.url);
        setFileDataMap(prev => {
          const newMap = new Map(prev);
          newMap.delete(attachmentId);
          return newMap;
        });
      }
    }
    
    const updatedAttachments = attachments.filter(att => att.id !== attachmentId);
    onUpdateAttachments(updatedAttachments);
    
    toast({
      title: "Anexo removido",
      description: "O arquivo foi removido do nó."
    });
  };

  const handleDownloadAttachment = async (attachment: MindMapAttachment) => {
    try {
      console.log('Iniciando download para anexo:', attachment.name);
      
      const fileData = fileDataMap.get(attachment.id);
      
      if (fileData) {
        console.log('Usando dados do arquivo para download');
        const a = document.createElement('a');
        a.href = fileData.url;
        a.download = attachment.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download iniciado!",
          description: `${attachment.name} foi baixado com sucesso.`
        });
      } else {
        console.log('Dados do arquivo não encontrados');
        toast({
          variant: "destructive",
          title: "Erro ao baixar arquivo",
          description: "Os dados do arquivo não estão mais disponíveis."
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

  // Cleanup URLs quando o componente for desmontado
  useEffect(() => {
    return () => {
      fileDataMap.forEach(({ url }) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [fileDataMap]);

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
