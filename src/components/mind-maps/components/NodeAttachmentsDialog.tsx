
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paperclip, Upload, X, FileText, Image, Video, Eye, Download, Play } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';

interface NodeAttachmentsDialogProps {
  attachments: MindMapAttachment[];
  onUpdateAttachments: (attachments: MindMapAttachment[]) => void;
}

const NodeAttachmentsDialog = ({ attachments, onUpdateAttachments }: NodeAttachmentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<MindMapAttachment | null>(null);
  const [fileData, setFileData] = useState<Map<string, File>>(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Criar URL temporário para o arquivo
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
      
      // Armazenar o arquivo original para download posterior
      setFileData(prev => new Map(prev).set(attachmentId, file));
      
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
      // Limpar URL do blob se existir
      if (attachment.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url);
      }
      
      // Remover dados do arquivo
      setFileData(prev => {
        const newMap = new Map(prev);
        newMap.delete(attachmentId);
        return newMap;
      });
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
      
      // Verificar se temos o arquivo original armazenado
      const originalFile = fileData.get(attachment.id);
      
      if (originalFile) {
        console.log('Usando arquivo original para download');
        // Usar o arquivo original se disponível
        const url = URL.createObjectURL(originalFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = attachment.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.log('Tentando download via fetch da URL:', attachment.url);
        // Tentar fazer fetch da URL (pode não funcionar para blobs expirados)
        const response = await fetch(attachment.url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = attachment.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      toast({
        title: "Download iniciado!",
        description: `${attachment.name} foi baixado com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao baixar arquivo",
        description: "Não foi possível baixar o arquivo. O arquivo pode ter expirado."
      });
    }
  };

  const handlePreview = (attachment: MindMapAttachment) => {
    console.log('Abrindo preview para:', attachment.name);
    setPreviewAttachment(attachment);
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

  const renderPreview = (attachment: MindMapAttachment) => {
    // Verificar se o URL ainda é válido
    const isValidUrl = attachment.url && !attachment.url.includes('blob:') || fileData.has(attachment.id);
    
    if (!isValidUrl) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Preview não disponível</p>
          <p className="text-sm text-gray-500 mt-2">O arquivo pode ter expirado</p>
        </div>
      );
    }

    switch (attachment.type) {
      case 'image':
        return (
          <div className="max-w-full max-h-96 overflow-hidden rounded-lg">
            <img 
              src={attachment.url} 
              alt={attachment.name}
              className="w-full h-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        );
      case 'video':
        return (
          <div className="max-w-full max-h-96 overflow-hidden rounded-lg">
            <video 
              controls 
              className="w-full h-auto"
              preload="metadata"
              onError={(e) => {
                console.error('Erro ao carregar vídeo:', e);
              }}
            >
              <source src={attachment.url} />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Preview de PDF não disponível</p>
            <Button 
              onClick={() => {
                try {
                  window.open(attachment.url, '_blank');
                } catch (error) {
                  console.error('Erro ao abrir PDF:', error);
                  toast({
                    variant: "destructive",
                    title: "Erro ao abrir arquivo",
                    description: "Não foi possível abrir o PDF."
                  });
                }
              }}
              className="mt-4"
            >
              Abrir PDF
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  // Cleanup URLs quando o componente for desmontado
  React.useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        if (attachment.url.startsWith('blob:')) {
          URL.revokeObjectURL(attachment.url);
        }
      });
    };
  }, [attachments]);

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
              {attachments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum anexo</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {attachments.map(attachment => (
                    <div key={attachment.id} className="border rounded-lg p-3 space-y-3">
                      <div className="flex items-center gap-2">
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
                            onClick={() => handlePreview(attachment)}
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
                      
                      {/* Preview inline para arquivos pequenos */}
                      {attachment.type === 'image' && (
                        <div className="max-h-32 overflow-hidden rounded border">
                          <img 
                            src={attachment.url} 
                            alt={attachment.name}
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              console.error('Erro ao carregar preview da imagem');
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {attachment.type === 'video' && (
                        <div className="max-h-32 overflow-hidden rounded border bg-gray-100 flex items-center justify-center">
                          <Button
                            variant="ghost"
                            onClick={() => handlePreview(attachment)}
                            className="flex items-center gap-2"
                          >
                            <Play className="h-4 w-4" />
                            Reproduzir vídeo
                          </Button>
                        </div>
                      )}
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
                      // Limpar o input após o upload
                      e.target.value = '';
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

      {/* Dialog de Preview */}
      {previewAttachment && (
        <Dialog open={!!previewAttachment} onOpenChange={() => setPreviewAttachment(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{previewAttachment.name}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-auto">
              {renderPreview(previewAttachment)}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NodeAttachmentsDialog;
