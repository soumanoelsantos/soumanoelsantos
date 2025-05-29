
import { isValidReactCode } from '../validation/reactCodeValidator';
import { getCodeBlockPatterns, getReactComponentPatterns } from './codePatterns';
import { createReportsComponent, createGenericComponent } from '../generators/componentGenerators';

export const extractFromCodeBlocks = (response: string): string | null => {
  const patterns = getCodeBlockPatterns();
  
  for (const pattern of patterns) {
    const match = response.match(pattern);
    if (match && match[1].trim()) {
      const code = match[1].trim();
      if (isValidReactCode(code)) {
        console.log('✅ Código React válido encontrado em bloco de código');
        console.log('📏 Tamanho do código extraído:', code.length);
        return code;
      }
    }
  }
  
  return null;
};

export const extractFromReactPatterns = (response: string): string | null => {
  const patterns = getReactComponentPatterns();
  
  for (const pattern of patterns) {
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
  
  return null;
};

export const generateContextAwareComponent = (response: string): string => {
  // Se há menção a páginas específicas, criar componente React apropriado
  if (response.toLowerCase().includes('relatórios') || response.toLowerCase().includes('relatorios')) {
    console.log('✅ Componente de relatórios criado');
    return createReportsComponent();
  }
  
  // Fallback para componente genérico válido
  console.log('✅ Componente React genérico criado');
  return createGenericComponent();
};
