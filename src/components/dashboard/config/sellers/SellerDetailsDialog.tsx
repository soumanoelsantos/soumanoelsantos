
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Edit, Trash2, User, Link, Settings, BarChart3 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSellers } from '@/hooks/useSellers';
import { Seller, SellerType } from '@/types/sellers';
import { SellerGoalsTab } from './SellerGoalsTab';
import { SellerPerformanceTab } from './SellerPerformanceTab';
import { useToast } from '@/components/ui/use-toast';

interface SellerDetailsDialogProps {
  seller: Seller | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SellerEditFormData {
  name: string;
  email: string;
  phone: string;
  seller_type: SellerType;
  is_active: boolean;
}

export const SellerDetailsDialog: React.FC<SellerDetailsDialogProps> = ({
  seller,
  open,
  onOpenChange
}) => {
  const { updateSeller, deleteSeller } = useSellers();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<SellerEditFormData>();

  const sellerType = watch('seller_type');
  const isActive = watch('is_active');

  React.useEffect(() => {
    if (seller && open) {
      reset({
        name: seller.name,
        email: seller.email || '',
        phone: seller.phone || '',
        seller_type: seller.seller_type,
        is_active: seller.is_active,
      });
    }
  }, [seller, open, reset]);

  const onSubmit = async (data: SellerEditFormData) => {
    if (!seller) return;

    const success = await updateSeller(seller.id, {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      seller_type: data.seller_type,
      is_active: data.is_active,
    });

    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!seller) return;
    
    setIsDeleting(true);
    const success = await deleteSeller(seller.id);
    if (success) {
      onOpenChange(false);
    }
    setIsDeleting(false);
  };

  const copyAccessLink = () => {
    if (!seller) return;
    
    const link = `${window.location.origin}/vendedor/${seller.access_token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link de acesso foi copiado para a área de transferência",
    });
  };

  const sellerTypeOptions = [
    { value: 'pap', label: 'Porta a Porta (PAP)' },
    { value: 'sdr', label: 'SDR' },
    { value: 'closer', label: 'Closer' },
    { value: 'vendedor_interno', label: 'Vendedor Interno' },
    { value: 'outro', label: 'Outro' },
  ];

  const getSellerTypeColor = (type: string) => {
    const colors = {
      pap: 'bg-blue-100 text-blue-800',
      sdr: 'bg-green-100 text-green-800',
      closer: 'bg-purple-100 text-purple-800',
      vendedor_interno: 'bg-orange-100 text-orange-800',
      outro: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.outro;
  };

  if (!seller) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {seller.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Info
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Acesso
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Metas
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge className={getSellerTypeColor(seller.seller_type)}>
                  {sellerTypeOptions.find(opt => opt.value === seller.seller_type)?.label}
                </Badge>
                <Badge variant={seller.is_active ? "default" : "destructive"}>
                  {seller.is_active ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {isDeleting ? 'Removendo...' : 'Remover'}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome *</Label>
                  <Input
                    id="edit-name"
                    {...register('name', { required: true })}
                    placeholder="Nome completo do vendedor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-seller_type">Tipo de Vendedor *</Label>
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
                  <Label htmlFor="edit-email">E-mail</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    {...register('email')}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    {...register('phone')}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-is_active"
                    checked={isActive}
                    onChange={(e) => setValue('is_active', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="edit-is_active">Vendedor ativo</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">E-mail</Label>
                    <p className="text-sm">{seller.email || 'Não informado'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Telefone</Label>
                    <p className="text-sm">{seller.phone || 'Não informado'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Criado em</Label>
                    <p className="text-sm">{new Date(seller.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Atualizado em</Label>
                    <p className="text-sm">{new Date(seller.updated_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Link de Acesso para Lançamentos</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Compartilhe este link com o vendedor para que ele possa fazer seus lançamentos diários
                </p>
                <div className="flex gap-2">
                  <Input
                    value={`${window.location.origin}/vendedor/${seller.access_token}`}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={copyAccessLink} size="sm" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Como usar:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Copie o link acima e envie para o vendedor</li>
                  <li>• O vendedor pode acessar o link de qualquer dispositivo</li>
                  <li>• Não é necessário login, apenas o link é suficiente</li>
                  <li>• O vendedor pode fazer lançamentos diários de performance</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <SellerGoalsTab sellerId={seller.id} />
          </TabsContent>

          <TabsContent value="performance">
            <SellerPerformanceTab sellerId={seller.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
