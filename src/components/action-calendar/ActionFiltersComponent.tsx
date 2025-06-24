
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { ActionFilters, ActionCalendar } from '@/types/actionCalendar';

interface ActionFiltersComponentProps {
  filters: ActionFilters;
  onFiltersChange: (filters: ActionFilters) => void;
  onClearFilters: () => void;
  actions: ActionCalendar[];
}

const ActionFiltersComponent = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  actions 
}: ActionFiltersComponentProps) => {
  // Get unique values for filter options
  const uniqueDepartments = [...new Set(actions.map(action => action.department))];
  const uniqueResponsible = [...new Set(actions.map(action => action.responsible_person))];

  const handleFilterChange = (key: keyof ActionFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...filters.date_range,
      [field]: value
    };
    handleFilterChange('date_range', newDateRange);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Filtros</h3>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="atrasada">Atrasada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Setor</Label>
            <Select
              value={filters.department || 'all'}
              onValueChange={(value) => handleFilterChange('department', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os setores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Responsável</Label>
            <Select
              value={filters.responsible_person || 'all'}
              onValueChange={(value) => handleFilterChange('responsible_person', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os responsáveis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueResponsible.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Período</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                placeholder="Data início"
                value={filters.date_range?.start || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="text-sm"
              />
              <Input
                type="date"
                placeholder="Data fim"
                value={filters.date_range?.end || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionFiltersComponent;
