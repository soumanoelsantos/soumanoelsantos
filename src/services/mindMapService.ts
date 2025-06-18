
import { supabase } from '@/integrations/supabase/client';
import { MindMap, CreateMindMapData, UpdateMindMapData, MindMapContent } from '@/types/mindMap';

export const mindMapService = {
  // Buscar todos os mapas do usuário
  async getUserMindMaps(userId: string): Promise<MindMap[]> {
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(item => ({
      ...item,
      content: item.content as MindMapContent
    }));
  },

  // Buscar mapa por share_token (para acesso público)
  async getMindMapByToken(shareToken: string): Promise<MindMap | null> {
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return {
      ...data,
      content: data.content as MindMapContent
    };
  },

  // Buscar mapa por ID (para o owner)
  async getMindMapById(id: string): Promise<MindMap | null> {
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return {
      ...data,
      content: data.content as MindMapContent
    };
  },

  // Criar novo mapa
  async createMindMap(userId: string, mindMapData: CreateMindMapData): Promise<MindMap> {
    const { data, error } = await supabase
      .from('mind_maps')
      .insert({
        user_id: userId,
        title: mindMapData.title,
        content: mindMapData.content || { nodes: [], edges: [] },
        is_public: true // Tornar público por padrão para permitir compartilhamento
      })
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      content: data.content as MindMapContent
    };
  },

  // Atualizar mapa
  async updateMindMap(id: string, updates: UpdateMindMapData): Promise<MindMap> {
    const updateData: any = { ...updates };
    
    const { data, error } = await supabase
      .from('mind_maps')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      content: data.content as MindMapContent
    };
  },

  // Atualizar mapa por token (para usuários com link)
  async updateMindMapByToken(shareToken: string, updates: UpdateMindMapData): Promise<MindMap> {
    const updateData: any = { ...updates };
    
    const { data, error } = await supabase
      .from('mind_maps')
      .update(updateData)
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      content: data.content as MindMapContent
    };
  },

  // Deletar mapa
  async deleteMindMap(id: string): Promise<void> {
    const { error } = await supabase
      .from('mind_maps')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
