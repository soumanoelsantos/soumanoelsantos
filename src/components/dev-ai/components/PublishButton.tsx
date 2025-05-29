
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDevAI } from '../DevAIContext';
import { Globe, Loader2 } from 'lucide-react';

const PublishButton: React.FC = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const { currentProject, generatedCode } = useDevAI();
  const { toast } = useToast();

  const handlePublish = async () => {
    if (!currentProject || !generatedCode) {
      toast({
        variant: "destructive",
        title: "Não é possível publicar",
        description: "Verifique se há um projeto e código para publicar."
      });
      return;
    }

    setIsPublishing(true);
    try {
      // Simular processo de publicação
      // Em um cenário real, isso enviaria o código para um serviço de hospedagem
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Projeto publicado!",
        description: `O projeto "${currentProject.name}" foi publicado com sucesso.`
      });

      // Abrir em nova aba (simulação de URL publicada)
      const publishedUrl = `https://${currentProject.name.toLowerCase().replace(/\s+/g, '-')}.lovable.app`;
      window.open(publishedUrl, '_blank');
      
    } catch (error) {
      console.error('Erro ao publicar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro na publicação",
        description: "Não foi possível publicar o projeto. Tente novamente."
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Button
      onClick={handlePublish}
      disabled={isPublishing || !currentProject || !generatedCode}
      className="bg-green-600 hover:bg-green-700 text-white"
      size="sm"
    >
      {isPublishing ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Globe className="h-4 w-4 mr-2" />
      )}
      {isPublishing ? 'Publicando...' : 'Publicar'}
    </Button>
  );
};

export default PublishButton;
