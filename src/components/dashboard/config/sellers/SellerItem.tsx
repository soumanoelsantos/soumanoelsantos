
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Trash2 } from 'lucide-react';
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
import { Seller } from '@/types/sellers';

interface SellerItemProps {
  seller: Seller;
  onSettingsClick: (seller: Seller, e: React.MouseEvent) => void;
  onDeleteSeller: (sellerId: string) => void;
  onSellerClick: (seller: Seller) => void;
}

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

export const SellerItem: React.FC<SellerItemProps> = ({
  seller,
  onSettingsClick,
  onDeleteSeller,
  onSellerClick
}) => {
  return (
    <div
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
      onClick={() => onSellerClick(seller)}
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
          onClick={(e) => onSettingsClick(seller, e)}
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
                onClick={() => onDeleteSeller(seller.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
