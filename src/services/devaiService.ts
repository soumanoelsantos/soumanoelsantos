
import { supabase } from '@/integrations/supabase/client';
import { DevProject, CreateProjectData, DevConversation, DevMessage } from '@/types/devai';

export class DevAIService {
  // Projetos
  static async createProject(data: CreateProjectData): Promise<DevProject | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error('Usuário não autenticado');
      }

      const { data: project, error } = await supabase
        .from('dev_projects')
        .insert({
          name: data.name,
          description: data.description,
          user_id: user.user.id
        })
        .select()
        .single();

      if (error) throw error;
      return project as DevProject;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      return null;
    }
  }

  static async getProjects(): Promise<DevProject[]> {
    try {
      const { data: projects, error } = await supabase
        .from('dev_projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return projects as DevProject[];
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
  }

  static async getProject(id: string): Promise<DevProject | null> {
    try {
      const { data: project, error } = await supabase
        .from('dev_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return project as DevProject;
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      return null;
    }
  }

  static async updateProject(id: string, updates: Partial<DevProject>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('dev_projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      return false;
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('dev_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      return false;
    }
  }

  // Função auxiliar para serializar mensagens para o banco
  private static serializeMessagesForDB(messages: DevMessage[]) {
    return messages.map(msg => ({
      id: msg.id,
      type: msg.type,
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
      // Não salvamos o objeto File, apenas indicamos se tinha imagem
      hasImage: !!msg.image
    }));
  }

  // Função auxiliar para deserializar mensagens do banco
  private static deserializeMessagesFromDB(messages: any[]): DevMessage[] {
    return messages.map(msg => ({
      id: msg.id,
      type: msg.type,
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      // Não recuperamos imagens do banco por enquanto
      ...(msg.hasImage && { image: undefined })
    }));
  }

  // Conversas
  static async saveConversation(projectId: string, messages: DevMessage[]): Promise<boolean> {
    try {
      const serializedMessages = this.serializeMessagesForDB(messages);
      
      const { data: existing } = await supabase
        .from('dev_conversations')
        .select('id')
        .eq('project_id', projectId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('dev_conversations')
          .update({ 
            messages: serializedMessages,
            updated_at: new Date().toISOString()
          })
          .eq('project_id', projectId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('dev_conversations')
          .insert({
            project_id: projectId,
            messages: serializedMessages
          });

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Erro ao salvar conversa:', error);
      return false;
    }
  }

  static async loadConversation(projectId: string): Promise<DevMessage[]> {
    try {
      const { data: conversation, error } = await supabase
        .from('dev_conversations')
        .select('messages')
        .eq('project_id', projectId)
        .single();

      if (error) throw error;

      if (!conversation?.messages) return [];

      return this.deserializeMessagesFromDB(conversation.messages as any[]);
    } catch (error) {
      console.error('Erro ao carregar conversa:', error);
      return [];
    }
  }
}
