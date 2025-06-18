
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { MindMap, CreateMindMapData, UpdateMindMapData } from '@/types/mindMap';
import { mindMapService } from '@/services/mindMapService';

export const useMindMaps = () => {
  const [mindMaps, setMindMaps] = useState<MindMap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const loadMindMaps = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const maps = await mindMapService.getUserMindMaps(userId);
      setMindMaps(maps);
    } catch (error: any) {
      console.error('Erro ao carregar mapas mentais:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar mapas",
        description: "Não foi possível carregar seus mapas mentais."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createMindMap = async (data: CreateMindMapData) => {
    if (!userId) return null;

    try {
      setIsLoading(true);
      const newMap = await mindMapService.createMindMap(userId, data);
      setMindMaps(prev => [newMap, ...prev]);
      
      toast({
        title: "Mapa criado!",
        description: "Seu mapa mental foi criado com sucesso."
      });
      
      return newMap;
    } catch (error: any) {
      console.error('Erro ao criar mapa mental:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar mapa",
        description: "Não foi possível criar o mapa mental."
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMindMap = async (id: string, updates: UpdateMindMapData) => {
    try {
      const updatedMap = await mindMapService.updateMindMap(id, updates);
      setMindMaps(prev => prev.map(map => map.id === id ? updatedMap : map));
      return updatedMap;
    } catch (error: any) {
      console.error('Erro ao atualizar mapa mental:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar mapa",
        description: "Não foi possível atualizar o mapa mental."
      });
      return null;
    }
  };

  const deleteMindMap = async (id: string) => {
    try {
      await mindMapService.deleteMindMap(id);
      setMindMaps(prev => prev.filter(map => map.id !== id));
      
      toast({
        title: "Mapa deletado!",
        description: "O mapa mental foi removido com sucesso."
      });
    } catch (error: any) {
      console.error('Erro ao deletar mapa mental:', error);
      toast({
        variant: "destructive",
        title: "Erro ao deletar mapa",
        description: "Não foi possível deletar o mapa mental."
      });
    }
  };

  useEffect(() => {
    loadMindMaps();
  }, [userId]);

  return {
    mindMaps,
    isLoading,
    createMindMap,
    updateMindMap,
    deleteMindMap,
    refreshMindMaps: loadMindMaps
  };
};
