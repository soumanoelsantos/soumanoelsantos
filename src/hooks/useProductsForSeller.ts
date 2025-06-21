
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/goals';

export const useProductsForSeller = (adminUserId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    if (!adminUserId) {
      console.log('⚠️ [DEBUG] useProductsForSeller - Sem adminUserId fornecido');
      setProducts([]);
      return;
    }

    console.log('🔍 [DEBUG] useProductsForSeller - Buscando produtos para admin:', adminUserId);
    setIsLoading(true);
    
    try {
      // Busca direta sem RLS - usando service role se necessário
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', adminUserId)
        .order('name', { ascending: true });

      console.log('📋 [DEBUG] useProductsForSeller - Resultado:', { data, error, adminUserId });

      if (error) {
        console.error('❌ [DEBUG] useProductsForSeller - Erro:', error);
        
        // Fallback: tenta buscar todos os produtos e filtrar
        const { data: allProducts, error: allError } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });
          
        if (!allError && allProducts) {
          const filteredProducts = allProducts.filter(p => p.user_id === adminUserId);
          console.log('📋 [DEBUG] useProductsForSeller - Produtos filtrados:', filteredProducts);
          setProducts(filteredProducts);
        } else {
          throw error;
        }
      } else {
        console.log('✅ [DEBUG] useProductsForSeller - Produtos encontrados:', data?.length || 0);
        setProducts(data || []);
      }
    } catch (error: any) {
      console.error('💥 [DEBUG] useProductsForSeller - Erro final:', error);
      toast({
        title: "Aviso",
        description: "Não foi possível carregar a lista de produtos",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 [DEBUG] useProductsForSeller - useEffect, adminUserId:', adminUserId);
    fetchProducts();
  }, [adminUserId]);

  return {
    products,
    isLoading,
    refetch: fetchProducts,
  };
};
