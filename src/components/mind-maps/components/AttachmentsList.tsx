
import React from 'react';
import { Paperclip } from 'lucide-react';
import { MindMapAttachment } from '@/types/mindMap';
import AttachmentListItem from './AttachmentListItem';

interface AttachmentsListProps {
  attachments: MindMapAttachment[];
  fileDataMap: Map<string, { file: File; url: string }>;
  onPreview: (attachment: MindMapAttachment) => void;
  onDownload: (attachment: MindMapAttachment) => void;
  onRemove: (attachmentId: string) => void;
}

const AttachmentsList = ({ 
  attachments, 
  fileDataMap, 
  onPreview, 
  onDownload, 
  onRemove 
}: AttachmentsListProps) => {
  if (attachments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Nenhum anexo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {attachments.map(attachment => (
        <AttachmentListItem
          key={attachment.id}
          attachment={attachment}
          fileDataMap={fileDataMap}
          onPreview={onPreview}
          onDownload={onDownload}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default AttachmentsList;
