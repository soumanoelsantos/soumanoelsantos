
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import { Seller, SellerDailyPerformance } from '@/types/sellers';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import { formatDateToBrazilian } from '@/utils/dateUtils';
import { toast } from 'sonner';

interface EditPerformanceDialogProps {
  performance: SellerDailyPerformance;
  seller: Seller;
  open: boolean;
  onClose: () => void;
}

interface EditFormData {
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  leads_count: number;
  meetings_count: number;
  calls_count: number;
  notes: string;
}

const EditPerformanceDialog: React.FC<EditPerformanceDialogProps> = ({
  performance,
  seller,
  open,
  onClose
}) => {
  const { createOrUpdatePerformance } = useSellerPerformance(seller.id);
  const isSDR = seller.seller_type === 'sdr';
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<EditFormData>({
    defaultValues: {
      sales_count: performance.sales_count,
      revenue_amount: performance.revenue_amount,
      billing_amount: performance.billing_amount,
      leads_count: performance.leads_count,
      meetings_count: performance.meetings_count,
      calls_count: performance.calls_count,
      notes: performance.notes || '',
    }
  });

  const onSubmit = async (data: EditFormData) => {
    try {
      const success = await createOrUpdatePerformance({
        date: performance.date,
        sales_count: Number(data.sales_count) || 0,
        revenue_amount: Number(data.revenue_amount) || 0,
        billing_amount: Number(data.billing_amount) || 0,
        leads_count: Number(data.leads_count) || 0,
        meetings_count: Number(data.meetings_count) || 0,
        calls_count: Number(data.calls_count) || 0,
        notes: data.notes || '',
        submitted_by_seller: false, // Editado pelo admin
      });

      if (success) {
        toast.success("Performance atualizada com sucesso!");
        onClose();
      }
    } catch (error) {
      console.error('Erro ao atualizar performance:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Editar Performance - {formatDateToBrazilian(performance.date)}
          </DialogTitle>
          <DialogDescription>
            Editando performance de {seller.name} - {isSDR ? 'SDR (Pré-vendas)' : 'Closer (Comercial)'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isSDR ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calls_count">Número de Tentativas *</Label>
                  <Input
                    id="calls_count"
                    type="number"
                    min="0"
                    {...register('calls_count', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leads_count">Número de No Show *</Label>
                  <Input
                    id="leads_count"
                    type="number"
                    min="0"
                    {...register('leads_count', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetings_count">Número de Agendamentos *</Label>
                  <Input
                    id="meetings_count"
                    type="number"
                    min="0"
                    {...register('meetings_count', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales_count">Número de Remarcações *</Label>
                  <Input
                    id="sales_count"
                    type="number"
                    min="0"
                    {...register('sales_count', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales_count">Número de Vendas *</Label>
                  <Input
                    id="sales_count"
                    type="number"
                    min="0"
                    {...register('sales_count', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetings_count">Número de Reuniões *</Label>
                  <Input
                    id="meetings_count"
                    type="number"
                    min="0"
                    {...register('meetings_count', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue_amount">Receita (R$) *</Label>
                  <Input
                    id="revenue_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register('revenue_amount', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_amount">Faturamento (R$) *</Label>
                  <Input
                    id="billing_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register('billing_amount', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Observações sobre a performance do dia..."
              {...register('notes')}
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPerformanceDialog;
