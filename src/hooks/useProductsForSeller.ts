
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
      // Primeira tentativa: busca direta com RLS
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', adminUserId)
        .order('name', { ascending: true });

      console.log('📋 [DEBUG] useProductsForSeller - Resultado direto:', { data, error, adminUserId });

      if (error) {
        console.error('❌ [DEBUG] useProductsForSeller - Erro na busca direta:', error);
        
        // Fallback: tenta buscar todos os produtos e filtrar localmente
        console.log('🔄 [DEBUG] useProductsForSeller - Tentando fallback...');
        const { data: allProducts, error: allError } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });
          
        console.log('📋 [DEBUG] useProductsForSeller - Resultado fallback:', { allProducts, allError });
          
        if (!allError && allProducts) {
          const filteredProducts = allProducts.filter(p => p.user_id === adminUserId);
          console.log('📋 [DEBUG] useProductsForSeller - Produtos filtrados:', filteredProducts);
          setProducts(filteredProducts);
        } else {
          console.error('❌ [DEBUG] useProductsForSeller - Erro no fallback:', allError);
          
          // Último recurso: tentar buscar sem filtro e sem autenticação
          console.log('🔄 [DEBUG] useProductsForSeller - Último recurso - busca sem autenticação...');
          const { data: publicProducts, error: publicError } = await supabase
            .from('products')
            .select('*');
            
          console.log('📋 [DEBUG] useProductsForSeller - Produtos públicos:', { publicProducts, publicError });
          
          if (!publicError && publicProducts) {
            const userProducts = publicProducts.filter(p => p.user_id === adminUserId);
            console.log('📋 [DEBUG] useProductsForSeller - Produtos do usuário filtrados:', userProducts);
            setProducts(userProducts);
          } else {
            throw error;
          }
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
