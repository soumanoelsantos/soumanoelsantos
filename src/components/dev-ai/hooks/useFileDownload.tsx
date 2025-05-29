
import { useToast } from '@/hooks/use-toast';

export const useFileDownload = () => {
  const { toast } = useToast();

  const downloadCode = (code: string, fileName: string = 'component.tsx') => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O arquivo React foi baixado com sucesso.",
    });
  };

  return { downloadCode };
};
