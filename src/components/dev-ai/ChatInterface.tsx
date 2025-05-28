import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, CheckCircle } from 'lucide-react';
import { useDevAI } from './DevAIContext';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';
import ImageUpload from './ImageUpload';

const ChatInterface = () => {
  const { messages, addMessage, setGeneratedCode, isLoading, setIsLoading } = useDevAI();
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
      let prompt = `Você é um assistente de desenvolvimento web especializado em criar código HTML, CSS e JavaScript.`;
      
      if (currentImage) {
        prompt += ` O usuário enviou uma imagem. Analise a imagem e`;
        if (input.trim()) {
          prompt += ` também disse: "${input.trim()}"`;
        }
        prompt += ` Crie código baseado no que você vê na imagem.`;
      } else {
        prompt += ` O usuário disse: "${userMessage}"`;
      }
      
      prompt += `
      
      Responda de forma útil e gere código completo e funcional. Se for criar uma página web, inclua HTML completo com DOCTYPE, head e body.
      Certifique-se de que o código seja responsivo e bem estruturado.
      
      Use blocos de código markdown com três crases seguidas de html para envolver seu código.`;

      console.log('Enviando prompt para DeepSeek:', prompt);
      const response = await callDeepseekApi(prompt);
      
      if (response) {
        console.log('Resposta recebida da API:', response);
        
        // Extrair código da resposta
        const extractedCode = extractCodeFromResponse(response);
        if (extractedCode && extractedCode !== response) {
          console.log('Código extraído e enviado para preview:', extractedCode);
          setGeneratedCode(extractedCode);
          
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

  // Reverse the messages array to show newest first
  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-900">Chat com IA</h2>
        <p className="text-xs text-gray-500">Descreva o que você quer ou envie uma imagem</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          <div ref={messagesStartRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-gray-500">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reversedMessages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  {message.image && (
                    <img
                      src={message.image.preview}
                      alt="Imagem enviada"
                      className="max-w-32 h-20 object-cover rounded border"
                    />
                  )}
                  <div className={`px-3 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                    {message.type === 'assistant' && (
                      <div className="flex items-center mt-1 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Preview atualizado</span>
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva o que você quer desenvolver..."
                className="resize-none text-sm"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {selectedImage && (
                <div className="mt-2">
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    selectedImage={selectedImage}
                    onRemoveImage={handleRemoveImage}
                  />
                </div>
              )}
            </div>
            <div className="flex items-end space-x-1">
              {!selectedImage && (
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onRemoveImage={handleRemoveImage}
                />
              )}
              <Button 
                type="submit" 
                disabled={isLoading || (!input.trim() && !selectedImage)}
                size="sm"
                className="h-8 px-3"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
