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
      console.log(`🔧 Atualizando código - Projeto: ${id}, Incremental: ${isIncremental}`);
      
      if (!isIncremental) {
        // Substituição completa do código
        console.log('📝 Substituição completa do código');
        return await this.updateProject(id, { code: newCode });
      }

      // Buscar código atual
      const currentProject = await this.getProject(id);
      if (!currentProject) {
        console.log('❌ Projeto não encontrado');
        return false;
      }

      let updatedCode = currentProject.code || '';
      console.log('📄 Código atual:', updatedCode.length, 'caracteres');

      // Se já existe código e é incremental, combinar de forma inteligente
      if (updatedCode && newCode && isIncremental) {
        console.log('🔄 Combinando código existente com novo código');
        
        // Verificar se o novo código é realmente diferente
        if (this.isCodeSimilar(updatedCode, newCode)) {
          console.log('⚠️ Códigos muito similares, mantendo existente');
          return true;
        }
        
        updatedCode = this.combineCodeIntelligently(updatedCode, newCode);
      } else {
        // Se não há código anterior, usar o novo
        console.log('📄 Usando novo código como base');
        updatedCode = newCode;
      }

      console.log('💾 Salvando código atualizado:', updatedCode.length, 'caracteres');
      return await this.updateProject(id, { code: updatedCode });
    } catch (error) {
      console.error('❌ Erro ao atualizar código do projeto:', error);
      return false;
    }
  }

  // Verifica se dois códigos são muito similares
  private static isCodeSimilar(code1: string, code2: string): boolean {
    const clean1 = code1.replace(/\s+/g, ' ').trim();
    const clean2 = code2.replace(/\s+/g, ' ').trim();
    
    // Se são idênticos
    if (clean1 === clean2) return true;
    
    // Se o novo código está contido no existente (pode ser que a IA gerou algo redundante)
    if (clean1.includes(clean2) || clean2.includes(clean1)) return true;
    
    return false;
  }

  // Combina código existente com novo código de forma mais inteligente
  private static combineCodeIntelligently(existingCode: string, newCode: string): string {
    console.log('🔍 Iniciando combinação inteligente de código');
    
    // Se ambos são documentos HTML completos
    if (existingCode.includes('<!DOCTYPE html>') && newCode.includes('<!DOCTYPE html>')) {
      console.log('📋 Ambos são documentos HTML completos - extraindo conteúdo novo');
      return this.mergeHtmlDocuments(existingCode, newCode);
    }
    
    // Se o código existente é HTML completo e o novo é fragmento
    if (existingCode.includes('<!DOCTYPE html>') && !newCode.includes('<!DOCTYPE html>')) {
      console.log('📄 Inserindo fragmento no documento existente');
      return this.insertFragmentIntoDocument(existingCode, newCode);
    }
    
    // Se o novo código é HTML completo, usar como base e tentar preservar estrutura
    if (!existingCode.includes('<!DOCTYPE html>') && newCode.includes('<!DOCTYPE html>')) {
      console.log('🆕 Novo código é documento completo - verificando se deve preservar existente');
      
      // Se o código existente parece ser uma página específica, tentar integrar
      if (this.isPageContent(existingCode)) {
        return this.integratePageIntoNewDocument(newCode, existingCode);
      }
      
      return newCode;
    }
    
    // Para outros casos, tentar combinar de forma inteligente
    console.log('🔗 Combinação geral');
    return this.smartCombineContent(existingCode, newCode);
  }

  // Mescla dois documentos HTML completos preservando o existente
  private static mergeHtmlDocuments(existingCode: string, newCode: string): string {
    console.log('🔄 Mesclando documentos HTML');
    
    // Extrair conteúdo do body do código novo
    const newBodyMatch = newCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    
    if (!newBodyMatch) {
      console.log('⚠️ Não foi possível extrair body do novo código');
      return existingCode;
    }
    
    const newBodyContent = newBodyMatch[1];
    
    // Se o novo conteúdo parece ser uma página adicional
    if (this.isNewPageContent(newBodyContent)) {
      console.log('📄 Detectada nova página - integrando ao layout existente');
      return this.addNewPageToExistingStructure(existingCode, newBodyContent);
    }
    
    // Se não conseguir identificar como nova página, adicionar ao final
    console.log('➕ Adicionando conteúdo ao final');
    return this.insertFragmentIntoDocument(existingCode, newBodyContent);
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
      /<h1[^>]*>.*?(página|page|dashboard|cliente|produto|sobre|contato|vendas|relatório).*?<\/h1>/i,
      /<div[^>]*class="[^"]*page[^"]*"/i,
      /<section[^>]*id="[^"]*page[^"]*"/i,
      /<main[^>]*>/i,
      /cliente|dashboard|página|vendas|produto|sobre|contato|relatório/i
    ];
    
    return pageIndicators.some(indicator => indicator.test(content));
  }

  private static isPageContent(content: string): boolean {
    return this.isNewPageContent(content) || content.includes('<div') || content.includes('<section');
  }

  // Adiciona nova página preservando estrutura existente
  private static addNewPageToExistingStructure(existingCode: string, newPageContent: string): string {
    console.log('🏗️ Adicionando nova página à estrutura existente');
    
    // Extrair nome da página do novo conteúdo
    const pageNameMatch = newPageContent.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                         newPageContent.match(/página\s+([a-záêçõ]+)/i) ||
                         newPageContent.match(/(cliente|dashboard|vendas|produto|sobre|contato|relatório)/i);
    
    let pageName = pageNameMatch ? pageNameMatch[1].trim() : 'Nova Página';
    if (pageName.toLowerCase().includes('página')) {
      pageName = pageName.replace(/página\s*/gi, '').trim();
    }
    
    console.log('📝 Nome da página detectado:', pageName);
    
    // Identificar onde está o menu no código existente
    const menuPatterns = [
      /<nav[^>]*class="[^"]*sidebar[^"]*"[^>]*>([\s\S]*?)<\/nav>/i,
      /<div[^>]*class="[^"]*sidebar[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<ul[^>]*class="[^"]*menu[^"]*"[^>]*>([\s\S]*?)<\/ul>/i,
      /<nav[^>]*>([\s\S]*?)<\/nav>/i
    ];
    
    let updatedCode = existingCode;
    let menuFound = false;
    
    for (const pattern of menuPatterns) {
      const menuMatch = updatedCode.match(pattern);
      if (menuMatch) {
        console.log('🎯 Menu encontrado, adicionando nova opção');
        
        const menuItemHtml = `        <li><a href="#${pageName.toLowerCase()}" onclick="showPage('${pageName.toLowerCase()}')">${pageName}</a></li>`;
        
        // Adicionar item no menu (antes do fechamento da lista ou nav)
        if (menuMatch[0].includes('</ul>')) {
          updatedCode = updatedCode.replace(menuMatch[0], 
            menuMatch[0].replace(/<\/ul>/i, `${menuItemHtml}\n    </ul>`)
          );
        } else if (menuMatch[0].includes('</nav>')) {
          updatedCode = updatedCode.replace(menuMatch[0], 
            menuMatch[0].replace(/<\/nav>/i, `${menuItemHtml}\n</nav>`)
          );
        }
        
        menuFound = true;
        break;
      }
    }
    
    // Adicionar conteúdo da nova página
    const pageContentHtml = `
<div id="${pageName.toLowerCase()}" class="page-content" style="display: none;">
${newPageContent}
</div>`;
    
    // Encontrar onde inserir o conteúdo da página
    const contentAreaMatch = updatedCode.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>/i) ||
                            updatedCode.match(/<main[^>]*>/i) ||
                            updatedCode.match(/<body[^>]*>/i);
    
    if (contentAreaMatch) {
      const insertPoint = updatedCode.indexOf(contentAreaMatch[0]) + contentAreaMatch[0].length;
      updatedCode = updatedCode.slice(0, insertPoint) + pageContentHtml + updatedCode.slice(insertPoint);
    } else {
      // Adicionar antes do fechamento do body
      updatedCode = updatedCode.replace(/<\/body>/i, `${pageContentHtml}\n</body>`);
    }
    
    // Adicionar ou atualizar script de navegação
    if (!updatedCode.includes('function showPage')) {
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

// Mostrar primeira página por padrão
document.addEventListener('DOMContentLoaded', function() {
  const firstPage = document.querySelector('.page-content');
  if (firstPage) {
    firstPage.style.display = 'block';
  }
});
</script>`;
      
      updatedCode = updatedCode.replace(/<\/body>/i, `${navigationScript}\n</body>`);
    }
    
    console.log('✅ Nova página integrada com sucesso');
    return updatedCode;
  }

  private static integratePageIntoNewDocument(newDocument: string, existingPageContent: string): string {
    // Se o novo documento parece ter uma estrutura de múltiplas páginas, integrar o existente
    if (newDocument.includes('showPage') || newDocument.includes('page-content')) {
      return this.addNewPageToExistingStructure(newDocument, existingPageContent);
    }
    
    // Caso contrário, usar o novo documento
    return newDocument;
  }

  private static smartCombineContent(existingContent: string, newContent: string): string {
    // Se o novo conteúdo é muito pequeno, pode ser um fragmento
    if (newContent.length < 200) {
      return existingContent + '\n\n<!-- Conteúdo adicional -->\n' + newContent;
    }
    
    // Se ambos são grandes, o novo provavelmente substitui o existente
    return newContent;
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
