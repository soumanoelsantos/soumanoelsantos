
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth(); // Changed from 'user' to 'userId'

  console.log('🔍 [DEBUG] useProducts - Hook inicializado, userId:', userId);

  const fetchProducts = async () => {
    console.log('🔍 [DEBUG] useProducts - Iniciando fetch de produtos...');
    
    if (!userId) {
      console.log('❌ [DEBUG] useProducts - Usuário não autenticado');
      setIsLoading(false);
      setError(null); // Changed: don't set error for unauthenticated state
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔍 [DEBUG] useProducts - Fazendo query para user_id:', userId);
      
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId)
        .order('name');

      console.log('📋 [DEBUG] useProducts - Resultado da query:', { data, error: fetchError });

      if (fetchError) {
        console.error('❌ [DEBUG] useProducts - Erro na query:', fetchError);
        throw fetchError;
      }

      console.log('✅ [DEBUG] useProducts - Produtos carregados:', data?.length || 0);
      setProducts(data || []);
    } catch (err) {
      console.error('💥 [DEBUG] useProducts - Erro inesperado:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 [DEBUG] useProducts - useEffect triggered, userId:', userId);
    fetchProducts();
  }, [userId]);

  const createProduct = async (productData: { name: string; description?: string }) => {
    if (!userId) {
      console.log('❌ [DEBUG] useProducts - Usuário não autenticado para criar produto');
      throw new Error('Usuário não autenticado');
    }

    console.log('➕ [DEBUG] useProducts - Criando produto:', productData);

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          user_id: userId,
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [DEBUG] useProducts - Erro ao criar produto:', error);
        throw error;
      }

      console.log('✅ [DEBUG] useProducts - Produto criado:', data);
      await fetchProducts(); // Recarregar a lista
      return data;
    } catch (err) {
      console.error('💥 [DEBUG] useProducts - Erro ao criar produto:', err);
      throw err;
    }
  };

  const updateProduct = async (productId: string, productData: { name: string; description?: string }) => {
    if (!userId) {
      console.log('❌ [DEBUG] useProducts - Usuário não autenticado para atualizar produto');
      throw new Error('Usuário não autenticado');
    }

    console.log('✏️ [DEBUG] useProducts - Atualizando produto:', { productId, productData });

    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', productId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ [DEBUG] useProducts - Erro ao atualizar produto:', error);
        throw error;
      }

      console.log('✅ [DEBUG] useProducts - Produto atualizado:', data);
      await fetchProducts(); // Recarregar a lista
      return data;
    } catch (err) {
      console.error('💥 [DEBUG] useProducts - Erro ao atualizar produto:', err);
      throw err;
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!userId) {
      console.log('❌ [DEBUG] useProducts - Usuário não autenticado para deletar produto');
      throw new Error('Usuário não autenticado');
    }

    console.log('🗑️ [DEBUG] useProducts - Deletando produto:', productId);

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('user_id', userId);

      if (error) {
        console.error('❌ [DEBUG] useProducts - Erro ao deletar produto:', error);
        throw error;
      }

      console.log('✅ [DEBUG] useProducts - Produto deletado');
      await fetchProducts(); // Recarregar a lista
    } catch (err) {
      console.error('💥 [DEBUG] useProducts - Erro ao deletar produto:', err);
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
