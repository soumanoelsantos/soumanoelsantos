
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { useProducts } from '@/hooks/useProducts';
import { CreateGoalData } from '@/types/goals';

const MonthlyGoalsManager = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const { goals, isLoading, createGoal, deleteGoal, updateGoal } = useMonthlyGoals(selectedMonth, selectedYear);
  const { products } = useProducts();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState<CreateGoalData>({
    month: selectedMonth,
    year: selectedYear,
    goal_type: 'meta',
    target_type: 'financial',
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

  const handleCreateGoal = async () => {
    if (newGoal.target_value <= 0) return;

    const success = await createGoal({
      ...newGoal,
      month: selectedMonth,
      year: selectedYear,
    });
    
    if (success) {
      setNewGoal({
        month: selectedMonth,
        year: selectedYear,
        goal_type: 'meta',
        target_type: 'financial',
        target_value: 0,
      });
      setIsCreating(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (confirm('Tem certeza que deseja remover esta meta?')) {
      await deleteGoal(goalId);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatGoalType = (type: string) => {
    return type === 'meta' ? 'Meta' : 'Super Meta';
  };

  const formatTargetType = (type: string) => {
    return type === 'financial' ? 'Financeiro' : 'Quantidade';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metas Mensais</CardTitle>
        <CardDescription>
          Defina e acompanhe suas metas mensais gerais e por produto
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
                    <span className="text-sm text-gray-600">{formatTargetType(goal.target_type)}</span>
                    {goal.product && (
                      <>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-blue-600">{goal.product.name}</span>
                      </>
                    )}
                  </div>
                  <div className="text-lg font-bold">
                    {goal.target_type === 'financial' 
                      ? formatCurrency(goal.target_value)
                      : `${goal.target_value} unidades`
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    Atual: {goal.target_type === 'financial' 
                      ? formatCurrency(goal.current_value)
                      : `${goal.current_value} unidades`
                    }
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
                  onValueChange={(value: 'meta' | 'supermeta') => 
                    setNewGoal(prev => ({ ...prev, goal_type: value }))
                  }
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
                  onValueChange={(value: 'financial' | 'quantity') => 
                    setNewGoal(prev => ({ ...prev, target_type: value }))
                  }
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

            <div>
              <Label>Produto (opcional)</Label>
              <Select 
                value={newGoal.product_id || 'general'} 
                onValueChange={(value) => 
                  setNewGoal(prev => ({ 
                    ...prev, 
                    product_id: value === 'general' ? undefined : value 
                  }))
                }
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
            </div>

            <div>
              <Label>
                Valor da Meta {newGoal.target_type === 'financial' ? '(R$)' : '(Quantidade)'}
              </Label>
              <Input
                type="number"
                value={newGoal.target_value}
                onChange={(e) => setNewGoal(prev => ({ 
                  ...prev, 
                  target_value: parseFloat(e.target.value) || 0 
                }))}
                placeholder={newGoal.target_type === 'financial' ? '0,00' : '0'}
                min="0"
                step={newGoal.target_type === 'financial' ? '0.01' : '1'}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateGoal} disabled={newGoal.target_value <= 0}>
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
  );
};

export default MonthlyGoalsManager;
