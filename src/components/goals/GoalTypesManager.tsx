
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { CreateGoalTypeData } from '@/types/preSalesGoals';

const GoalTypesManager = () => {
  const { goalTypes, isLoading, createGoalType, deleteGoalType } = useGoalTypes();
  const [isCreating, setIsCreating] = useState(false);
  const [newGoalType, setNewGoalType] = useState<CreateGoalTypeData>({
    name: '',
    description: '',
    unit: '',
    category: 'pre_vendas',
    target_scope: 'individual',
  });

  const handleCreateGoalType = async () => {
    if (!newGoalType.name || !newGoalType.unit) {
      return;
    }

    const success = await createGoalType(newGoalType);
    if (success) {
      setNewGoalType({
        name: '',
        description: '',
        unit: '',
        category: 'pre_vendas',
        target_scope: 'individual',
      });
      setIsCreating(false);
    }
  };

  const handleDeleteGoalType = async (goalTypeId: string) => {
    if (confirm('Tem certeza que deseja remover este tipo de meta?')) {
      await deleteGoalType(goalTypeId);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'pre_vendas': 'Pré-vendas',
      'vendas': 'Vendas',
      'geral': 'Geral'
    };
    return labels[category] || category;
  };

  const getScopeLabel = (scope: string) => {
    return scope === 'individual' ? 'Individual (por SDR)' : 'Empresa (geral)';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Metas</CardTitle>
        <CardDescription>
          Crie tipos de metas personalizados que poderão ser utilizados para definir metas específicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista de tipos de metas */}
        <div className="space-y-2">
          {isLoading ? (
            <p className="text-gray-500">Carregando tipos de metas...</p>
          ) : goalTypes.length === 0 ? (
            <p className="text-gray-500">Nenhum tipo de meta criado ainda</p>
          ) : (
            goalTypes.map((goalType) => (
              <div key={goalType.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{goalType.name}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {getCategoryLabel(goalType.category)}
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {getScopeLabel(goalType.target_scope)}
                    </span>
                  </div>
                  {goalType.description && (
                    <p className="text-sm text-gray-600 mt-1">{goalType.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Unidade: {goalType.unit}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteGoalType(goalType.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Formulário para criar tipo de meta */}
        {isCreating ? (
          <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label>Nome do Tipo de Meta</Label>
              <Input
                value={newGoalType.name}
                onChange={(e) => setNewGoalType(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Tentativas de Ligação por SDR"
              />
            </div>

            <div>
              <Label>Descrição (opcional)</Label>
              <Textarea
                value={newGoalType.description}
                onChange={(e) => setNewGoalType(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva como essa meta será utilizada"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria</Label>
                <Select 
                  value={newGoalType.category} 
                  onValueChange={(value) => setNewGoalType(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre_vendas">Pré-vendas</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="geral">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Escopo</Label>
                <Select 
                  value={newGoalType.target_scope} 
                  onValueChange={(value: 'individual' | 'empresa') => setNewGoalType(prev => ({ ...prev, target_scope: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual (por SDR)</SelectItem>
                    <SelectItem value="empresa">Empresa (geral)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Unidade de Medida</Label>
              <Input
                value={newGoalType.unit}
                onChange={(e) => setNewGoalType(prev => ({ ...prev, unit: e.target.value }))}
                placeholder="Ex: tentativas, agendamentos, %, calls"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleCreateGoalType} 
                disabled={!newGoalType.name || !newGoalType.unit}
                className="flex-1"
              >
                Criar Tipo de Meta
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsCreating(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Tipo de Meta
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTypesManager;
