
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paperclip, Upload, X, FileText, Image, Video, Eye, Download } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';

interface NodeAttachmentsDialogProps {
  attachments: MindMapAttachment[];
  onUpdateAttachments: (attachments: MindMapAttachment[]) => void;
}

const NodeAttachmentsDialog = ({ attachments, onUpdateAttachments }: NodeAttachmentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simular upload (em produção, usar Supabase Storage)
      const url = URL.createObjectURL(file);
      
      let type: 'pdf' | 'image' | 'video' = 'pdf';
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      
      const newAttachment: MindMapAttachment = {
        id: Date.now().toString(),
        type,
        name: file.name,
        url,
        size: file.size
      };
      
      onUpdateAttachments([...attachments, newAttachment]);
      
      toast({
        title: "Arquivo anexado!",
        description: `${file.name} foi adicionado ao nó.`
      });
    } catch (error) {
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
    const updatedAttachments = attachments.filter(att => att.id !== attachmentId);
    onUpdateAttachments(updatedAttachments);
    
    toast({
      title: "Anexo removido",
      description: "O arquivo foi removido do nó."
    });
  };

  const handleDownloadAttachment = async (attachment: MindMapAttachment) => {
    try {
      const response = await fetch(attachment.url);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download iniciado!",
        description: `${attachment.name} foi baixado com sucesso.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao baixar arquivo",
        description: "Não foi possível baixar o arquivo."
      });
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  return (
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
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Anexos do Nó</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="upload">Adicionar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-3">
            {attachments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum anexo</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded-lg">
                    {getFileIcon(attachment.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(attachment.url, '_blank')}
                        title="Visualizar"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
                        onClick={() => handleDownloadAttachment(attachment)}
                        title="Baixar"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveAttachment(attachment.id)}
                        title="Remover"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Escolher arquivo</Label>
              <Input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.webm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
                disabled={isUploading}
              />
              <p className="text-xs text-gray-500">
                Suporte: PDF, Imagens (JPG, PNG, GIF), Vídeos (MP4, AVI, MOV, WEBM)
              </p>
            </div>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Enviando...' : 'Selecionar Arquivo'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NodeAttachmentsDialog;
