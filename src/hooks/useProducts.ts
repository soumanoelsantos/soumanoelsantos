
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Product, CreateProductData } from '@/types/goals';

export const useProducts = (targetUserId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  // Use o targetUserId se fornecido, senão use o userId atual
  const effectiveUserId = targetUserId || userId;

  const fetchProducts = async () => {
    if (!effectiveUserId) return;

    console.log('🔍 [DEBUG] useProducts - Buscando produtos para userId:', effectiveUserId);
    setIsLoading(true);
    try {
      // Primeiro, tenta buscar produtos do usuário específico
      let { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', effectiveUserId)
        .order('created_at', { ascending: false });

      console.log('📋 [DEBUG] useProducts - Resultado da busca:', { data, error, effectiveUserId });

      if (error) {
        console.error('❌ [DEBUG] useProducts - Erro na consulta:', error);
        // Se der erro, tenta buscar todos os produtos (para debug)
        const { data: allData, error: allError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        console.log('📋 [DEBUG] useProducts - Tentativa de buscar todos os produtos:', { allData, allError });
        
        if (!allError && allData) {
          // Filtra manualmente os produtos do usuário
          const userProducts = allData.filter(product => product.user_id === effectiveUserId);
          console.log('📋 [DEBUG] useProducts - Produtos filtrados manualmente:', userProducts);
          data = userProducts;
        } else {
          throw error;
        }
      }
      
      console.log('✅ [DEBUG] useProducts - Produtos carregados:', data?.length || 0);
      setProducts(data || []);
    } catch (error: any) {
      console.error('💥 [DEBUG] useProducts - Erro ao carregar produtos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar produtos",
        description: error.message,
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData: CreateProductData) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('products')
        .insert({
          ...productData,
          user_id: userId,
        });

      if (error) throw error;

      toast({
        title: "Produto criado",
        description: "Produto criado com sucesso!",
      });

      fetchProducts();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar produto",
        description: error.message,
      });
      return false;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Produto removido",
        description: "Produto removido com sucesso!",
      });

      fetchProducts();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao remover produto",
        description: error.message,
      });
      return false;
    }
  };

  useEffect(() => {
    console.log('🔄 [DEBUG] useProducts - useEffect triggered, effectiveUserId:', effectiveUserId);
    fetchProducts();
  }, [effectiveUserId]);

  return {
    products,
    isLoading,
    createProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
