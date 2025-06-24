
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mindMapService } from '@/services/mindMapService';
import { MindMap, MindMapContent } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import MindMapCanvas from '@/components/mind-maps/MindMapCanvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Share2 } from 'lucide-react';

const SharedMindMap = () => {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mindMap, setMindMap] = useState<MindMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadMindMap();
  }, [shareToken]);

  const loadMindMap = async () => {
    if (!shareToken) return;

    try {
      setIsLoading(true);
      const map = await mindMapService.getMindMapByToken(shareToken);
      
      if (!map) {
        toast({
          variant: "destructive",
          title: "Mapa não encontrado",
          description: "O mapa mental não foi encontrado ou não é público."
        });
        navigate('/');
        return;
      }

      setMindMap(map);
      setTitle(map.title);
    } catch (error: any) {
      console.error('Erro ao carregar mapa compartilhado:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar mapa",
        description: "Não foi possível carregar o mapa mental compartilhado."
      });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (content: MindMapContent) => {
    if (!mindMap || !shareToken) return;

    try {
      setIsSaving(true);
      await mindMapService.updateMindMapByToken(shareToken, { 
        title, 
        content 
      });
      
      toast({
        title: "Mapa salvo!",
        description: "Suas alterações foram salvas com sucesso."
      });
    } catch (error: any) {
      console.error('Erro ao salvar mapa compartilhado:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!mindMap) return;
    
    const shareUrl = `${window.location.origin}/mapa-mental/compartilhado/${mindMap.share_token}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiado!",
        description: "O link de compartilhamento foi copiado."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link."
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Carregando mapa mental compartilhado...</div>
      </div>
    );
  }

  if (!mindMap) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold border-none shadow-none px-0"
              placeholder="Nome do mapa mental"
            />
            
            <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">
              Mapa Compartilhado
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Copiar Link
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="h-[calc(100vh-73px)]">
        <MindMapCanvas
          initialContent={mindMap.content}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default SharedMindMap;
