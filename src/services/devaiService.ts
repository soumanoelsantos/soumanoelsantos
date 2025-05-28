
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
          user_id: user.user.id,
          code: '' // Inicializa com código vazio
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

  // Nova função para atualizar código de forma incremental
  static async updateProjectCode(id: string, newCode: string, isIncremental: boolean = true): Promise<boolean> {
    try {
      if (!isIncremental) {
        // Substituição completa do código
        return await this.updateProject(id, { code: newCode });
      }

      // Buscar código atual
      const currentProject = await this.getProject(id);
      if (!currentProject) return false;

      let updatedCode = currentProject.code || '';

      // Se já existe código, combinar de forma inteligente
      if (updatedCode && newCode) {
        // Verificar se o novo código é uma página/componente adicional
        if (this.isNewPageOrComponent(newCode, updatedCode)) {
          updatedCode = this.combineCode(updatedCode, newCode);
        } else {
          // Se for uma modificação, substituir
          updatedCode = newCode;
        }
      } else {
        // Se não há código anterior, usar o novo
        updatedCode = newCode;
      }

      return await this.updateProject(id, { code: updatedCode });
    } catch (error) {
      console.error('Erro ao atualizar código do projeto:', error);
      return false;
    }
  }

  // Verifica se o novo código é uma nova página/componente
  private static isNewPageOrComponent(newCode: string, existingCode: string): boolean {
    // Verifica se o novo código contém novas funcionalidades que podem ser combinadas
    const newCodePages = this.extractPages(newCode);
    const existingPages = this.extractPages(existingCode);
    
    // Se há páginas diferentes, é incremental
    return newCodePages.some(page => !existingPages.includes(page));
  }

  // Extrai identificadores de páginas do código
  private static extractPages(code: string): string[] {
    const pages: string[] = [];
    
    // Procura por rotas ou títulos de páginas
    const routeMatches = code.match(/path=["']([^"']+)["']/g);
    if (routeMatches) {
      pages.push(...routeMatches.map(match => match.replace(/path=["']([^"']+)["']/, '$1')));
    }
    
    // Procura por títulos h1, h2
    const titleMatches = code.match(/<h[12][^>]*>([^<]+)<\/h[12]>/g);
    if (titleMatches) {
      pages.push(...titleMatches.map(match => match.replace(/<h[12][^>]*>([^<]+)<\/h[12]>/, '$1')));
    }
    
    return pages;
  }

  // Combina código existente com novo código
  private static combineCode(existingCode: string, newCode: string): string {
    // Se o código existente é um documento HTML completo
    if (existingCode.includes('<!DOCTYPE html>') && newCode.includes('<!DOCTYPE html>')) {
      // Combinar o conteúdo do body
      const existingBodyMatch = existingCode.match(/<body[^>]*>([\s\S]*)<\/body>/);
      const newBodyMatch = newCode.match(/<body[^>]*>([\s\S]*)<\/body>/);
      
      if (existingBodyMatch && newBodyMatch) {
        const combinedBody = existingBodyMatch[1] + '\n\n' + newBodyMatch[1];
        return existingCode.replace(/<body[^>]*>[\s\S]*<\/body>/, `<body>\n${combinedBody}\n</body>`);
      }
    }
    
    // Para outros casos, adicionar o novo código ao final
    return existingCode + '\n\n<!-- Nova funcionalidade -->\n' + newCode;
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
      // Note: removemos completamente a propriedade 'image' para evitar serializar o File
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
