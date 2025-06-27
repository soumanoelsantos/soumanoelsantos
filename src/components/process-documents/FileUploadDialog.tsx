
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
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
      // Primeiro, criar o bucket se não existir
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'process-files');
      
      if (!bucketExists) {
        console.log('Creating process-files bucket...');
        const { error: bucketError } = await supabase.storage.createBucket('process-files', {
          public: true,
          allowedMimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/png',
            'image/jpeg',
            'image/jpg'
          ]
        });
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          // Continue anyway, bucket might exist but not be listed
        }
      }

      const uploadPromises = files.map(async (file) => {
        console.log('Processing file:', file.name);
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
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
          throw uploadError;
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
          file_type: file.type
        };

        console.log('Creating document record:', documentData);

        const { data: document, error: documentError } = await supabase
          .from('process_documents')
          .insert(documentData)
          .select()
          .single();

        if (documentError) {
          console.error('Database insert error:', documentError);
          throw documentError;
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
    } catch (error) {
      console.error('Upload process error:', error);
      toast.error(`Erro ao enviar arquivos: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
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
                  Suporte: PDF, DOC, DOCX, TXT, PNG, JPG
                </p>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Arquivos selecionados:</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
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
