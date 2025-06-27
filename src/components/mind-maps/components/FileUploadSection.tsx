
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface FileUploadSectionProps {
  isUploading: boolean;
  onFileUpload: (file: File) => void;
}

const FileUploadSection = ({ isUploading, onFileUpload }: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Escolher arquivo</Label>
        <Input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.webm"
          onChange={handleFileChange}
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
    </div>
  );
};

export default FileUploadSection;
