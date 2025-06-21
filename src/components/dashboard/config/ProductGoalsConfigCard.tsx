
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { ProductGoalSelector } from './product-goals/ProductGoalSelector';
import { ProductGoalMetrics } from './product-goals/ProductGoalMetrics';
import { ProductGoalsList } from './product-goals/ProductGoalsList';
import { EmptyProductsState } from './product-goals/EmptyProductsState';

interface ProductGoal {
  id: string;
  productId: string;
  productName: string;
  quantityGoal: number;
  revenueGoal: number;
  billingGoal: number;
  currency: 'BRL' | 'USD';
  isActive: boolean;
}

const ProductGoalsConfigCard: React.FC = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { toast } = useToast();
  
  const [productGoals, setProductGoals] = useState<ProductGoal[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [editingGoal, setEditingGoal] = useState<ProductGoal | null>(null);
  
  // Estados para o formulário
  const [quantityGoal, setQuantityGoal] = useState(0);
  const [revenueGoal, setRevenueGoal] = useState(0);
  const [billingGoal, setBillingGoal] = useState(0);
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');

  const resetForm = () => {
    setSelectedProduct('');
    setQuantityGoal(0);
    setRevenueGoal(0);
    setBillingGoal(0);
    setCurrency('BRL');
    setEditingGoal(null);
  };

  const handleSaveGoal = () => {
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um produto primeiro"
      });
      return;
    }

    const selectedProductData = products.find(p => p.id === selectedProduct);
    if (!selectedProductData) return;

    const goalData: ProductGoal = {
      id: editingGoal?.id || `goal-${selectedProduct}-${Date.now()}`,
      productId: selectedProduct,
      productName: selectedProductData.name,
      quantityGoal,
      revenueGoal,
      billingGoal,
      currency,
      isActive: true
    };

    if (editingGoal) {
      // Editando meta existente
      setProductGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id ? goalData : goal
      ));
      toast({
        title: "Meta atualizada",
        description: "Meta do produto atualizada com sucesso!"
      });
    } else {
      // Criando nova meta
      const existingGoal = productGoals.find(g => g.productId === selectedProduct);
      if (existingGoal) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Já existe uma meta para este produto. Edite a meta existente."
        });
        return;
      }
      
      setProductGoals(prev => [...prev, goalData]);
      toast({
        title: "Meta criada",
        description: "Meta do produto criada com sucesso!"
      });
    }

    resetForm();
  };

  const handleEditGoal = (goal: ProductGoal) => {
    setEditingGoal(goal);
    setSelectedProduct(goal.productId);
    setQuantityGoal(goal.quantityGoal);
    setRevenueGoal(goal.revenueGoal);
    setBillingGoal(goal.billingGoal);
    setCurrency(goal.currency);
  };

  const handleDeleteGoal = (goalId: string) => {
    setProductGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast({
      title: "Meta removida",
      description: "Meta do produto removida com sucesso!"
    });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleMetricUpdate = (field: string, value: number | string) => {
    switch (field) {
      case 'quantityGoal':
        setQuantityGoal(value as number);
        break;
      case 'revenueGoal':
        setRevenueGoal(value as number);
        break;
      case 'billingGoal':
        setBillingGoal(value as number);
        break;
      case 'currency':
        setCurrency(value as 'BRL' | 'USD');
        break;
    }
  };

  if (productsLoading) {
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
          Configure metas de quantidade, receita e faturamento para cada produto.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {products.length === 0 ? (
          <EmptyProductsState />
        ) : (
          <>
            {/* Formulário de criação/edição */}
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  {editingGoal ? 'Editar Meta' : 'Nova Meta'}
                </h4>
                {editingGoal && (
                  <Button onClick={handleCancelEdit} variant="outline" size="sm">
                    Cancelar
                  </Button>
                )}
              </div>

              <ProductGoalSelector
                products={products}
                selectedProduct={selectedProduct}
                onProductChange={setSelectedProduct}
                onCreateOrUpdate={handleSaveGoal}
                hasCurrentGoal={!!editingGoal}
              />

              {selectedProduct && (
                <ProductGoalMetrics
                  quantityGoal={quantityGoal}
                  revenueGoal={revenueGoal}
                  billingGoal={billingGoal}
                  currency={currency}
                  onUpdateField={handleMetricUpdate}
                />
              )}
            </div>

            {/* Lista de metas criadas */}
            <ProductGoalsList
              goals={productGoals}
              onEditGoal={handleEditGoal}
              onDeleteGoal={handleDeleteGoal}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGoalsConfigCard;
