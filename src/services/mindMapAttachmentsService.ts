
import { supabase } from '@/integrations/supabase/client';

export interface MindMapAttachmentRecord {
  id: string;
  mind_map_id: string;
  node_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  attachment_type: 'pdf' | 'image' | 'video';
  created_at: string;
  updated_at: string;
}

export const mindMapAttachmentsService = {
  // Upload arquivo para o storage e salvar no banco
  async uploadAttachment(
    mindMapId: string,
    nodeId: string,
    file: File
  ): Promise<MindMapAttachmentRecord> {
    console.log('Fazendo upload do anexo:', file.name);
    
    // Gerar path único para o arquivo
    const fileExtension = file.name.split('.').pop();
    const fileName = `${mindMapId}/${nodeId}/${Date.now()}_${file.name}`;
    const storagePath = `attachments/${fileName}`;
    
    // Upload para o storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('mind-map-attachments')
      .upload(storagePath, file);

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      throw uploadError;
    }

    console.log('Upload realizado com sucesso:', uploadData);

    // Determinar tipo do anexo
    let attachmentType: 'pdf' | 'image' | 'video' = 'pdf';
    if (file.type.startsWith('image/')) attachmentType = 'image';
    else if (file.type.startsWith('video/')) attachmentType = 'video';

    // Salvar metadados no banco
    const { data: attachmentData, error: insertError } = await supabase
      .from('mind_map_attachments')
      .insert({
        mind_map_id: mindMapId,
        node_id: nodeId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath,
        attachment_type: attachmentType
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao salvar metadados:', insertError);
      // Se falhou ao salvar no banco, remove do storage
      await supabase.storage
        .from('mind-map-attachments')
        .remove([storagePath]);
      throw insertError;
    }

    console.log('Anexo salvo com sucesso:', attachmentData);
    return attachmentData as MindMapAttachmentRecord;
  },

  // Buscar anexos de um mapa mental
  async getAttachmentsByMindMap(mindMapId: string): Promise<MindMapAttachmentRecord[]> {
    console.log('Buscando anexos do mapa:', mindMapId);
    
    const { data, error } = await supabase
      .from('mind_map_attachments')
      .select('*')
      .eq('mind_map_id', mindMapId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar anexos:', error);
      throw error;
    }

    console.log('Anexos encontrados:', data);
    return (data || []) as MindMapAttachmentRecord[];
  },

  // Buscar anexos de um nó específico
  async getAttachmentsByNode(mindMapId: string, nodeId: string): Promise<MindMapAttachmentRecord[]> {
    console.log('Buscando anexos do nó:', nodeId);
    
    const { data, error } = await supabase
      .from('mind_map_attachments')
      .select('*')
      .eq('mind_map_id', mindMapId)
      .eq('node_id', nodeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar anexos do nó:', error);
      throw error;
    }

    console.log('Anexos do nó encontrados:', data);
    return (data || []) as MindMapAttachmentRecord[];
  },

  // Obter URL pública do arquivo
  async getAttachmentUrl(storagePath: string): Promise<string> {
    const { data } = supabase.storage
      .from('mind-map-attachments')
      .getPublicUrl(storagePath);

    return data.publicUrl;
  },

  // Remover anexo
  async removeAttachment(attachmentId: string): Promise<void> {
    console.log('Removendo anexo:', attachmentId);

    // Buscar dados do anexo primeiro
    const { data: attachment, error: fetchError } = await supabase
      .from('mind_map_attachments')
      .select('storage_path')
      .eq('id', attachmentId)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar anexo para remoção:', fetchError);
      throw fetchError;
    }

    // Remover do storage
    const { error: storageError } = await supabase.storage
      .from('mind-map-attachments')
      .remove([attachment.storage_path]);

    if (storageError) {
      console.error('Erro ao remover do storage:', storageError);
    }

    // Remover do banco
    const { error: deleteError } = await supabase
      .from('mind_map_attachments')
      .delete()
      .eq('id', attachmentId);

    if (deleteError) {
      console.error('Erro ao remover do banco:', deleteError);
      throw deleteError;
    }

    console.log('Anexo removido com sucesso');
  },

  // Baixar arquivo
  async downloadAttachment(storagePath: string, fileName: string): Promise<void> {
    console.log('Baixando anexo:', fileName);

    const { data, error } = await supabase.storage
      .from('mind-map-attachments')
      .download(storagePath);

    if (error) {
      console.error('Erro ao baixar anexo:', error);
      throw error;
    }

    // Criar blob e download
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Download concluído:', fileName);
  }
};
