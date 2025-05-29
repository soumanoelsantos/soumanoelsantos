
export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Iniciando extração de código da resposta...');
  console.log('📄 Resposta recebida (primeiros 500 chars):', response.substring(0, 500));
  
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

  // 5. Procurar por estruturas HTML significativas - MELHORADO
  const structureMatches = [
    /<body[^>]*>[\s\S]*?<\/body>/i,
    /<div[^>]*class="[^"]*container[^"]*"[^>]*>[\s\S]*?<\/div>/i,
    /<div[^>]*class="[^"]*page[^"]*"[^>]*>[\s\S]*?<\/div>/i,
    /<section[^>]*>[\s\S]*?<\/section>/i,
    /<main[^>]*>[\s\S]*?<\/main>/i,
    /<article[^>]*>[\s\S]*?<\/article>/i,
    /<form[^>]*>[\s\S]*?<\/form>/i,
    /<div[^>]*id="[^"]*"[^>]*>[\s\S]*?<\/div>/i,
    // Novo: buscar por divs com classes específicas de páginas
    /<div[^>]*class="[^"]*nav-tab[^"]*"[^>]*>[^<]*contato[^<]*<\/div>[\s\S]*?<div[^>]*class="[^"]*page-content[^"]*"[^>]*>[\s\S]*?<\/div>/i
  ];

  for (const pattern of structureMatches) {
    const match = response.match(pattern);
    if (match) {
      console.log('✅ Estrutura HTML significativa encontrada:', pattern.toString().substring(0, 50) + '...');
      let code = match[0].trim();
      
      // Se encontrou apenas uma div de página, tentar extrair contexto maior
      if (code.includes('page-content') && !code.includes('<!DOCTYPE')) {
        console.log('🔄 Tentando extrair contexto maior para página...');
        // Procurar por todo o contexto ao redor
        const contextMatch = response.match(/(<div[^>]*class="[^"]*container[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>|<html[\s\S]*?<\/html>|<!DOCTYPE[\s\S]*?<\/html>)/i);
        if (contextMatch) {
          code = contextMatch[0].trim();
          console.log('✅ Contexto maior encontrado, tamanho:', code.length);
        }
      }
      
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 6. Procurar por qualquer div com conteúdo substancial
  const substantialDivMatch = response.match(/<div[^>]*>[\s\S]{100,}?<\/div>/s);
  if (substantialDivMatch) {
    console.log('✅ Div substancial encontrada');
    const code = substantialDivMatch[0].trim();
    console.log('📏 Tamanho do código extraído:', code.length);
    return code;
  }

  // 7. Se contém HTML mas não conseguiu extrair, tentar buscar seções menores
  if (response.includes('<') && response.includes('>')) {
    console.log('⚠️ HTML detectado mas não conseguiu extrair padrão específico');
    
    // Tentar extrair linha por linha procurando por HTML
    const lines = response.split('\n');
    let htmlLines = [];
    let inHtmlBlock = false;
    
    for (const line of lines) {
      if (line.includes('<') && line.includes('>')) {
        inHtmlBlock = true;
        htmlLines.push(line);
      } else if (inHtmlBlock && line.trim() === '') {
        htmlLines.push(line);
      } else if (inHtmlBlock && !line.includes('<')) {
        // Pode ser fim do bloco HTML
        break;
      }
    }
    
    if (htmlLines.length > 0) {
      const extractedCode = htmlLines.join('\n').trim();
      console.log('✅ HTML extraído linha por linha, tamanho:', extractedCode.length);
      return extractedCode;
    }
    
    console.log('🔄 Tentando extrair toda a resposta como código');
    return response.trim();
  }

  console.log('❌ Nenhum código HTML encontrado na resposta');
  console.log('📝 Resposta completa analisada:', response);
  return null;
};
