
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Link, Settings, BarChart3, Target, Calendar } from 'lucide-react';
import { Seller } from '@/types/sellers';
import { useToast } from '@/components/ui/use-toast';
import { SellerGoalsTab } from './SellerGoalsTab';
import { SellerPerformanceTab } from './SellerPerformanceTab';

interface SellerDetailsDialogProps {
  seller: Seller | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SellerDetailsDialog: React.FC<SellerDetailsDialogProps> = ({
  seller,
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');

  if (!seller) return null;

  const sellerTypeLabels = {
    pap: 'Porta a Porta',
    sdr: 'SDR',
    closer: 'Closer',
    vendedor_interno: 'Vendedor Interno',
    outro: 'Outro'
  };

  const copyAccessLink = () => {
    const link = `${window.location.origin}/vendedor/${seller.access_token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link de acesso foi copiado para a área de transferência",
    });
  };

  const accessLink = `${window.location.origin}/vendedor/${seller.access_token}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {seller.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Info
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Metas
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Lançamentos
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Informações Básicas</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Nome:</span>
                    <p className="font-medium">{seller.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Tipo:</span>
                    <div className="mt-1">
                      <Badge variant="secondary">
                        {sellerTypeLabels[seller.seller_type]}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <div className="mt-1">
                      <Badge variant={seller.is_active ? "default" : "destructive"}>
                        {seller.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Contato</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">E-mail:</span>
                    <p className="font-medium">{seller.email || 'Não informado'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Telefone:</span>
                    <p className="font-medium">{seller.phone || 'Não informado'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Link de Acesso</h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Link className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Link para o vendedor lançar dados:</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-white p-2 rounded border break-all">
                    {accessLink}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyAccessLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Compartilhe este link com o vendedor para que ele possa lançar seus dados diários
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <SellerGoalsTab sellerId={seller.id} />
          </TabsContent>

          <TabsContent value="performance">
            <SellerPerformanceTab sellerId={seller.id} />
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Histórico detalhado em desenvolvimento</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
