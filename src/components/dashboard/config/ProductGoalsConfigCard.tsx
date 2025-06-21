
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useSellers } from '@/hooks/useSellers';
import { useToast } from '@/hooks/use-toast';
import { ProductGoalSelector } from './product-goals/ProductGoalSelector';
import { ProductGoalStatus } from './product-goals/ProductGoalStatus';
import { ProductGoalMetrics } from './product-goals/ProductGoalMetrics';
import { SellerDistribution } from './product-goals/SellerDistribution';
import { EmptyProductsState } from './product-goals/EmptyProductsState';

interface ProductGoal {
  id: string;
  productId: string;
  quantityGoal: number;
  quantitySold: number;
  revenueGoal: number;
  revenueAchieved: number;
  billingGoal: number;
  billingAchieved: number;
  isActive: boolean;
  sellerDistribution: Array<{
    sellerId: string;
    quantityGoal: number;
    quantitySold: number;
    revenueGoal: number;
    revenueAchieved: number;
    billingGoal: number;
    billingAchieved: number;
  }>;
}

const ProductGoalsConfigCard: React.FC = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { sellers, isLoading: sellersLoading } = useSellers();
  const { toast } = useToast();
  
  const [productGoals, setProductGoals] = useState<ProductGoal[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const currentGoal = productGoals.find(g => g.productId === selectedProduct);

  const handleCreateOrUpdateGoal = () => {
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um produto primeiro"
      });
      return;
    }

    const goalId = currentGoal?.id || `goal-${selectedProduct}`;
    
    const newGoal: ProductGoal = {
      id: goalId,
      productId: selectedProduct,
      quantityGoal: currentGoal?.quantityGoal || 0,
      quantitySold: currentGoal?.quantitySold || 0,
      revenueGoal: currentGoal?.revenueGoal || 0,
      revenueAchieved: currentGoal?.revenueAchieved || 0,
      billingGoal: currentGoal?.billingGoal || 0,
      billingAchieved: currentGoal?.billingAchieved || 0,
      isActive: true,
      sellerDistribution: currentGoal?.sellerDistribution || []
    };

    setProductGoals(prev => {
      const filtered = prev.filter(g => g.id !== goalId);
      return [...filtered, newGoal];
    });

    toast({
      title: "Sucesso",
      description: `Meta do produto ${currentGoal ? 'atualizada' : 'criada'} com sucesso!`
    });
  };

  const updateGoalValue = (field: keyof ProductGoal, value: any) => {
    if (!currentGoal) return;
    
    setProductGoals(prev => prev.map(goal => 
      goal.id === currentGoal.id 
        ? { ...goal, [field]: value }
        : goal
    ));
  };

  const toggleGoalStatus = () => {
    if (!currentGoal) return;
    
    const newStatus = !currentGoal.isActive;
    updateGoalValue('isActive', newStatus);
    
    toast({
      title: newStatus ? "Meta ativada" : "Meta desativada",
      description: `A meta do produto foi ${newStatus ? 'ativada' : 'desativada'}.`
    });
  };

  const addSellerToDistribution = () => {
    if (!currentGoal) return;
    
    const newDistribution = {
      sellerId: '',
      quantityGoal: 0,
      quantitySold: 0,
      revenueGoal: 0,
      revenueAchieved: 0,
      billingGoal: 0,
      billingAchieved: 0
    };

    updateGoalValue('sellerDistribution', [...currentGoal.sellerDistribution, newDistribution]);
  };

  const updateSellerDistribution = (index: number, field: string, value: any) => {
    if (!currentGoal) return;
    
    const newDistribution = [...currentGoal.sellerDistribution];
    newDistribution[index] = { ...newDistribution[index], [field]: value };
    updateGoalValue('sellerDistribution', newDistribution);
  };

  const removeSellerFromDistribution = (index: number) => {
    if (!currentGoal) return;
    
    const newDistribution = currentGoal.sellerDistribution.filter((_, i) => i !== index);
    updateGoalValue('sellerDistribution', newDistribution);
  };

  const handleMetricUpdate = (field: string, value: number) => {
    updateGoalValue(field as keyof ProductGoal, value);
  };

  if (productsLoading || sellersLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2">Carregando...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Metas dos Produtos
        </CardTitle>
        <CardDescription>
          Configure metas totais para cada produto. As metas ficam ativas até serem completamente atingidas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProductGoalSelector
          products={products}
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
          onCreateOrUpdate={handleCreateOrUpdateGoal}
          hasCurrentGoal={!!currentGoal}
        />

        {currentGoal && (
          <ProductGoalStatus
            isActive={currentGoal.isActive}
            onToggleStatus={toggleGoalStatus}
          />
        )}

        {currentGoal && (
          <Tabs defaultValue="metas" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metas">Metas Totais</TabsTrigger>
              <TabsTrigger value="distribuicao">Distribuição por Vendedor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metas" className="space-y-4">
              <ProductGoalMetrics
                quantityGoal={currentGoal.quantityGoal}
                quantitySold={currentGoal.quantitySold}
                revenueGoal={currentGoal.revenueGoal}
                revenueAchieved={currentGoal.revenueAchieved}
                billingGoal={currentGoal.billingGoal}
                billingAchieved={currentGoal.billingAchieved}
                onUpdateField={handleMetricUpdate}
              />
            </TabsContent>
            
            <TabsContent value="distribuicao" className="space-y-4">
              <SellerDistribution
                sellers={sellers}
                sellerDistribution={currentGoal.sellerDistribution}
                onAddSeller={addSellerToDistribution}
                onUpdateSeller={updateSellerDistribution}
                onRemoveSeller={removeSellerFromDistribution}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {products.length === 0 && <EmptyProductsState />}
      </CardContent>
    </Card>
  );
};

export default ProductGoalsConfigCard;
