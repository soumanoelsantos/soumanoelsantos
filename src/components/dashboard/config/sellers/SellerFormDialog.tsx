
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useSellers } from '@/hooks/useSellers';
import { SellerType } from '@/types/sellers';

interface SellerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SellerFormData {
  name: string;
  email: string;
  phone: string;
  seller_type: SellerType;
}

export const SellerFormDialog: React.FC<SellerFormDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { createSeller } = useSellers();
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<SellerFormData>();

  const sellerType = watch('seller_type');

  const onSubmit = async (data: SellerFormData) => {
    const success = await createSeller({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone || undefined,
      seller_type: data.seller_type,
    });

    if (success) {
      reset();
      onOpenChange(false);
    }
  };

  const sellerTypeOptions = [
    { value: 'sdr', label: 'SDR (Pré-vendas)' },
    { value: 'closer', label: 'Closer (Comercial)' },
    { value: 'pap', label: 'Porta a Porta (PAP)' },
    { value: 'vendedor_interno', label: 'Vendedor Interno' },
    { value: 'outro', label: 'Outro' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Vendedor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              placeholder="Nome completo do vendedor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller_type">Tipo de Vendedor *</Label>
            <Select
              value={sellerType}
              onValueChange={(value: SellerType) => setValue('seller_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {sellerTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail (opcional)</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Vendedor'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
