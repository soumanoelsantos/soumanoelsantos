
import { useState, useRef, useEffect } from 'react';
import { useDevAI } from '../DevAIContext';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';
import { extractCodeFromResponse } from '../utils/codeExtraction';
import { determineIfIncremental } from '../utils/incrementalDetection';
import { createShortSummary } from '../utils/messageProcessing';
import { generatePrompt } from '../utils/promptGeneration';

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
      // FORÇAR modo incremental se há código existente
      const hasExistingCode = generatedCode && generatedCode.trim().length > 300;
      const isIncremental = hasExistingCode ? true : determineIfIncremental(userMessage, generatedCode);
      
      console.log('🔍 Detecção de modo:');
      console.log('- Código existente:', hasExistingCode);
      console.log('- Modo incremental FINAL:', isIncremental);
      console.log('- Tamanho do código:', generatedCode?.length || 0);
      
      const prompt = generatePrompt(
        userMessage,
        currentProject,
        generatedCode,
        isIncremental,
        !!currentImage,
        input.trim()
      );

      console.log('📤 Enviando prompt para DeepSeek:', prompt);
      
      const response = await callDeepseekApi(prompt);
      
      if (response) {
        console.log('📥 Resposta recebida da API:', response);
        
        // Extrair código da resposta
        const extractedCode = extractCodeFromResponse(response);
        if (extractedCode && extractedCode !== response) {
          console.log('💻 Código extraído:', extractedCode.substring(0, 200) + '...');
          console.log('🔄 Atualizando com modo incremental:', isIncremental);
          
          // Usar a função incremental
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
      console.error('❌ Erro ao chamar DeepSeek API:', error);
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
