
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useProductGoals, type CreateProductGoalData } from '@/hooks/useProductGoals';
import { ProductGoalSelector } from './product-goals/ProductGoalSelector';
import { ProductGoalMetrics } from './product-goals/ProductGoalMetrics';
import { ProductGoalsList } from './product-goals/ProductGoalsList';
import { EmptyProductsState } from './product-goals/EmptyProductsState';

const ProductGoalsConfigCard: React.FC = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { 
    productGoals, 
    isLoading: goalsLoading, 
    createProductGoal, 
    updateProductGoal, 
    deleteProductGoal,
    toggleGoalStatus 
  } = useProductGoals();
  
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [editingGoal, setEditingGoal] = useState<any>(null);
  
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

  const handleSaveGoal = async () => {
    if (!selectedProduct) {
      return;
    }

    const goalData: CreateProductGoalData = {
      product_id: selectedProduct,
      quantity_goal: quantityGoal,
      revenue_goal: revenueGoal,
      billing_goal: billingGoal,
      currency,
    };

    let success = false;

    if (editingGoal) {
      // Editando meta existente
      success = await updateProductGoal(editingGoal.id, goalData);
    } else {
      // Criando nova meta
      success = await createProductGoal(goalData);
    }

    if (success) {
      resetForm();
    }
  };

  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
    setSelectedProduct(goal.product_id);
    setQuantityGoal(goal.quantity_goal);
    setRevenueGoal(goal.revenue_goal);
    setBillingGoal(goal.billing_goal);
    setCurrency(goal.currency);
  };

  const handleDeleteGoal = async (goalId: string) => {
    await deleteProductGoal(goalId);
  };

  const handleToggleStatus = async (goalId: string, isActive: boolean) => {
    await toggleGoalStatus(goalId, isActive);
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

  // Verificar se já existe uma meta para o produto selecionado
  const existingGoal = productGoals.find(goal => goal.product_id === selectedProduct);
  const canCreateGoal = selectedProduct && !existingGoal && !editingGoal;

  if (productsLoading || goalsLoading) {
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
                canCreateGoal={canCreateGoal}
                existingGoal={existingGoal}
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
              onToggleStatus={handleToggleStatus}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGoalsConfigCard;
