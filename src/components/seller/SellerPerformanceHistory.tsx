
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Trash2, Clock, User } from 'lucide-react';
import { Seller } from '@/types/sellers';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import { formatDateToBrazilian, formatToBrazilianTimezone } from '@/utils/dateUtils';
import EditPerformanceDialog from './EditPerformanceDialog';

interface SellerPerformanceHistoryProps {
  seller: Seller;
}

const PerformanceCard = ({ performance, seller, onEdit, onDelete }: any) => {
  const isSDR = seller.seller_type === 'sdr';
  const isCloser = !isSDR;

  const renderSDRMetrics = (performance: any) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm text-gray-500">Tentativas:</p>
        <p className="text-lg font-semibold">{performance.calls_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">No Show:</p>
        <p className="text-lg font-semibold">{performance.leads_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Agendamentos:</p>
        <p className="text-lg font-semibold">{performance.meetings_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Remarcações:</p>
        <p className="text-lg font-semibold">{performance.sales_count}</p>
      </div>
    </div>
  );

  const renderCloserMetrics = (performance: any) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm text-gray-500">Vendas:</p>
        <p className="text-lg font-semibold">{performance.sales_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Receita:</p>
        <p className="text-lg font-semibold">
          R$ {performance.revenue_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Faturamento:</p>
        <p className="text-lg font-semibold">
          R$ {performance.billing_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Reuniões:</p>
        <p className="text-lg font-semibold">{performance.meetings_count}</p>
      </div>
    </div>
  );

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">
              {formatDateToBrazilian(performance.date)}
            </span>
            <Badge variant={performance.submitted_by_seller ? "default" : "secondary"}>
              {performance.submitted_by_seller ? "Pelo Vendedor" : "Pelo Admin"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(performance)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(performance.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isSDR ? renderSDRMetrics(performance) : renderCloserMetrics(performance)}
        
        {performance.notes && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Observações:</p>
            <p className="text-sm bg-gray-50 p-2 rounded">{performance.notes}</p>
          </div>
        )}
        
        <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Lançado em: {formatToBrazilianTimezone(performance.submitted_at)}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            ID: {performance.id.substring(0, 8)}...
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SellerPerformanceHistory: React.FC<SellerPerformanceHistoryProps> = ({
  seller
}) => {
  const { performances, isLoading, deletePerformance } = useSellerPerformance(seller.id);
  const [editingPerformance, setEditingPerformance] = useState(null);

  const handleDelete = async (performanceId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      await deletePerformance(performanceId);
    }
  };

  const handleEdit = (performance: any) => {
    setEditingPerformance(performance);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-gray-500">Carregando histórico...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Lançamentos - {seller.name}
            <Badge variant="outline">
              {performances.length} registro{performances.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum lançamento encontrado</p>
            </div>
          ) : (
            performances.map((performance) => (
              <PerformanceCard
                key={performance.id}
                performance={performance}
                seller={seller}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </CardContent>
      </Card>

      {editingPerformance && (
        <EditPerformanceDialog
          performance={editingPerformance}
          seller={seller}
          open={!!editingPerformance}
          onClose={() => setEditingPerformance(null)}
        />
      )}
    </>
  );
};

export default SellerPerformanceHistory;
