
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

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', effectiveUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar produtos",
        description: error.message,
      });
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
