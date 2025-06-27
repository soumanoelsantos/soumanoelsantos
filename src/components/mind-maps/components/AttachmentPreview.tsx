
import React, { useEffect, useState } from 'react';
import { FileText, Image, Video } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import { mindMapAttachmentsService } from '@/services/mindMapAttachmentsService';

interface AttachmentPreviewProps {
  attachment: MindMapAttachment;
  fileDataMap: Map<string, { file: File; url: string }>; // Mantido para compatibilidade
  onClose?: () => void;
}

const AttachmentPreview = ({ attachment, fileDataMap, onClose }: AttachmentPreviewProps) => {
  const { toast } = useToast();
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);

  const getAttachmentUrl = async (attachment: MindMapAttachment): Promise<string | null> => {
    // Primeiro tenta obter da memória (para anexos recém-adicionados)
    const fileData = fileDataMap.get(attachment.id);
    if (fileData) {
      return fileData.url;
    }

    // Se não encontrou em memória, busca do storage
    if (attachment.url && attachment.url.startsWith('blob:')) {
      // URL em memória, retorna direto
      return attachment.url;
    }

    try {
      setIsLoadingUrl(true);
      // Para anexos salvos no banco, precisamos obter a URL do storage
      // Como não temos o storage_path aqui, vamos usar a URL que já vem do banco
      return attachment.url || null;
    } catch (error) {
      console.error('Erro ao obter URL do anexo:', error);
      return null;
    } finally {
      setIsLoadingUrl(false);
    }
  };

  // Carregar URL do anexo quando componente montar
  useEffect(() => {
    const loadUrl = async () => {
      const url = await getAttachmentUrl(attachment);
      setAttachmentUrl(url);
    };
    
    loadUrl();
  }, [attachment]);

  // Auto-open PDFs quando componente monta e fecha dialog
  useEffect(() => {
    if (attachment.type === 'pdf' && attachmentUrl) {
      try {
        window.open(attachmentUrl, '_blank');
        // Close the dialog immediately after opening PDF
        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error('Erro ao abrir PDF:', error);
        toast({
          variant: "destructive",
          title: "Erro ao abrir arquivo",
          description: "Não foi possível abrir o PDF."
        });
      }
    }
  }, [attachment, attachmentUrl, toast, onClose]);

  const renderPreview = (attachment: MindMapAttachment) => {
    if (isLoadingUrl) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando preview...</p>
        </div>
      );
    }

    if (!attachmentUrl) {
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
              src={attachmentUrl} 
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
              <source src={attachmentUrl} />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        );
      case 'pdf':
        // For PDFs, don't render anything since they open directly
        return null;
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
