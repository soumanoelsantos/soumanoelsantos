import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Settings, Trash2 } from 'lucide-react';
import { useSellers } from '@/hooks/useSellers';
import { Badge } from '@/components/ui/badge';
import { SellerFormDialog } from './sellers/SellerFormDialog';
import { SellerDetailsDialog } from './sellers/SellerDetailsDialog';
import { Seller } from '@/types/sellers';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SellersManagementCard: React.FC = () => {
  const { sellers, isLoading, deleteSeller } = useSellers();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const sellerTypeLabels = {
    sdr: 'SDR (Pré-vendas)',
    closer: 'Closer (Comercial)',
    pap: 'Porta a Porta',
    vendedor_interno: 'Vendedor Interno',
    outro: 'Outro'
  };

  const getSellerTypeColor = (type: string) => {
    const colors = {
      sdr: 'bg-green-100 text-green-800',
      closer: 'bg-purple-100 text-purple-800',
      pap: 'bg-blue-100 text-blue-800',
      vendedor_interno: 'bg-orange-100 text-orange-800',
      outro: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.outro;
  };

  const handleDeleteSeller = async (sellerId: string) => {
    await deleteSeller(sellerId);
  };

  const handleSettingsClick = (seller: Seller, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSeller(seller);
  };

  const handlePerformanceClick = (seller: Seller, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Navegar para página de performance do vendedor
    console.log('Ver performance de:', seller.name);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciar Time de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            Carregando vendedores...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciar Time de Vendas
          </CardTitle>
          <CardDescription>
            Cadastre vendedores, defina metas e acompanhe o desempenho do seu time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Vendedor
          </Button>

          {sellers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum vendedor cadastrado</p>
              <p className="text-sm">Clique em "Adicionar Vendedor" para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700">
                Vendedores Cadastrados ({sellers.length})
              </h4>
              <div className="space-y-2">
                {sellers.map((seller) => (
                  <div
                    key={seller.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSeller(seller)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{seller.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={getSellerTypeColor(seller.seller_type)}
                        >
                          {sellerTypeLabels[seller.seller_type]}
                        </Badge>
                        {!seller.is_active && (
                          <Badge variant="outline" className="text-red-600">
                            Inativo
                          </Badge>
                        )}
                      </div>
                      {seller.email && (
                        <p className="text-sm text-gray-500">{seller.email}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => handleSettingsClick(seller, e)}
                        title="Configurações do vendedor"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            title="Excluir vendedor"
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Vendedor</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o vendedor "{seller.name}"? 
                              Esta ação não pode ser desfeita e todos os dados relacionados 
                              ao vendedor serão removidos permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSeller(seller.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <SellerFormDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      <SellerDetailsDialog
        seller={selectedSeller}
        open={!!selectedSeller}
        onOpenChange={(open) => !open && setSelectedSeller(null)}
      />
    </>
  );
};

export default SellersManagementCard;
