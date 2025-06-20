
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Seller } from '@/types/sellers';
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

  if (!seller) return null;

  const sellerTypeLabels = {
    sdr: 'SDR (Pré-vendas)',
    closer: 'Closer (Comercial)',
    pap: 'Porta a Porta',
    vendedor_interno: 'Vendedor Interno',
    outro: 'Outro'
  };

  const performanceUrl = `${window.location.origin}/seller-performance/${seller.access_token}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "✅ Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  console.log('🔍 [DEBUG] SellerDetailsDialog - seller:', seller);
  console.log('🔍 [DEBUG] SellerDetailsDialog - seller.seller_type:', seller.seller_type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle>{seller.name}</DialogTitle>
            <Badge variant="secondary">
              {sellerTypeLabels[seller.seller_type]}
            </Badge>
            {!seller.is_active && (
              <Badge variant="outline" className="text-red-600">
                Inativo
              </Badge>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="access">Acesso</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Nome</label>
                <p className="text-sm">{seller.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm">{seller.email || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Telefone</label>
                <p className="text-sm">{seller.phone || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo</label>
                <p className="text-sm">{sellerTypeLabels[seller.seller_type]}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Token de Acesso</label>
                <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                  {seller.access_token}
                </div>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900 mb-1">
                      Link para Lançamento de Performance
                    </h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Envie este link para <strong>{seller.name}</strong> poder lançar sua performance diária de {sellerTypeLabels[seller.seller_type]}:
                    </p>
                  </div>
                </div>
                
                <div className="bg-white border border-blue-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-blue-100 border-b border-blue-300">
                    <span className="text-xs font-medium text-blue-800 uppercase tracking-wide">URL do Formulário</span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-mono text-gray-800 break-all">
                          {performanceUrl}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(performanceUrl)}
                          className="whitespace-nowrap"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copiar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openInNewTab(performanceUrl)}
                          className="whitespace-nowrap"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Abrir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
                  <p className="text-xs text-blue-700">
                    <strong>Instruções:</strong> Compartilhe este link diretamente com {seller.name}. 
                    Ela poderá acessar e preencher os dados de performance {seller.seller_type === 'sdr' ? '(tentativas, no show, agendamentos, remarcações)' : '(vendas, receita, faturamento, reuniões)'} 
                    através deste formulário personalizado.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <SellerGoalsTab sellerId={seller.id} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <SellerPerformanceTab 
              sellerId={seller.id} 
              sellerType={seller.seller_type}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
