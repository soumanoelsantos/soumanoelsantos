
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
      const isIncremental = determineIfIncremental(userMessage, generatedCode);
      
      const prompt = generatePrompt(
        userMessage,
        currentProject,
        generatedCode,
        isIncremental,
        !!currentImage,
        input.trim()
      );

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
