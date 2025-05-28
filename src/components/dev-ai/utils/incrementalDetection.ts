
export const determineIfIncremental = (userMessage: string, existingCode: string): boolean => {
  const messageLower = userMessage.toLowerCase();
  
  console.log('Analisando mensagem para detecção incremental:', messageLower);
  console.log('Código existente presente:', !!existingCode && existingCode.length > 100);
  
  // Palavras que indicam SUBSTITUIÇÃO COMPLETA (mais restritivas)
  const replaceKeywords = [
    'substitua tudo', 'refaça completamente', 'recrie do zero', 'começar novamente',
    'limpar tudo', 'novo projeto', 'projeto diferente', 'layout totalmente diferente',
    'começar do zero', 'apagar tudo'
  ];
  
  // Palavras que indicam ADIÇÃO/INCREMENTO (mais abrangentes)
  const incrementalKeywords = [
    'adicione', 'adicionar', 'acrescente', 'inclua', 'incluir',
    'nova página', 'novo componente', 'mais uma', 'outra página',
    'página de', 'criar página', 'página', 'complementar',
    'expandir', 'estender', 'no mesmo layout', 'mesmo design',
    'mesmo site', 'manter', 'seguindo o mesmo', 'no layout existente',
    'cliente', 'clientes', 'dashboard', 'sobre', 'contato', 'produto',
    'produtos', 'vendas', 'relatório', 'configurações'
  ];
  
  // Se tem palavras de substituição explícitas, não é incremental
  const hasReplaceWords = replaceKeywords.some(keyword => messageLower.includes(keyword));
  if (hasReplaceWords) {
    console.log('Detectado comando de substituição completa:', replaceKeywords.find(k => messageLower.includes(k)));
    return false;
  }
  
  // Se há código existente significativo (mais de 200 caracteres), é incremental por padrão
  if (existingCode && existingCode.trim().length > 200) {
    console.log('Código existente detectado, usando modo incremental por padrão');
    return true;
  }
  
  // Se há palavras incrementais, é incremental
  const hasIncrementalWords = incrementalKeywords.some(keyword => messageLower.includes(keyword));
  if (hasIncrementalWords) {
    console.log('Detectado comando incremental:', incrementalKeywords.find(k => messageLower.includes(k)));
    return true;
  }
  
  // Se não há código existente, não é incremental
  console.log('Nenhum código existente, criando do zero');
  return false;
};
