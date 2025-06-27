
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Image, Video, Eye, Download, X, Play } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';

interface AttachmentListItemProps {
  attachment: MindMapAttachment;
  fileDataMap: Map<string, { file: File; url: string }>;
  onPreview: (attachment: MindMapAttachment) => void;
  onDownload: (attachment: MindMapAttachment) => void;
  onRemove: (attachmentId: string) => void;
}

const AttachmentListItem = ({ 
  attachment, 
  fileDataMap, 
  onPreview, 
  onDownload, 
  onRemove 
}: AttachmentListItemProps) => {
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

  const getAttachmentUrl = (attachment: MindMapAttachment): string | null => {
    const fileData = fileDataMap.get(attachment.id);
    return fileData ? fileData.url : attachment.url;
  };

  const url = getAttachmentUrl(attachment);

  return (
    <div className="border rounded-lg p-3 space-y-3">
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
            onClick={() => onPreview(attachment)}
            title="Visualizar"
            disabled={!url}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
            onClick={() => onDownload(attachment)}
            title="Baixar"
            disabled={!url}
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            onClick={() => onRemove(attachment.id)}
            title="Remover"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Preview inline para imagens */}
      {attachment.type === 'image' && url && (
        <div className="max-h-32 overflow-hidden rounded border">
          <img 
            src={url} 
            alt={attachment.name}
            className="w-full h-auto object-cover cursor-pointer"
            onClick={() => onPreview(attachment)}
            onError={(e) => {
              console.error('Erro ao carregar preview da imagem');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {attachment.type === 'video' && url && (
        <div className="max-h-32 overflow-hidden rounded border bg-gray-100 flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => onPreview(attachment)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Reproduzir vídeo
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttachmentListItem;
