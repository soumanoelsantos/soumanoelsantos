
import React from 'react';
import { Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSDRSellersList } from '@/hooks/useSDRSellersList';

interface SDRSalespersonFilterProps {
  selectedSalespeople: string[];
  onSelectionChange: (salespeople: string[]) => void;
}

const SDRSalespersonFilter: React.FC<SDRSalespersonFilterProps> = ({
  selectedSalespeople,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { sellers, isLoading } = useSDRSellersList();

  // Criar lista de opções incluindo "Todos os SDRs"
  const salespeople = [
    { id: 'all', name: 'Todos os SDRs' },
    ...sellers
  ];

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
      return 'Todos os SDRs';
    }
    if (selectedSalespeople.length === 1) {
      const salesperson = salespeople.find(s => s.id === selectedSalespeople[0]);
      return salesperson?.name || 'SDR selecionado';
    }
    return `${selectedSalespeople.length} SDRs selecionados`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">SDRs</label>
        <Button 
          variant="outline" 
          className="w-[250px] justify-between bg-white hover:bg-gray-50 border-gray-300 text-gray-900"
          disabled
        >
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span className="text-gray-500">Carregando...</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">SDRs</label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-[250px] justify-between bg-white hover:bg-gray-50 border-gray-300 text-gray-900"
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span className="text-gray-900">{getDisplayText()}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0 bg-white border border-gray-200 shadow-lg z-50">
          <div className="p-4 space-y-3 bg-white">
            {salespeople.length === 1 ? (
              <div className="text-sm text-gray-500 text-center py-2">
                Nenhum SDR cadastrado
              </div>
            ) : (
              salespeople.map((salesperson) => (
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
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-900"
                  >
                    {salesperson.name}
                  </label>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SDRSalespersonFilter;
