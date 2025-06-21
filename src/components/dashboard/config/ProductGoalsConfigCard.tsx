
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Plus, Trash2, Users, CheckCircle, Clock } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useSellers } from '@/hooks/useSellers';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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

  const getProgressPercentage = (achieved: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((achieved / goal) * 100, 100);
  };

  const isGoalCompleted = (achieved: number, goal: number) => {
    return achieved >= goal && goal > 0;
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
        {/* Seleção de Produto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button onClick={handleCreateOrUpdateGoal} className="w-full">
              {currentGoal ? 'Atualizar' : 'Criar'} Meta
            </Button>
          </div>
        </div>

        {/* Status da Meta */}
        {currentGoal && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {currentGoal.isActive ? (
                <Clock className="h-5 w-5 text-blue-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-gray-400" />
              )}
              <span className="font-medium">
                Status da Meta: 
              </span>
              <Badge variant={currentGoal.isActive ? "default" : "secondary"}>
                {currentGoal.isActive ? "Ativa" : "Inativa"}
              </Badge>
            </div>
            <Button 
              onClick={toggleGoalStatus}
              variant={currentGoal.isActive ? "outline" : "default"}
              size="sm"
            >
              {currentGoal.isActive ? "Desativar" : "Ativar"}
            </Button>
          </div>
        )}

        {currentGoal && (
          <Tabs defaultValue="metas" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metas">Metas Totais</TabsTrigger>
              <TabsTrigger value="distribuicao">Distribuição por Vendedor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metas" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meta de Quantidade */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Meta de Quantidade</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Total</Label>
                      <Input
                        type="number"
                        min="0"
                        value={currentGoal.quantityGoal}
                        onChange={(e) => updateGoalValue('quantityGoal', parseInt(e.target.value) || 0)}
                        placeholder="Ex: 100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Vendido</Label>
                      <Input
                        type="number"
                        min="0"
                        max={currentGoal.quantityGoal}
                        value={currentGoal.quantitySold}
                        onChange={(e) => updateGoalValue('quantitySold', parseInt(e.target.value) || 0)}
                        placeholder="Ex: 25"
                      />
                    </div>
                  </div>
                  {currentGoal.quantityGoal > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso:</span>
                        <span>{getProgressPercentage(currentGoal.quantitySold, currentGoal.quantityGoal).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isGoalCompleted(currentGoal.quantitySold, currentGoal.quantityGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${getProgressPercentage(currentGoal.quantitySold, currentGoal.quantityGoal)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta de Receita */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Meta de Receita</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Total (R$)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentGoal.revenueGoal}
                        onChange={(e) => updateGoalValue('revenueGoal', parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 50000.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Conquistado (R$)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        max={currentGoal.revenueGoal}
                        value={currentGoal.revenueAchieved}
                        onChange={(e) => updateGoalValue('revenueAchieved', parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 12500.00"
                      />
                    </div>
                  </div>
                  {currentGoal.revenueGoal > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso:</span>
                        <span>{getProgressPercentage(currentGoal.revenueAchieved, currentGoal.revenueGoal).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isGoalCompleted(currentGoal.revenueAchieved, currentGoal.revenueGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${getProgressPercentage(currentGoal.revenueAchieved, currentGoal.revenueGoal)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta de Faturamento */}
                <div className="space-y-4 p-4 border rounded-lg md:col-span-2">
                  <h4 className="font-medium">Meta de Faturamento</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Total (R$)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentGoal.billingGoal}
                        onChange={(e) => updateGoalValue('billingGoal', parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 150000.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Faturado (R$)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        max={currentGoal.billingGoal}
                        value={currentGoal.billingAchieved}
                        onChange={(e) => updateGoalValue('billingAchieved', parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 37500.00"
                      />
                    </div>
                  </div>
                  {currentGoal.billingGoal > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso:</span>
                        <span>{getProgressPercentage(currentGoal.billingAchieved, currentGoal.billingGoal).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isGoalCompleted(currentGoal.billingAchieved, currentGoal.billingGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${getProgressPercentage(currentGoal.billingAchieved, currentGoal.billingGoal)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="distribuicao" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Distribuição por Vendedor</h4>
                <Button 
                  onClick={addSellerToDistribution}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Vendedor
                </Button>
              </div>
              
              {currentGoal.sellerDistribution.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>Nenhum vendedor adicionado</p>
                  <p className="text-sm">Clique em "Adicionar Vendedor" para distribuir as metas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentGoal.sellerDistribution.map((distribution, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Vendedor {index + 1}</h5>
                        <Button
                          onClick={() => removeSellerFromDistribution(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2 md:col-span-4">
                          <Label>Vendedor</Label>
                          <Select 
                            value={distribution.sellerId} 
                            onValueChange={(value) => updateSellerDistribution(index, 'sellerId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um vendedor" />
                            </SelectTrigger>
                            <SelectContent>
                              {sellers.map(seller => (
                                <SelectItem key={seller.id} value={seller.id}>
                                  {seller.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Meta Quantidade</Label>
                          <Input
                            type="number"
                            min="0"
                            value={distribution.quantityGoal}
                            onChange={(e) => updateSellerDistribution(index, 'quantityGoal', parseInt(e.target.value) || 0)}
                            placeholder="Meta"
                          />
                          <Input
                            type="number"
                            min="0"
                            max={distribution.quantityGoal}
                            value={distribution.quantitySold}
                            onChange={(e) => updateSellerDistribution(index, 'quantitySold', parseInt(e.target.value) || 0)}
                            placeholder="Vendido"
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Meta Receita (R$)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={distribution.revenueGoal}
                            onChange={(e) => updateSellerDistribution(index, 'revenueGoal', parseFloat(e.target.value) || 0)}
                            placeholder="Meta"
                          />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            max={distribution.revenueGoal}
                            value={distribution.revenueAchieved}
                            onChange={(e) => updateSellerDistribution(index, 'revenueAchieved', parseFloat(e.target.value) || 0)}
                            placeholder="Conquistado"
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Meta Faturamento (R$)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={distribution.billingGoal}
                            onChange={(e) => updateSellerDistribution(index, 'billingGoal', parseFloat(e.target.value) || 0)}
                            placeholder="Meta"
                          />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            max={distribution.billingGoal}
                            value={distribution.billingAchieved}
                            onChange={(e) => updateSellerDistribution(index, 'billingAchieved', parseFloat(e.target.value) || 0)}
                            placeholder="Faturado"
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Progresso</Label>
                          <div className="space-y-1">
                            {distribution.quantityGoal > 0 && (
                              <div className="text-xs">
                                Qtd: {getProgressPercentage(distribution.quantitySold, distribution.quantityGoal).toFixed(0)}%
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-blue-500 h-1 rounded-full"
                                    style={{ width: `${getProgressPercentage(distribution.quantitySold, distribution.quantityGoal)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            {distribution.revenueGoal > 0 && (
                              <div className="text-xs">
                                Rec: {getProgressPercentage(distribution.revenueAchieved, distribution.revenueGoal).toFixed(0)}%
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-green-500 h-1 rounded-full"
                                    style={{ width: `${getProgressPercentage(distribution.revenueAchieved, distribution.revenueGoal)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            {distribution.billingGoal > 0 && (
                              <div className="text-xs">
                                Fat: {getProgressPercentage(distribution.billingAchieved, distribution.billingGoal).toFixed(0)}%
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-purple-500 h-1 rounded-full"
                                    style={{ width: `${getProgressPercentage(distribution.billingAchieved, distribution.billingGoal)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        
        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Target className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>Nenhum produto encontrado</p>
            <p className="text-sm">
              <a href="/dashboard/configurar" className="text-blue-600 hover:underline">
                Criar produtos primeiro
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGoalsConfigCard;
