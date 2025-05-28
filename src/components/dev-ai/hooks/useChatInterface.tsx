
import { useState, useRef, useEffect } from 'react';
import { useDevAI } from '../DevAIContext';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';

export const useChatInterface = () => {
  const { messages, addMessage, updateCodeIncremental, isLoading, setIsLoading, currentProject, generatedCode } = useDevAI();
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  const extractCodeFromResponse = (response: string) => {
    console.log('Extraindo código da resposta:', response);
    
    // Procurar por blocos de código HTML
    const htmlMatch = response.match(/```html\s*([\s\S]*?)```/i);
    if (htmlMatch) {
      console.log('Código HTML encontrado:', htmlMatch[1]);
      return htmlMatch[1].trim();
    }

    // Procurar por blocos de código genéricos que contenham HTML
    const codeMatch = response.match(/```[^\n]*\s*([\s\S]*?)```/);
    if (codeMatch && codeMatch[1].includes('<')) {
      console.log('Código genérico com HTML encontrado:', codeMatch[1]);
      return codeMatch[1].trim();
    }

    // Se não encontrar blocos de código, procurar por HTML no texto
    const htmlInText = response.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
    if (htmlInText) {
      console.log('HTML encontrado no texto:', htmlInText[0]);
      return htmlInText[0];
    }

    // Procurar por qualquer tag HTML
    const anyHtmlMatch = response.match(/<[^>]+>[\s\S]*<\/[^>]+>/);
    if (anyHtmlMatch) {
      console.log('Tags HTML encontradas:', anyHtmlMatch[0]);
      return anyHtmlMatch[0];
    }

    console.log('Nenhum código encontrado, retornando resposta completa');
    return response;
  };

  const createShortSummary = (message: string) => {
    // Remove código da mensagem e cria resumo curto
    const cleanMessage = message
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<!DOCTYPE html>[\s\S]*<\/html>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Se ainda há conteúdo, pega apenas as primeiras palavras
    if (cleanMessage && cleanMessage.length > 50) {
      return cleanMessage.substring(0, 47) + '...';
    }
    
    return cleanMessage || 'Código gerado!';
  };

  const determineIfIncremental = (userMessage: string, existingCode: string) => {
    const incrementalKeywords = [
      'adicione', 'adicionar', 'acrescente', 'inclua', 'incluir',
      'nova página', 'novo componente', 'mais uma', 'outra página',
      'complementar', 'expandir', 'estender'
    ];
    
    const replaceKeywords = [
      'substitua', 'substituir', 'mude', 'mudar', 'altere', 'alterar',
      'refaça', 'refazer', 'recrie', 'recriar', 'novo layout',
      'começar do zero', 'limpar'
    ];
    
    const messageLower = userMessage.toLowerCase();
    
    // Se há palavras de substituição, não é incremental
    if (replaceKeywords.some(keyword => messageLower.includes(keyword))) {
      return false;
    }
    
    // Se há palavras incrementais e já existe código, é incremental
    if (incrementalKeywords.some(keyword => messageLower.includes(keyword)) && existingCode) {
      return true;
    }
    
    // Se não há código existente, não é incremental
    if (!existingCode) {
      return false;
    }
    
    // Por padrão, se há código existente, tentar ser incremental
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim() || (selectedImage ? 'Imagem enviada' : '');
    setInput('');
    addMessage(userMessage, 'user', selectedImage || undefined);
    
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const isIncremental = determineIfIncremental(userMessage, generatedCode);
      
      let prompt = `Você é um assistente de desenvolvimento web especializado em criar código HTML, CSS e JavaScript.`;
      
      if (currentProject && generatedCode && isIncremental) {
        prompt += `\n\nCONTEXTO DO PROJETO: "${currentProject.name}"
        
CÓDIGO EXISTENTE NO PROJETO:
\`\`\`html
${generatedCode}
\`\`\`

INSTRUÇÃO IMPORTANTE: O usuário quer ADICIONAR funcionalidade ao projeto existente, NÃO substituir o código atual. Mantenha o layout e estrutura existente, apenas adicione a nova funcionalidade solicitada.`;
      }
      
      if (currentImage) {
        prompt += ` O usuário enviou uma imagem. Analise a imagem e`;
        if (input.trim()) {
          prompt += ` também disse: "${input.trim()}"`;
        }
        prompt += ` Crie código baseado no que você vê na imagem.`;
      } else {
        prompt += ` O usuário disse: "${userMessage}"`;
      }
      
      if (isIncremental && generatedCode) {
        prompt += `\n\nPor favor, ${userMessage.toLowerCase().includes('nova página') || userMessage.toLowerCase().includes('adicione') ? 'adicione a nova funcionalidade ao código existente' : 'modifique apenas a parte necessária do código existente'}.`;
      }
      
      prompt += `
      
Responda de forma útil e gere código completo e funcional. Se for criar uma página web, inclue HTML completo com DOCTYPE, head e body.
Certifique-se de que o código seja responsivo e bem estruturado.

Use blocos de código markdown com três crases seguidas de html para envolver seu código.`;

      console.log('Enviando prompt para DeepSeek:', prompt);
      console.log('Modo incremental:', isIncremental);
      
      const response = await callDeepseekApi(prompt);
      
      if (response) {
        console.log('Resposta recebida da API:', response);
        
        // Extrair código da resposta
        const extractedCode = extractCodeFromResponse(response);
        if (extractedCode && extractedCode !== response) {
          console.log('Código extraído e enviado para preview:', extractedCode);
          console.log('Atualizando com modo incremental:', isIncremental);
          
          // Usar a nova função incremental
          updateCodeIncremental(extractedCode, isIncremental);
          
          // Mostrar apenas resumo curto no chat
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        } else {
          // Se não há código, mostrar resumo da resposta
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        }
      } else {
        addMessage('Erro ao processar solicitação.', 'assistant');
      }
    } catch (error) {
      console.error('Erro ao chamar DeepSeek API:', error);
      addMessage('Erro de conexão. Tente novamente.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedImage({ file, preview });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return {
    messages,
    input,
    setInput,
    selectedImage,
    isLoading,
    messagesStartRef,
    handleSubmit,
    handleImageSelect,
    handleRemoveImage
  };
};
