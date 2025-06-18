
import { supabase } from '@/integrations/supabase/client';
import { MindMap, CreateMindMapData, UpdateMindMapData, MindMapContent } from '@/types/mindMap';

export const mindMapService = {
  // Buscar todos os mapas do usuário
  async getUserMindMaps(userId: string): Promise<MindMap[]> {
    console.log('Buscando mapas mentais para usuário:', userId);
    
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar mapas mentais:', error);
      throw error;
    }
    
    console.log('Mapas mentais encontrados:', data);
    
    return (data || []).map(item => ({
      ...item,
      content: item.content as unknown as MindMapContent
    }));
  },

  // Buscar mapa por share_token (para acesso público)
  async getMindMapByToken(shareToken: string): Promise<MindMap | null> {
    console.log('Buscando mapa mental por token:', shareToken);
    
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Mapa mental não encontrado para token:', shareToken);
        return null;
      }
      console.error('Erro ao buscar mapa mental por token:', error);
      throw error;
    }
    
    console.log('Mapa mental encontrado por token:', data);
    
    return {
      ...data,
      content: data.content as unknown as MindMapContent
    };
  },

  // Buscar mapa por ID (para o owner)
  async getMindMapById(id: string): Promise<MindMap | null> {
    console.log('Buscando mapa mental por ID:', id);
    
    const { data, error } = await supabase
      .from('mind_maps')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Mapa mental não encontrado para ID:', id);
        return null;
      }
      console.error('Erro ao buscar mapa mental por ID:', error);
      throw error;
    }
    
    console.log('Mapa mental encontrado por ID:', data);
    
    return {
      ...data,
      content: data.content as unknown as MindMapContent
    };
  },

  // Criar novo mapa
  async createMindMap(userId: string, mindMapData: CreateMindMapData): Promise<MindMap> {
    console.log('Criando novo mapa mental:', { userId, mindMapData });
    
    const { data, error } = await supabase
      .from('mind_maps')
      .insert({
        user_id: userId,
        title: mindMapData.title,
        content: (mindMapData.content || { nodes: [], edges: [] }) as any,
        is_public: true // Tornar público por padrão para permitir compartilhamento
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar mapa mental:', error);
      throw error;
    }
    
    console.log('Mapa mental criado com sucesso:', data);
    
    return {
      ...data,
      content: data.content as unknown as MindMapContent
    };
  },

  // Atualizar mapa
  async updateMindMap(id: string, updates: UpdateMindMapData): Promise<MindMap> {
    console.log('Atualizando mapa mental:', { id, updates });
    
    const updateData: any = { ...updates };
    if (updateData.content) {
      updateData.content = updateData.content as any;
    }
    
    const { data, error } = await supabase
      .from('mind_maps')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar mapa mental:', error);
      throw error;
    }
    
    console.log('Mapa mental atualizado com sucesso:', data);
    
    return {
      ...data,
      content: data.content as unknown as MindMapContent
    };
  },

  // Atualizar mapa por token (para usuários com link)
  async updateMindMapByToken(shareToken: string, updates: UpdateMindMapData): Promise<MindMap> {
    console.log('Atualizando mapa mental por token:', { shareToken, updates });
    
    const updateData: any = { ...updates };
    if (updateData.content) {
      updateData.content = updateData.content as any;
    }
    
    const { data, error } = await supabase
      .from('mind_maps')
      .update(updateData)
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar mapa mental por token:', error);
      throw error;
    }
    
    console.log('Mapa mental atualizado por token com sucesso:', data);
    
    return {
      ...data,
      content: data.content as unknown as MindMapContent
    };
  },

  // Deletar mapa
  async deleteMindMap(id: string): Promise<void> {
    console.log('Deletando mapa mental:', id);
    
    const { error } = await supabase
      .from('mind_maps')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar mapa mental:', error);
      throw error;
    }
    
    console.log('Mapa mental deletado com sucesso:', id);
  }
};
