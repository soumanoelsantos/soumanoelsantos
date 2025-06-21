
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Plus, Trash2, Users } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useSellers } from '@/hooks/useSellers';
import { useToast } from '@/hooks/use-toast';

interface ProductGoal {
  id: string;
  productId: string;
  month: number;
  year: number;
  quantityGoal: number;
  revenueGoal: number;
  billingGoal: number;
  sellerDistribution: Array<{
    sellerId: string;
    quantityGoal: number;
    revenueGoal: number;
    billingGoal: number;
  }>;
}

const ProductGoalsConfigCard: React.FC = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { sellers, isLoading: sellersLoading } = useSellers();
  const { toast } = useToast();
  
  const [productGoals, setProductGoals] = useState<ProductGoal[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const currentGoal = productGoals.find(g => 
    g.productId === selectedProduct && 
    g.month === selectedMonth && 
    g.year === selectedYear
  );

  const handleCreateOrUpdateGoal = () => {
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um produto primeiro"
      });
      return;
    }

    const goalId = currentGoal?.id || `${selectedProduct}-${selectedMonth}-${selectedYear}`;
    
    const newGoal: ProductGoal = {
      id: goalId,
      productId: selectedProduct,
      month: selectedMonth,
      year: selectedYear,
      quantityGoal: currentGoal?.quantityGoal || 0,
      revenueGoal: currentGoal?.revenueGoal || 0,
      billingGoal: currentGoal?.billingGoal || 0,
      sellerDistribution: currentGoal?.sellerDistribution || []
    };

    setProductGoals(prev => {
      const filtered = prev.filter(g => g.id !== goalId);
      return [...filtered, newGoal];
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

  const addSellerToDistribution = () => {
    if (!currentGoal) return;
    
    const newDistribution = {
      sellerId: '',
      quantityGoal: 0,
      revenueGoal: 0,
      billingGoal: 0
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

  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i - 2);

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
          Configure metas de vendas, receita e faturamento para cada produto e distribua entre os vendedores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seleção de Produto e Período */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          
          <div className="space-y-2">
            <Label>Mês</Label>
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Ano</Label>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
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

        {currentGoal && (
          <Tabs defaultValue="metas" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metas">Metas Gerais</TabsTrigger>
              <TabsTrigger value="distribuicao">Distribuição por Vendedor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metas" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Meta de Quantidade</Label>
                  <Input
                    type="number"
                    min="0"
                    value={currentGoal.quantityGoal}
                    onChange={(e) => updateGoalValue('quantityGoal', parseInt(e.target.value) || 0)}
                    placeholder="Ex: 50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Meta de Receita (R$)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentGoal.revenueGoal}
                    onChange={(e) => updateGoalValue('revenueGoal', parseFloat(e.target.value) || 0)}
                    placeholder="Ex: 100000.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Meta de Faturamento (R$)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentGoal.billingGoal}
                    onChange={(e) => updateGoalValue('billingGoal', parseFloat(e.target.value) || 0)}
                    placeholder="Ex: 300000.00"
                  />
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
                        <div className="space-y-2">
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
                          />
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
              <a href="/dashboard/metas" className="text-blue-600 hover:underline">
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
