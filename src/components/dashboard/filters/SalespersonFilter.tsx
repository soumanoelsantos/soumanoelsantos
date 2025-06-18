
import React from 'react';
import { Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SalespersonFilterProps {
  selectedSalespeople: string[];
  onSelectionChange: (salespeople: string[]) => void;
}

// Mock data - in a real app, this would come from your database
const mockSalespeople = [
  { id: 'all', name: 'Todos os Vendedores' },
  { id: 'joao', name: 'João Silva' },
  { id: 'maria', name: 'Maria Santos' },
  { id: 'pedro', name: 'Pedro Costa' },
  { id: 'ana', name: 'Ana Oliveira' },
  { id: 'carlos', name: 'Carlos Ferreira' }
];

const SalespersonFilter: React.FC<SalespersonFilterProps> = ({
  selectedSalespeople,
  onSelectionChange
}) => {
  const handleSelectionChange = (salespersonId: string, checked: boolean) => {
    if (salespersonId === 'all') {
      if (checked) {
        onSelectionChange(['all']);
      } else {
        onSelectionChange([]);
      }
    } else {
      let newSelection = [...selectedSalespeople];
      
      // Remove 'all' if selecting individual salespeople
      newSelection = newSelection.filter(id => id !== 'all');
      
      if (checked) {
        newSelection.push(salespersonId);
      } else {
        newSelection = newSelection.filter(id => id !== salespersonId);
      }
      
      onSelectionChange(newSelection);
    }
  };

  const getDisplayText = () => {
    if (selectedSalespeople.includes('all') || selectedSalespeople.length === 0) {
      return 'Todos os Vendedores';
    }
    if (selectedSalespeople.length === 1) {
      const salesperson = mockSalespeople.find(s => s.id === selectedSalespeople[0]);
      return salesperson?.name || 'Vendedor selecionado';
    }
    return `${selectedSalespeople.length} vendedores selecionados`;
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Vendedores</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              {getDisplayText()}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <div className="p-4 space-y-3">
            {mockSalespeople.map((salesperson) => (
              <div key={salesperson.id} className="flex items-center space-x-2">
                <Checkbox
                  id={salesperson.id}
                  checked={
                    salesperson.id === 'all' 
                      ? selectedSalespeople.includes('all') || selectedSalespeople.length === 0
                      : selectedSalespeople.includes(salesperson.id)
                  }
                  onCheckedChange={(checked) => 
                    handleSelectionChange(salesperson.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={salesperson.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {salesperson.name}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SalespersonFilter;
