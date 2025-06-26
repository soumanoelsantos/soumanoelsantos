
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SDRGoalDistribution } from '@/types/preSalesGoals';

interface CustomGoalDistributionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sdrs: Array<{ id: string; name: string }>;
  goalType: string;
  totalGoal: number;
  isPercentage: boolean;
  onDistribute: (distributions: SDRGoalDistribution[]) => void;
}

const CustomGoalDistributionDialog: React.FC<CustomGoalDistributionDialogProps> = ({
  open,
  onOpenChange,
  sdrs,
  goalType,
  totalGoal,
  isPercentage,
  onDistribute
}) => {
  const [distributions, setDistributions] = useState<SDRGoalDistribution[]>(
    sdrs.map(sdr => ({
      seller_id: sdr.id,
      seller_name: sdr.name,
      target_value: Math.ceil(totalGoal / sdrs.length)
    }))
  );

  const handleValueChange = (sellerId: string, value: number) => {
    setDistributions(prev => prev.map(dist => 
      dist.seller_id === sellerId 
        ? { ...dist, target_value: value }
        : dist
    ));
  };

  const totalDistributed = distributions.reduce((sum, dist) => sum + dist.target_value, 0);
  const isValidDistribution = isPercentage 
    ? totalDistributed <= 100 
    : totalDistributed === totalGoal;

  const handleDistribute = () => {
    onDistribute(distributions);
    onOpenChange(false);
  };

  const handleEqualDistribution = () => {
    const equalValue = isPercentage 
      ? Math.floor(totalGoal / sdrs.length * 100) / 100
      : Math.ceil(totalGoal / sdrs.length);
    
    setDistributions(prev => prev.map(dist => ({
      ...dist,
      target_value: equalValue
    })));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Distribuir Meta: {goalType}</DialogTitle>
          <DialogDescription>
            Defina a meta individual para cada SDR. Total: {totalGoal}{isPercentage ? '%' : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Total distribuído: {totalDistributed.toFixed(isPercentage ? 1 : 0)}{isPercentage ? '%' : ''}
            </span>
            <Button variant="outline" size="sm" onClick={handleEqualDistribution}>
              Distribuir Igualmente
            </Button>
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {distributions.map((dist) => (
              <div key={dist.seller_id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <Label className="font-medium">{dist.seller_name}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={dist.target_value}
                    onChange={(e) => handleValueChange(dist.seller_id, parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                    min="0"
                    max={isPercentage ? "100" : undefined}
                    step={isPercentage ? "0.1" : "1"}
                  />
                  <span className="text-sm text-gray-500">
                    {isPercentage ? '%' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!isValidDistribution && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                {isPercentage 
                  ? 'O total não pode exceder 100%'
                  : `O total deve ser exatamente ${totalGoal}`
                }
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDistribute}
              disabled={!isValidDistribution}
            >
              Distribuir Metas
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomGoalDistributionDialog;

