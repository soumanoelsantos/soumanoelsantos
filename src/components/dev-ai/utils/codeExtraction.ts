
export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Extraindo código da resposta:', response.substring(0, 200) + '...');
  
  // Procurar por blocos de código HTML
  const htmlMatch = response.match(/```html\s*([\s\S]*?)```/i);
  if (htmlMatch) {
    console.log('✅ Código HTML encontrado em bloco de código');
    return htmlMatch[1].trim();
  }

  // Procurar por blocos de código genéricos que contenham HTML
  const codeMatch = response.match(/```[^\n]*\s*([\s\S]*?)```/);
  if (codeMatch && codeMatch[1].includes('<')) {
    console.log('✅ Código genérico com HTML encontrado');
    return codeMatch[1].trim();
  }

  // Se não encontrar blocos de código, procurar por HTML completo no texto
  const htmlInText = response.match(/<!DOCTYPE html>[\s\S]*?<\/html>/i);
  if (htmlInText) {
    console.log('✅ HTML completo encontrado no texto');
    return htmlInText[0];
  }

  // Procurar por qualquer estrutura HTML significativa
  const anyHtmlMatch = response.match(/<(?:html|body|div|form|section|article|main|header|nav|footer)[^>]*>[\s\S]*?<\/(?:html|body|div|form|section|article|main|header|nav|footer)>/i);
  if (anyHtmlMatch) {
    console.log('✅ Estrutura HTML significativa encontrada');
    return anyHtmlMatch[0];
  }

  // Procurar por tags HTML isoladas (para componentes menores)
  const simpleHtmlMatch = response.match(/<[^>]+>.*?<\/[^>]+>/s);
  if (simpleHtmlMatch) {
    console.log('✅ Tags HTML simples encontradas');
    return simpleHtmlMatch[0];
  }

  console.log('⚠️ Nenhum código HTML encontrado, retornando resposta como texto');
  return null; // Retorna null se não encontrar código HTML
};
