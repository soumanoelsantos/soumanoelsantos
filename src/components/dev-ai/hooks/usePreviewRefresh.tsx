
import { useToast } from '@/hooks/use-toast';

export const usePreviewRefresh = () => {
  const { toast } = useToast();

  const refreshPreview = () => {
    toast({
      title: "Código atualizado!",
      description: "A visualização foi atualizada.",
    });
  };

  return { refreshPreview };
};
