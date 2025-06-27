
import { supabase } from '@/integrations/supabase/client';
import { MindMapAttachment } from '@/types/mindMap';

export const attachmentService = {
  async uploadFile(file: File, mindMapId: string, nodeId: string): Promise<MindMapAttachment> {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('Usuário não autenticado');

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = `${userId}/${mindMapId}/${nodeId}/${fileName}`;

    // Upload do arquivo para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('mind-map-attachments')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      throw new Error('Erro ao fazer upload do arquivo');
    }

    // Obter URL pública do arquivo
    const { data: urlData } = supabase.storage
      .from('mind-map-attachments')
      .getPublicUrl(filePath);

    // Determinar tipo do arquivo
    let type: 'pdf' | 'image' | 'video' = 'pdf';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';

    // Salvar informações do anexo na tabela mind_map_attachments
    const attachmentData = {
      mind_map_id: mindMapId,
      node_id: nodeId,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      storage_path: filePath,
      attachment_type: type
    };

    const { data: dbData, error: dbError } = await supabase
      .from('mind_map_attachments')
      .insert(attachmentData)
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      // Remover arquivo do storage se falhou ao salvar no banco
      await supabase.storage.from('mind-map-attachments').remove([filePath]);
      throw new Error('Erro ao salvar informações do anexo');
    }

    return {
      id: dbData.id,
      type,
      name: file.name,
      url: urlData.publicUrl,
      size: file.size
    };
  },

  async deleteFile(attachmentId: string): Promise<void> {
    // Buscar informações do arquivo
    const { data: attachment, error: fetchError } = await supabase
      .from('mind_map_attachments')
      .select('storage_path')
      .eq('id', attachmentId)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar anexo:', fetchError);
      return;
    }

    // Remover arquivo do storage
    const { error: storageError } = await supabase.storage
      .from('mind-map-attachments')
      .remove([attachment.storage_path]);

    if (storageError) {
      console.error('Erro ao remover do storage:', storageError);
    }

    // Remover entrada do banco
    const { error: dbError } = await supabase
      .from('mind_map_attachments')
      .delete()
      .eq('id', attachmentId);

    if (dbError) {
      console.error('Erro ao remover do banco:', dbError);
    }
  },

  async getAttachmentsByNode(mindMapId: string, nodeId: string): Promise<MindMapAttachment[]> {
    const { data, error } = await supabase
      .from('mind_map_attachments')
      .select('*')
      .eq('mind_map_id', mindMapId)
      .eq('node_id', nodeId);

    if (error) {
      console.error('Erro ao buscar anexos:', error);
      return [];
    }

    // Gerar URLs públicas atualizadas
    return data.map(attachment => {
      const { data: urlData } = supabase.storage
        .from('mind-map-attachments')
        .getPublicUrl(attachment.storage_path);

      return {
        id: attachment.id,
        type: attachment.attachment_type as 'pdf' | 'image' | 'video',
        name: attachment.file_name,
        url: urlData.publicUrl,
        size: attachment.file_size
      };
    });
  }
};
