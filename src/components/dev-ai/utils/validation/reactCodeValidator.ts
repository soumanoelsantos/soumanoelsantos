
export const isValidReactCode = (code: string): boolean => {
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

  // Verificar se tem return statement com JSX
  const hasReturnJSX = /return\s*\([\s\S]*?</.test(code) || /return\s*</.test(code);

  // Verificar se não tem sintaxe inválida
  const hasInvalidSyntax = code.includes('class="') && code.includes('className=');

  // Versão mais rigorosa - aceitar só se for React válido
  const isValid = (hasValidImports || hasValidComponent) && 
                  (hasExportDefault || hasValidComponent) && 
                  (hasValidJSX || hasReturnJSX) &&
                  !isPureHTML &&
                  !hasInvalidSyntax;

  console.log('📊 Validação de código React:');
  console.log('- Imports válidos:', hasValidImports);
  console.log('- Export default:', hasExportDefault);
  console.log('- Componente válido:', hasValidComponent);
  console.log('- JSX válido:', hasValidJSX);
  console.log('- Return com JSX:', hasReturnJSX);
  console.log('- Não é HTML puro:', !isPureHTML);
  console.log('- Não tem sintaxe inválida:', !hasInvalidSyntax);
  console.log('- Resultado final:', isValid);

  if (!isValid) {
    console.log('❌ Código rejeitado - não atende aos critérios mínimos de React');
    console.log('🔍 Primeiros 500 chars do código rejeitado:', code.substring(0, 500));
  } else {
    console.log('✅ Código React aceito para preview');
  }

  return isValid;
};
