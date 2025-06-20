
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import { Seller } from '@/types/sellers';

interface SellerPerformanceHeaderProps {
  seller: Seller;
}

const SellerPerformanceHeader: React.FC<SellerPerformanceHeaderProps> = ({ seller }) => {
  const sellerTypeLabels = {
    sdr: 'SDR (Pré-vendas)',
    closer: 'Closer (Comercial)',
    pap: 'Porta a Porta',
    vendedor_interno: 'Vendedor Interno',
    outro: 'Outro'
  };

  console.log('📋 [DEBUG] SellerPerformanceHeader - seller:', seller);
  console.log('📋 [DEBUG] SellerPerformanceHeader - seller.seller_type:', seller.seller_type);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Bem-vindo, {seller.name}!
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Registre sua performance como {sellerTypeLabels[seller.seller_type] || 'Vendedor'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600">
          <p>Preencha os dados da sua performance diária para manter seus registros atualizados.</p>
          {seller.seller_type === 'sdr' && (
            <p className="mt-2 text-blue-600">
              Como SDR, você deve registrar: tentativas de ligação, no show, agendamentos e remarcações.
            </p>
          )}
          {seller.seller_type === 'closer' && (
            <p className="mt-2 text-green-600">
              Como Closer, você deve registrar: vendas, receita, faturamento e reuniões.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceHeader;
