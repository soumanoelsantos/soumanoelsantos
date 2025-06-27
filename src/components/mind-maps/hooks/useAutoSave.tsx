
import { useEffect, useRef, useCallback } from 'react';
import { MindMapContent } from '@/types/mindMap';

interface UseAutoSaveProps {
  content: MindMapContent;
  onSave: (content: MindMapContent) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = ({ 
  content, 
  onSave, 
  delay = 2000, 
  enabled = true 
}: UseAutoSaveProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');
  const isSavingRef = useRef(false);

  const saveContent = useCallback(async () => {
    if (isSavingRef.current) return;
    
    try {
      isSavingRef.current = true;
      await onSave(content);
      lastSavedRef.current = JSON.stringify(content);
      console.log('Conteúdo salvo automaticamente');
    } catch (error) {
      console.error('Erro no salvamento automático:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [content, onSave]);

  useEffect(() => {
    if (!enabled) return;

    const currentContent = JSON.stringify(content);
    
    // Não salvar se o conteúdo não mudou
    if (currentContent === lastSavedRef.current) return;
    
    // Não salvar se está vazio (apenas nó central padrão)
    if (content.nodes.length <= 1 && content.edges.length === 0) {
      lastSavedRef.current = currentContent;
      return;
    }

    // Limpar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Definir novo timeout para salvar
    timeoutRef.current = setTimeout(() => {
      saveContent();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, delay, enabled, saveContent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
