
import { supabase } from '@/integrations/supabase/client';
import { DevProject, CreateProjectData, DevConversation, DevMessage } from '@/types/devai';

export class DevAIService {
  // Projetos
  static async createProject(data: CreateProjectData): Promise<DevProject | null> {
    try {
      const { data: project, error } = await supabase
        .from('dev_projects')
        .insert({
          name: data.name,
          description: data.description,
          user_id: (await supabase.auth.getUser()).data.user?.id
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

  // Conversas
  static async saveConversation(projectId: string, messages: DevMessage[]): Promise<boolean> {
    try {
      const { data: existing } = await supabase
        .from('dev_conversations')
        .select('id')
        .eq('project_id', projectId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('dev_conversations')
          .update({ 
            messages: messages.map(msg => ({
              ...msg,
              timestamp: msg.timestamp.toISOString()
            })),
            updated_at: new Date().toISOString()
          })
          .eq('project_id', projectId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('dev_conversations')
          .insert({
            project_id: projectId,
            messages: messages.map(msg => ({
              ...msg,
              timestamp: msg.timestamp.toISOString()
            }))
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

      return (conversation.messages as any[]).map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Erro ao carregar conversa:', error);
      return [];
    }
  }
}
