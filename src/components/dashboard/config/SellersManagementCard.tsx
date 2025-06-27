
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Phone } from 'lucide-react';
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

  const getSellerTypeLabel = (type: string) => {
    const typeLabels = {
      sdr: 'SDR (Pré-vendas)',
      closer: 'Closer (Comercial)',
      pap: 'Porta a Porta',
      vendedor_interno: 'Vendedor Interno',
      outro: 'Outro'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const getSellerTypeBadgeColor = (type: string) => {
    const colorMap = {
      sdr: 'bg-blue-100 text-blue-800',
      closer: 'bg-green-100 text-green-800',
      pap: 'bg-purple-100 text-purple-800',
      vendedor_interno: 'bg-orange-100 text-orange-800',
      outro: 'bg-gray-100 text-gray-800'
    };
    return colorMap[type as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">
                Vendedores Cadastrados ({sellers.length})
              </h4>
            </div>

            {sellers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Nenhum vendedor cadastrado</p>
                <p className="text-xs text-gray-400 mt-1">
                  Adicione vendedores para começar
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {sellers.map((seller) => (
                  <div
                    key={seller.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSellerClick(seller)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-900">{seller.name}</h5>
                          <Badge className={getSellerTypeBadgeColor(seller.seller_type)}>
                            {getSellerTypeLabel(seller.seller_type)}
                          </Badge>
                        </div>
                        
                        {seller.email && (
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                            <Mail className="h-3 w-3" />
                            <span>{seller.email}</span>
                          </div>
                        )}
                        
                        {seller.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="h-3 w-3" />
                            <span>{seller.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${seller.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-xs text-gray-500">
                          {seller.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
