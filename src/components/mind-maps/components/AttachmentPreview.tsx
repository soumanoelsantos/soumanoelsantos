
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Image, Video } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';

interface AttachmentPreviewProps {
  attachment: MindMapAttachment;
  fileDataMap: Map<string, { file: File; url: string }>;
}

const AttachmentPreview = ({ attachment, fileDataMap }: AttachmentPreviewProps) => {
  const { toast } = useToast();

  const getAttachmentUrl = (attachment: MindMapAttachment): string | null => {
    const fileData = fileDataMap.get(attachment.id);
    return fileData ? fileData.url : attachment.url;
  };

  const renderPreview = (attachment: MindMapAttachment) => {
    const url = getAttachmentUrl(attachment);
    
    if (!url) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Preview não disponível</p>
          <p className="text-sm text-gray-500 mt-2">O arquivo não está mais acessível</p>
        </div>
      );
    }

    switch (attachment.type) {
      case 'image':
        return (
          <div className="max-w-full max-h-96 overflow-hidden rounded-lg">
            <img 
              src={url} 
              alt={attachment.name}
              className="w-full h-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', attachment.name);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', attachment.name);
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
                console.error('Erro ao carregar vídeo:', attachment.name);
              }}
              onLoadedData={() => {
                console.log('Vídeo carregado com sucesso:', attachment.name);
              }}
            >
              <source src={url} />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">Preview de PDF</p>
            <Button 
              onClick={() => {
                try {
                  window.open(url, '_blank');
                } catch (error) {
                  console.error('Erro ao abrir PDF:', error);
                  toast({
                    variant: "destructive",
                    title: "Erro ao abrir arquivo",
                    description: "Não foi possível abrir o PDF."
                  });
                }
              }}
            >
              Abrir PDF
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Tipo de arquivo não suportado para preview</p>
          </div>
        );
    }
  };

  return (
    <div className="max-h-[70vh] overflow-auto">
      {renderPreview(attachment)}
    </div>
  );
};

export default AttachmentPreview;
