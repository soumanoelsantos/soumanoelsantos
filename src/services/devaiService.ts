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
        console.log('Substituição completa do código');
        return await this.updateProject(id, { code: newCode });
      }

      // Buscar código atual
      const currentProject = await this.getProject(id);
      if (!currentProject) return false;

      let updatedCode = currentProject.code || '';

      // Se já existe código e é incremental, combinar de forma inteligente
      if (updatedCode && newCode && isIncremental) {
        console.log('Combinando código existente com novo código');
        updatedCode = this.combineCodeIntelligently(updatedCode, newCode);
      } else {
        // Se não há código anterior ou não é incremental, usar o novo
        updatedCode = newCode;
      }

      return await this.updateProject(id, { code: updatedCode });
    } catch (error) {
      console.error('Erro ao atualizar código do projeto:', error);
      return false;
    }
  }

  // Combina código existente com novo código de forma mais inteligente
  private static combineCodeIntelligently(existingCode: string, newCode: string): string {
    console.log('Iniciando combinação inteligente de código');
    
    // Se ambos são documentos HTML completos
    if (existingCode.includes('<!DOCTYPE html>') && newCode.includes('<!DOCTYPE html>')) {
      console.log('Ambos são documentos HTML completos - combinando conteúdo');
      return this.mergeHtmlDocuments(existingCode, newCode);
    }
    
    // Se o código existente é HTML completo e o novo é fragmento
    if (existingCode.includes('<!DOCTYPE html>') && !newCode.includes('<!DOCTYPE html>')) {
      console.log('Código existente é HTML completo, novo é fragmento - inserindo no existente');
      return this.insertFragmentIntoDocument(existingCode, newCode);
    }
    
    // Se o novo código é HTML completo e o existente é fragmento
    if (!existingCode.includes('<!DOCTYPE html>') && newCode.includes('<!DOCTYPE html>')) {
      console.log('Novo código é HTML completo, existente é fragmento - usando novo como base');
      return newCode;
    }
    
    // Para outros casos, adicionar o novo código ao final
    console.log('Casos gerais - adicionando ao final');
    return existingCode + '\n\n<!-- Nova funcionalidade -->\n' + newCode;
  }

  // Mescla dois documentos HTML completos
  private static mergeHtmlDocuments(existingCode: string, newCode: string): string {
    // Extrair conteúdo do body do código existente
    const existingBodyMatch = existingCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const newBodyMatch = newCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    
    if (existingBodyMatch && newBodyMatch) {
      const existingBodyContent = existingBodyMatch[1];
      const newBodyContent = newBodyMatch[1];
      
      // Verificar se o novo conteúdo tem uma nova página/seção
      if (this.isNewPageContent(newBodyContent)) {
        // Adicionar novo conteúdo preservando menu lateral e estrutura
        const combinedBody = this.addNewPageToExistingStructure(existingBodyContent, newBodyContent);
        return existingCode.replace(/<body[^>]*>[\s\S]*<\/body>/i, `<body>${combinedBody}</body>`);
      } else {
        // Simplesmente adicionar ao final
        const combinedBody = existingBodyContent + '\n\n<!-- Nova funcionalidade -->\n' + newBodyContent;
        return existingCode.replace(/<body[^>]*>[\s\S]*<\/body>/i, `<body>${combinedBody}</body>`);
      }
    }
    
    // Se não conseguir extrair body, usar método simples
    return existingCode + '\n\n<!-- Código adicional -->\n' + newCode;
  }

  // Insere fragmento de código em documento HTML existente
  private static insertFragmentIntoDocument(existingCode: string, fragment: string): string {
    const bodyMatch = existingCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    
    if (bodyMatch) {
      const existingBodyContent = bodyMatch[1];
      const newBodyContent = existingBodyContent + '\n\n<!-- Nova funcionalidade -->\n' + fragment;
      return existingCode.replace(/<body[^>]*>[\s\S]*<\/body>/i, `<body>${newBodyContent}</body>`);
    }
    
    // Se não encontrar body, adicionar antes do fechamento do html
    return existingCode.replace(/<\/html>/i, `\n<!-- Nova funcionalidade -->\n${fragment}\n</html>`);
  }

  // Verifica se o conteúdo é uma nova página
  private static isNewPageContent(content: string): boolean {
    const pageIndicators = [
      /<h1[^>]*>.*?página.*?<\/h1>/i,
      /<div[^>]*class="[^"]*page[^"]*"/i,
      /<section[^>]*>/i,
      /<main[^>]*>/i,
      /cliente/i,
      /dashboard/i,
      /página/i
    ];
    
    return pageIndicators.some(indicator => indicator.test(content));
  }

  // Adiciona nova página preservando estrutura existente
  private static addNewPageToExistingStructure(existingContent: string, newContent: string): string {
    // Se tem sidebar/menu lateral, adicionar nova opção
    const sidebarMatch = existingContent.match(/(<nav[^>]*sidebar[^>]*>[\s\S]*?<\/nav>)/i) ||
                         existingContent.match(/(<div[^>]*sidebar[^>]*>[\s\S]*?<\/div>)/i) ||
                         existingContent.match(/(<ul[^>]*menu[^>]*>[\s\S]*?<\/ul>)/i);
    
    if (sidebarMatch) {
      console.log('Sidebar detectado - adicionando nova opção de menu');
      // Extrair nome da página do novo conteúdo
      const pageNameMatch = newContent.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                           newContent.match(/página\s+([a-záêçõ]+)/i);
      
      let pageName = pageNameMatch ? pageNameMatch[1].trim() : 'Nova Página';
      if (pageName.toLowerCase().includes('página')) {
        pageName = pageName.replace(/página\s*/gi, '').trim();
      }
      
      // Adicionar item no menu
      const menuItemHtml = `<li><a href="#${pageName.toLowerCase()}" onclick="showPage('${pageName.toLowerCase()}')">${pageName}</a></li>`;
      
      let updatedContent = existingContent;
      
      // Tentar adicionar no final de uma lista de menu
      if (updatedContent.includes('</ul>')) {
        updatedContent = updatedContent.replace(/(<\/ul>)/i, `    ${menuItemHtml}\n$1`);
      } else if (updatedContent.includes('</nav>')) {
        updatedContent = updatedContent.replace(/(<\/nav>)/i, `    ${menuItemHtml}\n$1`);
      }
      
      // Adicionar conteúdo da nova página
      const pageContentHtml = `
<div id="${pageName.toLowerCase()}" class="page-content" style="display: none;">
${newContent}
</div>`;
      
      // Adicionar script para navegação se não existir
      const navigationScript = `
<script>
function showPage(pageId) {
  // Esconder todas as páginas
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => page.style.display = 'none');
  
  // Mostrar página selecionada
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.style.display = 'block';
  }
  
  // Atualizar menu ativo
  const menuItems = document.querySelectorAll('nav a, ul a');
  menuItems.forEach(item => item.classList.remove('active'));
  const activeItem = document.querySelector(\`a[href="#\${pageId}"]\`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}
</script>`;
      
      updatedContent += pageContentHtml;
      
      // Adicionar script se não existir
      if (!updatedContent.includes('function showPage')) {
        updatedContent += navigationScript;
      }
      
      return updatedContent;
    }
    
    // Se não tem sidebar, apenas adicionar ao final
    return existingContent + '\n\n<!-- Nova página -->\n' + newContent;
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
