
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';
import { useSellers } from '@/hooks/useSellers';
import { SellerFormDialog } from './sellers/SellerFormDialog';
import { SellerDetailsDialog } from './sellers/SellerDetailsDialog';
import { SellersList } from './sellers/SellersList';
import { Seller } from '@/types/sellers';

const SellersManagementCard: React.FC = () => {
  const { sellers, isLoading, deleteSeller } = useSellers();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const handleDeleteSeller = async (sellerId: string) => {
    await deleteSeller(sellerId);
  };

  const handleSettingsClick = (seller: Seller, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSeller(seller);
  };

  const handleSellerClick = (seller: Seller) => {
    setSelectedSeller(seller);
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

          <SellersList
            sellers={sellers}
            onSettingsClick={handleSettingsClick}
            onDeleteSeller={handleDeleteSeller}
            onSellerClick={handleSellerClick}
          />
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
