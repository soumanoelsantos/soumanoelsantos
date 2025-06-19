
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, User } from 'lucide-react';
import { Seller } from '@/types/sellers';

interface SellerPerformanceHeaderProps {
  seller: Seller;
}

const SellerPerformanceHeader: React.FC<SellerPerformanceHeaderProps> = ({ seller }) => {
  const getSellerTypeLabel = (type: string) => {
    const labels = {
      pap: 'Porta a Porta (PAP)',
      sdr: 'SDR',
      closer: 'Closer',
      vendedor_interno: 'Vendedor Interno',
      outro: 'Outro'
    };
    return labels[type as keyof typeof labels] || type;
  };

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

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Lançamento de Performance
          </h1>
          <p className="text-gray-600">
            Registre sua performance diária
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{seller.name}</p>
                <p className="text-sm text-gray-500">Vendedor</p>
              </div>
            </div>
            <Badge className={getSellerTypeColor(seller.seller_type)}>
              {getSellerTypeLabel(seller.seller_type)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPerformanceHeader;
