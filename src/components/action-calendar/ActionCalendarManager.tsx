
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Filter } from 'lucide-react';
import { useActionCalendar } from '@/hooks/useActionCalendar';
import { ActionFilters } from '@/types/actionCalendar';
import ActionCalendarTable from './ActionCalendarTable';
import CreateActionDialog from './CreateActionDialog';
import ActionFiltersComponent from './ActionFiltersComponent';

const ActionCalendarManager = () => {
  const { actions, isLoading, createAction, updateAction, deleteAction, toggleActionPublic, refetch } = useActionCalendar();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ActionFilters>({});

  const handleFiltersChange = (newFilters: ActionFilters) => {
    setFilters(newFilters);
    refetch(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    refetch({});
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-500">Carregando calendário de ações...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendário de Ações
            </CardTitle>
            <CardDescription>
              Gerencie e acompanhe todas as ações da sua equipe
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Ação
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {showFilters && (
          <ActionFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={clearFilters}
            actions={actions}
          />
        )}

        <ActionCalendarTable
          actions={actions}
          onUpdateAction={updateAction}
          onDeleteAction={deleteAction}
          onTogglePublic={toggleActionPublic}
        />

        <CreateActionDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateAction={createAction}
        />
      </CardContent>
    </Card>
  );
};

export default ActionCalendarManager;
