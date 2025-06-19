
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Phone, Calendar, UserX, Users, BarChart3, TrendingUp } from 'lucide-react';
import { PreSalesOrderItem as PreSalesOrderItemType } from './usePreSalesOrder';

interface PreSalesOrderItemProps {
  item: PreSalesOrderItemType;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const getItemIcon = (key: string) => {
  const iconMap = {
    showPreSalesCalls: Phone,
    showPreSalesSchedulings: Calendar,
    showPreSalesNoShow: UserX,
    showPreSalesSDRTable: Users,
    showPreSalesCallsChart: TrendingUp,
    showPreSalesSchedulingChart: BarChart3,
    showPreSalesNoShowChart: TrendingUp,
    showPreSalesSDRComparisonChart: BarChart3,
  };
  return iconMap[key as keyof typeof iconMap] || BarChart3;
};

export const PreSalesOrderItem: React.FC<PreSalesOrderItemProps> = ({
  item,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown
}) => {
  const IconComponent = getItemIcon(item.key);

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
      <div className="flex items-center gap-2 flex-1">
        <IconComponent className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium">{item.label}</span>
      </div>
      
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onMoveUp}
          disabled={isFirst}
          className="h-8 w-8 p-0"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMoveDown}
          disabled={isLast}
          className="h-8 w-8 p-0"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
