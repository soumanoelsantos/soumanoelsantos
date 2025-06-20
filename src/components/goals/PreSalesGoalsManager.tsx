import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Target, Edit } from 'lucide-react';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { useSellers } from '@/hooks/useSellers';
import { CreatePreSalesGoalData, PreSalesGoal } from '@/types/preSalesGoals';
import EditPreSalesGoalDialog from './EditPreSalesGoalDialog';

const PreSalesGoalsManager = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const { preSalesGoals, isLoading, createPreSalesGoal, updatePreSalesGoal, deletePreSalesGoal } = usePreSalesGoals(selectedMonth, selectedYear);
  const { goalTypes } = useGoalTypes();
  const { sellers } = useSellers();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingGoal, setEditingGoal] = useState<PreSalesGoal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<CreatePreSalesGoalData>({
    goal_type_id: '',
    seller_id: undefined,
    month: selectedMonth,
    year: selectedYear,
    target_value: 0,
  });

  // Filtrar tipos de metas de pré-vendas
  const preSalesGoalTypes = goalTypes.filter(gt => gt.category === 'pre_vendas');

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
    if (!newGoal.goal_type_id || newGoal.target_value <= 0) {
      return;
    }

    const success = await createPreSalesGoal({
      ...newGoal,
      month: selectedMonth,
      year: selectedYear,
    });
    
    if (success) {
      setNewGoal({
        goal_type_id: '',
        seller_id: undefined,
        month: selectedMonth,
        year: selectedYear,
        target_value: 0,
      });
      setIsCreating(false);
    }
  };

  const handleEditGoal = (goal: PreSalesGoal) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: Partial<PreSalesGoal>) => {
    if (!editingGoal) return;
    
    const success = await updatePreSalesGoal(editingGoal.id, data);
    if (success) {
      setEditingGoal(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (confirm('Tem certeza que deseja remover esta meta?')) {
      await deletePreSalesGoal(goalId);
    }
  };

  const getSelectedGoalType = () => {
    return goalTypes.find(gt => gt.id === newGoal.goal_type_id);
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'percentage' || unit === '%') {
      return `${value}%`;
    }
    return `${value} ${unit}`;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Metas de Pré-vendas</CardTitle>
          <CardDescription>
            Defina metas específicas de pré-vendas usando os tipos personalizados criados
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

          {/* Lista de metas com botão de editar */}
          <div className="space-y-2">
            {isLoading ? (
              <p className="text-gray-500">Carregando metas...</p>
            ) : preSalesGoals.length === 0 ? (
              <p className="text-gray-500">Nenhuma meta definida para este período</p>
            ) : (
              preSalesGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{goal.goal_type?.name}</span>
                      {goal.seller ? (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {goal.seller.name}
                        </span>
                      ) : (
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Meta da Empresa
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold">
                      Meta: {formatValue(goal.target_value, goal.goal_type?.unit || '')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Atual: {formatValue(goal.current_value, goal.goal_type?.unit || '')}
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
              <div>
                <Label>Tipo de Meta</Label>
                <Select 
                  value={newGoal.goal_type_id} 
                  onValueChange={(value) => setNewGoal(prev => ({ ...prev, goal_type_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de meta" />
                  </SelectTrigger>
                  <SelectContent>
                    {preSalesGoalTypes.map((goalType) => (
                      <SelectItem key={goalType.id} value={goalType.id}>
                        {goalType.name} ({goalType.target_scope === 'individual' ? 'Individual' : 'Empresa'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {getSelectedGoalType()?.target_scope === 'individual' && (
                <div>
                  <Label>SDR</Label>
                  <Select 
                    value={newGoal.seller_id || ''} 
                    onValueChange={(value) => setNewGoal(prev => ({ 
                      ...prev, 
                      seller_id: value === '' ? undefined : value 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o SDR" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellers.filter(s => s.seller_type === 'sdr').map((seller) => (
                        <SelectItem key={seller.id} value={seller.id}>
                          {seller.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>
                  Valor da Meta {getSelectedGoalType() && `(${getSelectedGoalType()?.unit})`}
                </Label>
                <Input
                  type="number"
                  value={newGoal.target_value}
                  onChange={(e) => setNewGoal(prev => ({ 
                    ...prev, 
                    target_value: parseFloat(e.target.value) || 0
                  }))}
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateGoal} 
                  disabled={!newGoal.goal_type_id || newGoal.target_value <= 0}
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
            <Button onClick={() => setIsCreating(true)} className="w-full" disabled={preSalesGoalTypes.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              {preSalesGoalTypes.length === 0 ? 'Crie tipos de metas primeiro' : 'Adicionar Meta de Pré-vendas'}
            </Button>
          )}
        </CardContent>
      </Card>

      <EditPreSalesGoalDialog
        goal={editingGoal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default PreSalesGoalsManager;
