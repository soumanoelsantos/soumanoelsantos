
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download, FileText, File } from 'lucide-react';
import { ProcessDocument } from '@/types/processDocuments';
import { toast } from 'sonner';

interface DocumentDownloadDialogProps {
  document: ProcessDocument;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentDownloadDialog = ({ document, isOpen, onClose }: DocumentDownloadDialogProps) => {
  const [format, setFormat] = useState('txt');
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsText = () => {
    const content = `${document.title}\n\n${document.description || ''}\n\n${document.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsDoc = () => {
    const content = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${document.title}</title>
        </head>
        <body>
          <h1>${document.title}</h1>
          ${document.description ? `<p><strong>Descrição:</strong> ${document.description}</p>` : ''}
          <div>${document.content.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsPdf = async () => {
    try {
      // Usando html2pdf.js que já está instalado
      const html2pdf = (await import('html2pdf.js')).default;
      
      const content = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            ${document.title}
          </h1>
          ${document.description ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #007bff;">
              <strong>Descrição:</strong> ${document.description}
            </div>
          ` : ''}
          <div style="margin-top: 20px; line-height: 1.6;">
            ${document.content.replace(/\n/g, '<br>')}
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            Documento gerado em: ${new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      `;

      const opt = {
        margin: 1,
        filename: `${document.title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(content).save();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF');
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      switch (format) {
        case 'txt':
          downloadAsText();
          break;
        case 'doc':
          downloadAsDoc();
          break;
        case 'pdf':
          await downloadAsPdf();
          break;
      }
      toast.success('Download realizado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro no download:', error);
      toast.error('Erro ao realizar download');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Baixar Documento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Escolha o formato para download do documento "{document.title}":
            </p>
            
            <RadioGroup value={format} onValueChange={setFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="txt" id="txt" />
                <Label htmlFor="txt" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  Arquivo de Texto (.txt)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doc" id="doc" />
                <Label htmlFor="doc" className="flex items-center gap-2 cursor-pointer">
                  <File className="h-4 w-4" />
                  Documento Word (.doc)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <File className="h-4 w-4" />
                  Documento PDF (.pdf)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isDownloading}>
              Cancelar
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? 'Baixando...' : 'Baixar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDownloadDialog;
