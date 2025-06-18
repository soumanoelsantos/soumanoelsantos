
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mindMapService } from '@/services/mindMapService';
import { MindMap, MindMapContent } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import MindMapCanvas from '@/components/mind-maps/MindMapCanvas';
import { Button } from '@/components/ui/button';
import { Save, Brain } from 'lucide-react';

const SharedMindMap = () => {
  const { shareToken } = useParams<{ shareToken: string }>();
  const { toast } = useToast();
  
  const [mindMap, setMindMap] = useState<MindMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSharedMindMap();
  }, [shareToken]);

  const loadSharedMindMap = async () => {
    if (!shareToken) return;

    try {
      setIsLoading(true);
      const map = await mindMapService.getMindMapByToken(shareToken);
      
      if (!map) {
        toast({
          variant: "destructive",
          title: "Mapa não encontrado",
          description: "Este link de compartilhamento não é válido ou o mapa foi removido."
        });
        return;
      }

      setMindMap(map);
    } catch (error: any) {
      console.error('Erro ao carregar mapa compartilhado:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar mapa",
        description: "Não foi possível carregar o mapa mental compartilhado."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (content: MindMapContent) => {
    if (!mindMap || !shareToken) return;

    try {
      setIsSaving(true);
      await mindMapService.updateMindMapByToken(shareToken, { content });
      
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Carregando mapa mental...</div>
      </div>
    );
  }

  if (!mindMap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Mapa não encontrado
          </h2>
          <p className="text-gray-500">
            Este link de compartilhamento não é válido ou o mapa foi removido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Brain className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-semibold">{mindMap.title}</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Mapa Compartilhado
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            Qualquer pessoa com este link pode editar
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
