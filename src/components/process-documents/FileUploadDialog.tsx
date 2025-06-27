
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, File, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  folderId?: string;
  onUploadSuccess?: () => void;
}

const FileUploadDialog = ({ isOpen, onClose, folderId, onUploadSuccess }: FileUploadDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { userId } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles);
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // Removido accept para permitir todos os tipos de arquivo
    // Removido maxSize para não ter limite de tamanho
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0 || !userId) {
      console.log('Upload canceled - missing files or user:', { filesCount: files.length, userId });
      toast.error('Nenhum arquivo selecionado ou usuário não autenticado');
      return;
    }

    if (!folderId) {
      console.log('Upload canceled - no folder selected');
      toast.error('Selecione uma pasta para fazer o upload');
      return;
    }

    console.log('Starting upload process:', { filesCount: files.length, folderId, userId });
    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        console.log('Processing file:', file.name, 'Size:', file.size);
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop() || 'unknown';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `process-documents/${userId}/${fileName}`;

        console.log('Uploading to path:', filePath);

        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('process-files')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw new Error(`Erro no upload: ${uploadError.message}`);
        }

        console.log('File uploaded successfully:', uploadData);

        // Create document record in database
        const documentData = {
          user_id: userId,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          content: `Arquivo: ${file.name}`,
          description: `Arquivo enviado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
          category: 'arquivo',
          folder_id: folderId,
          is_public: false,
          file_path: filePath,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type || 'application/octet-stream'
        };

        console.log('Creating document record:', documentData);

        const { data: document, error: documentError } = await supabase
          .from('process_documents')
          .insert(documentData)
          .select()
          .single();

        if (documentError) {
          console.error('Database insert error:', documentError);
          throw new Error(`Erro ao salvar no banco: ${documentError.message}`);
        }

        console.log('Document created successfully:', document);
        return document;
      });

      const results = await Promise.all(uploadPromises);
      console.log('All uploads completed:', results);
      
      toast.success(`${files.length} arquivo(s) enviado(s) com sucesso!`);
      setFiles([]);
      
      // Call the success callback to refresh the parent component
      if (onUploadSuccess) {
        console.log('Calling onUploadSuccess callback');
        onUploadSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error('Upload process error:', error);
      toast.error(`Erro ao enviar arquivos: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setFiles([]);
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload de Arquivos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600">Solte os arquivos aqui...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Arraste e solte arquivos aqui ou clique para selecionar
                </p>
                <p className="text-sm text-gray-500">
                  Qualquer tipo de arquivo - Sem limite de tamanho
                </p>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Arquivos selecionados:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={files.length === 0 || isUploading || !folderId}
            >
              {isUploading ? 'Enviando...' : `Enviar ${files.length} arquivo(s)`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
