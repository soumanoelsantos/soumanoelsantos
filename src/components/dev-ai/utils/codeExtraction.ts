
export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Iniciando extração de código da resposta...');
  console.log('📄 Resposta recebida (primeiros 300 chars):', response.substring(0, 300));
  
  // 1. Procurar por blocos de código HTML explícitos
  const htmlBlockMatch = response.match(/```html\s*([\s\S]*?)```/i);
  if (htmlBlockMatch && htmlBlockMatch[1].trim()) {
    console.log('✅ Código HTML encontrado em bloco explícito');
    const code = htmlBlockMatch[1].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 2. Procurar por blocos de código genéricos que contenham HTML
  const genericCodeMatch = response.match(/```[a-zA-Z]*\s*([\s\S]*?)```/);
  if (genericCodeMatch && genericCodeMatch[1].includes('<') && genericCodeMatch[1].includes('>')) {
    console.log('✅ Código HTML encontrado em bloco genérico');
    const code = genericCodeMatch[1].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 3. Procurar por documento HTML completo no texto
  const docHtmlMatch = response.match(/<!DOCTYPE html>[\s\S]*?<\/html>/i);
  if (docHtmlMatch) {
    console.log('✅ Documento HTML completo encontrado no texto');
    const code = docHtmlMatch[0].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 4. Procurar por tag HTML de abertura até fechamento
  const htmlTagMatch = response.match(/<html[^>]*>[\s\S]*?<\/html>/i);
  if (htmlTagMatch) {
    console.log('✅ Tag HTML completa encontrada');
    const code = htmlTagMatch[0].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 5. Procurar por estruturas HTML significativas
  const structureMatches = [
    /<body[^>]*>[\s\S]*?<\/body>/i,
    /<div[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/div>/i,
    /<section[^>]*>[\s\S]*?<\/section>/i,
    /<main[^>]*>[\s\S]*?<\/main>/i,
    /<article[^>]*>[\s\S]*?<\/article>/i,
    /<form[^>]*>[\s\S]*?<\/form>/i
  ];

  for (const pattern of structureMatches) {
    const match = response.match(pattern);
    if (match) {
      console.log('✅ Estrutura HTML significativa encontrada:', pattern.toString());
      const code = match[0].trim();
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 6. Procurar por qualquer tag HTML simples
  const simpleHtmlMatch = response.match(/<[a-zA-Z][^>]*>.*?<\/[a-zA-Z][^>]*>/s);
  if (simpleHtmlMatch) {
    console.log('✅ Tags HTML simples encontradas');
    const code = simpleHtmlMatch[0].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 7. Se contém HTML mas não conseguiu extrair, tentar pegar tudo
  if (response.includes('<') && response.includes('>')) {
    console.log('⚠️ HTML detectado mas não conseguiu extrair padrão específico');
    console.log('🔄 Tentando extrair toda a resposta como código');
    return response.trim();
  }

  console.log('❌ Nenhum código HTML encontrado na resposta');
  console.log('📝 Conteúdo da resposta analisado sem sucesso');
  return null;
};
