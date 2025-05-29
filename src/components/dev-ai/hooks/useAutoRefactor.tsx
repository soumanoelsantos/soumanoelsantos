
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDevAI } from '../DevAIContext';

interface RefactorSuggestion {
  id: string;
  fileName: string;
  currentSize: number;
  maxSize: number;
  reason: string;
  suggestedActions: string[];
}

export const useAutoRefactor = () => {
  const { toast } = useToast();
  const { generatedCode, addMessage, setIsLoading } = useDevAI();
  const [refactorSuggestions, setRefactorSuggestions] = useState<RefactorSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Configurações de limites de tamanho
  const SIZE_LIMITS = {
    component: 300, // linhas
    hook: 200,
    service: 400,
    util: 250,
    context: 300
  };

  const analyzeCodeSize = (code: string): { lines: number; type: string; needsRefactor: boolean } => {
    const lines = code.split('\n').length;
    
    // Detectar tipo de arquivo baseado no conteúdo
    let type = 'component';
    if (code.includes('export const use') || code.includes('export function use')) {
      type = 'hook';
    } else if (code.includes('Service') || code.includes('API')) {
      type = 'service';
    } else if (code.includes('Context') || code.includes('Provider')) {
      type = 'context';
    } else if (code.includes('export const') && !code.includes('React')) {
      type = 'util';
    }

    const maxSize = SIZE_LIMITS[type as keyof typeof SIZE_LIMITS];
    const needsRefactor = lines > maxSize;

    return { lines, type, needsRefactor };
  };

  const generateRefactorSuggestions = (code: string, fileName: string): RefactorSuggestion | null => {
    const analysis = analyzeCodeSize(code);
    
    if (!analysis.needsRefactor) return null;

    const suggestions: string[] = [];
    
    // Sugestões específicas por tipo
    switch (analysis.type) {
      case 'component':
        suggestions.push('Extrair componentes menores para arquivos separados');
        suggestions.push('Mover lógica complexa para hooks customizados');
        suggestions.push('Criar subcomponentes para seções específicas');
        break;
      case 'hook':
        suggestions.push('Dividir em múltiplos hooks menores e focados');
        suggestions.push('Extrair utilitários para arquivos separados');
        suggestions.push('Mover constantes para arquivo de configuração');
        break;
      case 'service':
        suggestions.push('Dividir em múltiplos serviços por funcionalidade');
        suggestions.push('Extrair métodos auxiliares para utilitários');
        suggestions.push('Criar interfaces separadas para tipos');
        break;
      case 'context':
        suggestions.push('Dividir em múltiplos contextos menores');
        suggestions.push('Extrair lógica para hooks customizados');
        suggestions.push('Mover utilitários para arquivos separados');
        break;
      case 'util':
        suggestions.push('Dividir em múltiplos arquivos utilitários');
        suggestions.push('Agrupar funções relacionadas');
        suggestions.push('Criar módulos temáticos');
        break;
    }

    return {
      id: `refactor-${Date.now()}`,
      fileName,
      currentSize: analysis.lines,
      maxSize: SIZE_LIMITS[analysis.type as keyof typeof SIZE_LIMITS],
      reason: `Arquivo ${analysis.type} com ${analysis.lines} linhas excede o limite recomendado de ${SIZE_LIMITS[analysis.type as keyof typeof SIZE_LIMITS]} linhas`,
      suggestedActions: suggestions
    };
  };

  const executeAutoRefactor = async (suggestion: RefactorSuggestion) => {
    setIsLoading(true);
    
    try {
      const refactorPrompt = `Refatore o código a seguir seguindo estas diretrizes:

ARQUIVO: ${suggestion.fileName}
TAMANHO ATUAL: ${suggestion.currentSize} linhas
LIMITE RECOMENDADO: ${suggestion.maxSize} linhas

AÇÕES SUGERIDAS:
${suggestion.suggestedActions.map(action => `- ${action}`).join('\n')}

CÓDIGO ATUAL:
\`\`\`tsx
${generatedCode}
\`\`\`

INSTRUÇÕES DE REFATORAÇÃO:
1. Mantenha TODA a funcionalidade existente
2. Crie arquivos menores e mais focados
3. Use nomes descritivos para os novos arquivos
4. Mantenha as importações e exports corretas
5. Garanta que não há quebra de funcionalidade
6. Use TypeScript em todos os arquivos
7. Siga as melhores práticas de React
8. Mantenha o mesmo padrão de qualidade visual

Por favor, refatore o código criando os arquivos necessários para reduzir o tamanho e melhorar a organização, mantendo a funcionalidade idêntica.`;

      addMessage(refactorPrompt, 'user');
      
      toast({
        title: "Refatoração Iniciada",
        description: `Refatorando ${suggestion.fileName} para melhorar a organização do código.`,
      });

      // Remover sugestão da lista após execução
      setRefactorSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      
    } catch (error) {
      console.error('Erro ao executar refatoração:', error);
      toast({
        title: "Erro na Refatoração",
        description: "Não foi possível executar a refatoração automaticamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSuggestion = (suggestionId: string) => {
    setRefactorSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    toast({
      title: "Sugestão Dispensada",
      description: "A sugestão de refatoração foi removida.",
    });
  };

  // Analisar código sempre que ele mudar
  useEffect(() => {
    if (!generatedCode || generatedCode.length < 100) return;

    setIsAnalyzing(true);
    
    const timeoutId = setTimeout(() => {
      const suggestion = generateRefactorSuggestions(generatedCode, 'Código Gerado');
      
      if (suggestion) {
        // Verificar se já existe sugestão similar
        const existingSuggestion = refactorSuggestions.find(s => 
          s.fileName === suggestion.fileName && 
          Math.abs(s.currentSize - suggestion.currentSize) < 10
        );
        
        if (!existingSuggestion) {
          setRefactorSuggestions(prev => [...prev, suggestion]);
          
          toast({
            title: "Refatoração Recomendada",
            description: `O arquivo está com ${suggestion.currentSize} linhas. Clique para ver sugestões de refatoração.`,
          });
        }
      }
      
      setIsAnalyzing(false);
    }, 2000); // Aguardar 2 segundos para evitar análises muito frequentes

    return () => clearTimeout(timeoutId);
  }, [generatedCode]);

  return {
    refactorSuggestions,
    isAnalyzing,
    executeAutoRefactor,
    dismissSuggestion,
    analyzeCodeSize
  };
};
