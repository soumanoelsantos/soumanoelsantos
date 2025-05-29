
export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Iniciando extração de código da resposta...');
  console.log('📄 Resposta recebida (primeiros 500 chars):', response.substring(0, 500));
  
  // 1. Procurar por blocos de código TSX/JSX explícitos
  const tsxBlockMatch = response.match(/```(?:tsx|jsx|typescript|react)\s*([\s\S]*?)```/i);
  if (tsxBlockMatch && tsxBlockMatch[1].trim()) {
    const code = tsxBlockMatch[1].trim();
    if (isValidReactCode(code)) {
      console.log('✅ Código React TSX válido encontrado');
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 2. Procurar por blocos de código genéricos que sejam React válidos
  const genericCodeMatch = response.match(/```[a-zA-Z]*\s*([\s\S]*?)```/);
  if (genericCodeMatch && genericCodeMatch[1].trim()) {
    const code = genericCodeMatch[1].trim();
    if (isValidReactCode(code)) {
      console.log('✅ Código React válido encontrado em bloco genérico');
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 3. Procurar por componentes React válidos no texto
  const reactComponentMatches = [
    // Componente React funcional completo
    /import\s+React[^;]*;[\s\S]*?export\s+default\s+\w+;/,
    // Componente React com função
    /const\s+\w+\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?\};[\s\S]*?export\s+default\s+\w+;/,
    // Arquivo de página React
    /import\s+React[^;]*;[\s\S]*?const\s+\w+\s*=[\s\S]*?export\s+default\s+\w+;/
  ];

  for (const pattern of reactComponentMatches) {
    const match = response.match(pattern);
    if (match) {
      const code = match[0].trim();
      if (isValidReactCode(code)) {
        console.log('✅ Componente React válido encontrado');
        console.log('📏 Tamanho do código extraído:', code.length);
        return code;
      }
    }
  }

  // 4. Verificar se há código que pareça React mas esteja malformado
  if (response.includes('import React') || response.includes('export default')) {
    console.log('⚠️ Código React detectado mas pode estar incompleto - tentando extrair mesmo assim');
    
    // Tentar extrair componente mesmo que não passe na validação rigorosa
    const componentMatch = response.match(/import React[\s\S]*?export default \w+;?/);
    if (componentMatch) {
      console.log('📝 Extraindo componente detectado:', componentMatch[0].substring(0, 200));
      return componentMatch[0];
    }
  }

  console.log('❌ Nenhum código React válido encontrado na resposta');
  return null;
};

// Função para validar se o código é React válido - versão mais permissiva
const isValidReactCode = (code: string): boolean => {
  console.log('🔍 Validando código React...');
  
  // Verificações básicas de sintaxe React
  const hasValidImports = code.includes('import React') || code.includes('import');
  const hasExportDefault = code.includes('export default');
  const hasValidComponent = /const\s+\w+\s*=|function\s+\w+/.test(code);
  
  // Verificar se tem estrutura JSX básica válida
  const hasValidJSX = /<[A-Z][\w]*/.test(code) || /<div|<section|<main|<header/.test(code);
  
  // Verificar se não tem HTML puro (deve ser JSX/React)
  const isPureHTML = code.includes('<!DOCTYPE html>') || 
                     (code.includes('<html') && !code.includes('import'));

  // Versão mais permissiva - aceitar se tem pelo menos imports e exports válidos
  const isValid = hasValidImports && 
                  hasExportDefault && 
                  !isPureHTML;

  console.log('📊 Validação de código React:');
  console.log('- Imports válidos:', hasValidImports);
  console.log('- Export default:', hasExportDefault);
  console.log('- Componente válido:', hasValidComponent);
  console.log('- JSX válido:', hasValidJSX);
  console.log('- Não é HTML puro:', !isPureHTML);
  console.log('- Resultado final:', isValid);

  if (!isValid) {
    console.log('❌ Código rejeitado - não atende aos critérios mínimos de React');
    console.log('🔍 Primeiros 500 chars do código rejeitado:', code.substring(0, 500));
  } else {
    console.log('✅ Código React aceito para preview');
  }

  return isValid;
};
