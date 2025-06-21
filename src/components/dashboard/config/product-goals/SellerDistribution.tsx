
import React from 'react';
import { Plus, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Seller } from '@/types/sellers';

interface SellerDistributionItem {
  sellerId: string;
  quantityGoal: number;
  quantitySold: number;
  revenueGoal: number;
  revenueAchieved: number;
  billingGoal: number;
  billingAchieved: number;
}

interface SellerDistributionProps {
  sellers: Seller[];
  sellerDistribution: SellerDistributionItem[];
  onAddSeller: () => void;
  onUpdateSeller: (index: number, field: string, value: any) => void;
  onRemoveSeller: (index: number) => void;
}

export const SellerDistribution: React.FC<SellerDistributionProps> = ({
  sellers,
  sellerDistribution,
  onAddSeller,
  onUpdateSeller,
  onRemoveSeller
}) => {
  const getProgressPercentage = (achieved: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((achieved / goal) * 100, 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Distribuição por Vendedor</h4>
        <Button 
          onClick={onAddSeller}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Vendedor
        </Button>
      </div>
      
      {sellerDistribution.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>Nenhum vendedor adicionado</p>
          <p className="text-sm">Clique em "Adicionar Vendedor" para distribuir as metas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sellerDistribution.map((distribution, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Vendedor {index + 1}</h5>
                <Button
                  onClick={() => onRemoveSeller(index)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-4">
                  <Label>Vendedor</Label>
                  <Select 
                    value={distribution.sellerId} 
                    onValueChange={(value) => onUpdateSeller(index, 'sellerId', value)}
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
                    onChange={(e) => onUpdateSeller(index, 'quantityGoal', parseInt(e.target.value) || 0)}
                    placeholder="Meta"
                  />
                  <Input
                    type="number"
                    min="0"
                    max={distribution.quantityGoal}
                    value={distribution.quantitySold}
                    onChange={(e) => onUpdateSeller(index, 'quantitySold', parseInt(e.target.value) || 0)}
                    placeholder="Vendido"
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Meta Receita (R$)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={distribution.revenueGoal}
                    onChange={(e) => onUpdateSeller(index, 'revenueGoal', parseFloat(e.target.value) || 0)}
                    placeholder="Meta"
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    max={distribution.revenueGoal}
                    value={distribution.revenueAchieved}
                    onChange={(e) => onUpdateSeller(index, 'revenueAchieved', parseFloat(e.target.value) || 0)}
                    placeholder="Conquistado"
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Meta Faturamento (R$)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={distribution.billingGoal}
                    onChange={(e) => onUpdateSeller(index, 'billingGoal', parseFloat(e.target.value) || 0)}
                    placeholder="Meta"
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    max={distribution.billingGoal}
                    value={distribution.billingAchieved}
                    onChange={(e) => onUpdateSeller(index, 'billingAchieved', parseFloat(e.target.value) || 0)}
                    placeholder="Faturado"
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Progresso</Label>
                  <div className="space-y-1">
                    {distribution.quantityGoal > 0 && (
                      <div className="text-xs">
                        Qtd: {getProgressPercentage(distribution.quantitySold, distribution.quantityGoal).toFixed(0)}%
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full"
                            style={{ width: `${getProgressPercentage(distribution.quantitySold, distribution.quantityGoal)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {distribution.revenueGoal > 0 && (
                      <div className="text-xs">
                        Rec: {getProgressPercentage(distribution.revenueAchieved, distribution.revenueGoal).toFixed(0)}%
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${getProgressPercentage(distribution.revenueAchieved, distribution.revenueGoal)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {distribution.billingGoal > 0 && (
                      <div className="text-xs">
                        Fat: {getProgressPercentage(distribution.billingAchieved, distribution.billingGoal).toFixed(0)}%
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-purple-500 h-1 rounded-full"
                            style={{ width: `${getProgressPercentage(distribution.billingAchieved, distribution.billingGoal)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
