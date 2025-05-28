
export const determineIfIncremental = (userMessage: string, existingCode: string): boolean => {
  const messageLower = userMessage.toLowerCase();
  
  // Palavras que indicam que é para ADICIONAR/INCREMENTAR
  const incrementalKeywords = [
    'adicione', 'adicionar', 'acrescente', 'inclua', 'incluir',
    'nova página', 'novo componente', 'mais uma', 'outra página',
    'complementar', 'expandir', 'estender', 'página de', 'criar página',
    'página cliente', 'página produto', 'página sobre', 'menu',
    'no mesmo layout', 'mesmo design', 'mesmo site', 'manter',
    'seguindo o mesmo', 'no layout existente'
  ];
  
  // Palavras que indicam que é para SUBSTITUIR TUDO
  const replaceKeywords = [
    'substitua', 'substituir', 'mude completamente', 'refaça tudo',
    'recrie do zero', 'novo layout', 'novo design', 'começar novamente',
    'limpar tudo', 'novo projeto', 'diferente', 'outro estilo'
  ];
  
  // Se tem palavras de substituição explícitas, não é incremental
  if (replaceKeywords.some(keyword => messageLower.includes(keyword))) {
    console.log('Detectado comando de substituição completa');
    return false;
  }
  
  // Se há código existente e palavras incrementais, é incremental
  if (existingCode && incrementalKeywords.some(keyword => messageLower.includes(keyword))) {
    console.log('Detectado comando incremental com código existente');
    return true;
  }
  
  // Se há código existente e não há palavras de substituição, é incremental por padrão
  if (existingCode && existingCode.trim().length > 100) {
    console.log('Código existente detectado, usando modo incremental por padrão');
    return true;
  }
  
  // Se não há código existente, não é incremental
  console.log('Nenhum código existente, criando do zero');
  return false;
};
