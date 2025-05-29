
import { useToast } from '@/hooks/use-toast';

export const useClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Código copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  return { copyToClipboard };
};
