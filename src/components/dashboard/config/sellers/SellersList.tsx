
import React from 'react';
import { Seller } from '@/types/sellers';
import { SellerItem } from './SellerItem';
import { EmptySellersState } from './EmptySellersState';

interface SellersListProps {
  sellers: Seller[];
  onSettingsClick: (seller: Seller, e: React.MouseEvent) => void;
  onDeleteSeller: (sellerId: string) => void;
  onSellerClick: (seller: Seller) => void;
}

export const SellersList: React.FC<SellersListProps> = ({
  sellers,
  onSettingsClick,
  onDeleteSeller,
  onSellerClick
}) => {
  if (sellers.length === 0) {
    return <EmptySellersState />;
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-gray-700">
        Vendedores Cadastrados ({sellers.length})
      </h4>
      <div className="space-y-2">
        {sellers.map((seller) => (
          <SellerItem
            key={seller.id}
            seller={seller}
            onSettingsClick={onSettingsClick}
            onDeleteSeller={onDeleteSeller}
            onSellerClick={onSellerClick}
          />
        ))}
      </div>
    </div>
  );
};
