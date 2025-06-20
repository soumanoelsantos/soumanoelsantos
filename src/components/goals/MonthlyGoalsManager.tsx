import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, DollarSign, Edit, Clock } from 'lucide-react';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { useProducts } from '@/hooks/useProducts';
import { CreateGoalData, MonthlyGoal } from '@/types/goals';
import EditMonthlyGoalDialog from './EditMonthlyGoalDialog';

const MonthlyGoalsManager = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const { goals, isLoading, createGoal, deleteGoal, updateGoal } = useMonthlyGoals(selectedMonth, selectedYear);
  const { products } = useProducts();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingGoal, setEditingGoal] = useState<MonthlyGoal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<CreateGoalData>({
    month: selectedMonth,
    year: selectedYear,
    goal_type: 'meta',
    target_type: 'financial',
    financial_category: 'faturamento',
    currency: 'BRL',
    target_value: 0,
  });

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
    { value: 12, label: 'Dezembro' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() + i - 2);

  const isGoalTimeless = (goal: MonthlyGoal) => {
    return goal.product_id && goal.target_type === 'quantity';
  };

  const getGoalPeriodDisplay = (goal: MonthlyGoal) => {
    if (isGoalTimeless(goal)) {
      return "Meta Atemporal";
    }
    
    const monthName = months.find(m => m.value === goal.month)?.label || goal.month;
    return `${monthName}/${goal.year}`;
  };

  const handleCreateGoal = async () => {
    console.log('🎯 [DEBUG] Iniciando criação de meta');
    console.log('🎯 [DEBUG] Dados da nova meta:', newGoal);
    
    if (!newGoal.target_value || newGoal.target_value <= 0) {
      console.log('❌ [DEBUG] Valor da meta inválido:', newGoal.target_value);
      return;
    }

    console.log('🎯 [DEBUG] Chamando createGoal...');
    const success = await createGoal({
      ...newGoal,
      month: selectedMonth,
      year: selectedYear,
    });
    
    console.log('🎯 [DEBUG] Resultado da criação:', success);
    
    if (success) {
      console.log('✅ [DEBUG] Meta criada com sucesso, resetando formulário');
      setNewGoal({
        month: selectedMonth,
        year: selectedYear,
        goal_type: 'meta',
        target_type: 'financial',
        financial_category: 'faturamento',
        currency: 'BRL',
        target_value: 0,
      });
      setIsCreating(false);
    } else {
      console.log('❌ [DEBUG] Falha na criação da meta');
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (confirm('Tem certeza que deseja remover esta meta?')) {
      await deleteGoal(goalId);
    }
  };

  const handleEditGoal = (goal: MonthlyGoal) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };

  const handleSaveEditGoal = async (goalId: string, updates: Partial<MonthlyGoal>) => {
    const success = await updateGoal(goalId, updates);
    if (success) {
      setEditingGoal(null);
      setIsEditDialogOpen(false);
    }
  };

  const formatCurrency = (value: number, currency: string = 'BRL') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatGoalType = (type: string) => {
    return type === 'meta' ? 'Meta' : 'Super Meta';
  };

  const formatTargetType = (type: string, financialCategory?: string) => {
    if (type === 'financial' && financialCategory) {
      return financialCategory === 'faturamento' ? 'Faturamento' : 'Receita';
    }
    return type === 'financial' ? 'Financeiro' : 'Quantidade';
  };

  const getCurrencyIcon = (currency: string = 'BRL') => {
    return currency === 'USD' ? '$' : 'R$';
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Metas Mensais</CardTitle>
          <CardDescription>
            Defina e acompanhe suas metas mensais gerais e por produto com diferentes moedas. 
            Metas de quantidade por produto são atemporais e ficam ativas até serem concluídas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Seletor de mês e ano */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Mês</Label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Ano</Label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de metas */}
          <div className="space-y-2">
            {isLoading ? (
              <p className="text-gray-500">Carregando metas...</p>
            ) : goals.length === 0 ? (
              <p className="text-gray-500">Nenhuma meta definida para este período</p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formatGoalType(goal.goal_type)}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">
                        {formatTargetType(goal.target_type, goal.financial_category)}
                      </span>
                      {goal.currency && goal.target_type === 'financial' && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {goal.currency}
                          </span>
                        </>
                      )}
                      {goal.product && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm font-medium text-blue-600">{goal.product.name}</span>
                        </>
                      )}
                      {isGoalTimeless(goal) && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Atemporal
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-lg font-bold">
                      {goal.target_type === 'financial' 
                        ? formatCurrency(goal.target_value, goal.currency)
                        : `${goal.target_value} unidades`
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      Atual: {goal.target_type === 'financial' 
                        ? formatCurrency(goal.current_value, goal.currency)
                        : `${goal.current_value} unidades`
                      }
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getGoalPeriodDisplay(goal)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditGoal(goal)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Formulário para criar meta */}
          {isCreating ? (
            <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Meta</Label>
                  <Select 
                    value={newGoal.goal_type} 
                    onValueChange={(value: 'meta' | 'supermeta') => {
                      console.log('🎯 [DEBUG] Alterando tipo de meta para:', value);
                      setNewGoal(prev => ({ ...prev, goal_type: value }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meta">Meta</SelectItem>
                      <SelectItem value="supermeta">Super Meta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo de Alvo</Label>
                  <Select 
                    value={newGoal.target_type} 
                    onValueChange={(value: 'financial' | 'quantity') => {
                      console.log('🎯 [DEBUG] Alterando tipo de alvo para:', value);
                      setNewGoal(prev => ({ ...prev, target_type: value }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financeiro</SelectItem>
                      <SelectItem value="quantity">Quantidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newGoal.target_type === 'financial' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Categoria Financeira</Label>
                    <Select 
                      value={newGoal.financial_category || 'faturamento'} 
                      onValueChange={(value: 'faturamento' | 'receita') => {
                        console.log('🎯 [DEBUG] Alterando categoria financeira para:', value);
                        setNewGoal(prev => ({ ...prev, financial_category: value }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="faturamento">Faturamento</SelectItem>
                        <SelectItem value="receita">Receita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Moeda</Label>
                    <Select 
                      value={newGoal.currency || 'BRL'} 
                      onValueChange={(value: 'BRL' | 'USD') => {
                        console.log('🎯 [DEBUG] Alterando moeda para:', value);
                        setNewGoal(prev => ({ ...prev, currency: value }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                        <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div>
                <Label>Produto (opcional)</Label>
                <Select 
                  value={newGoal.product_id || 'general'} 
                  onValueChange={(value) => {
                    console.log('🎯 [DEBUG] Alterando produto para:', value);
                    setNewGoal(prev => ({ 
                      ...prev, 
                      product_id: value === 'general' ? undefined : value 
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Meta Geral</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newGoal.product_id && newGoal.target_type === 'quantity' && (
                  <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Esta será uma meta atemporal - ficará ativa até ser concluída
                  </p>
                )}
              </div>

              <div>
                <Label>
                  Valor da Meta {newGoal.target_type === 'financial' 
                    ? `(${getCurrencyIcon(newGoal.currency)})` 
                    : '(Quantidade)'
                  }
                </Label>
                <Input
                  type="number"
                  value={newGoal.target_value}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    console.log('🎯 [DEBUG] Alterando valor da meta para:', value);
                    setNewGoal(prev => ({ 
                      ...prev, 
                      target_value: value
                    }));
                  }}
                  placeholder={newGoal.target_type === 'financial' ? '0,00' : '0'}
                  min="0"
                  step={newGoal.target_type === 'financial' ? '0.01' : '1'}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateGoal} 
                  disabled={newGoal.target_value <= 0}
                  className="flex-1"
                >
                  Criar Meta
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsCreating(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Meta
            </Button>
          )}
        </CardContent>
      </Card>

      <EditMonthlyGoalDialog
        goal={editingGoal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEditGoal}
      />
    </>
  );
};

export default MonthlyGoalsManager;
