
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ActionPlanFiltersProps {
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ActionPlanFilters = ({
  filterCategory,
  setFilterCategory,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm
}: ActionPlanFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" />
          Filtros:
        </div>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="todas" className="bg-white hover:bg-gray-50">Todas as categorias</SelectItem>
              <SelectItem value="comercial" className="bg-white hover:bg-gray-50">Comercial</SelectItem>
              <SelectItem value="marketing" className="bg-white hover:bg-gray-50">Marketing</SelectItem>
              <SelectItem value="gestao" className="bg-white hover:bg-gray-50">Gestão</SelectItem>
              <SelectItem value="financeiro" className="bg-white hover:bg-gray-50">Financeiro</SelectItem>
              <SelectItem value="rh" className="bg-white hover:bg-gray-50">RH</SelectItem>
              <SelectItem value="operacional" className="bg-white hover:bg-gray-50">Operacional</SelectItem>
              <SelectItem value="tecnologia" className="bg-white hover:bg-gray-50">Tecnologia</SelectItem>
              <SelectItem value="cultura" className="bg-white hover:bg-gray-50">Cultura</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="todos" className="bg-white hover:bg-gray-50">Todos os status</SelectItem>
              <SelectItem value="pendente" className="bg-white hover:bg-gray-50">Pendente</SelectItem>
              <SelectItem value="em_andamento" className="bg-white hover:bg-gray-50">Em andamento</SelectItem>
              <SelectItem value="realizado" className="bg-white hover:bg-gray-50">Realizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default ActionPlanFilters;
