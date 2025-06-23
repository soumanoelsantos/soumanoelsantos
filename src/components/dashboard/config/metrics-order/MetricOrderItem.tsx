
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MetricItem {
  key: string;
  title: string;
  enabled: boolean;
}

interface MetricOrderItemProps {
  metric: MetricItem;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const MetricOrderItem: React.FC<MetricOrderItemProps> = ({
  metric,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <span className="text-sm font-medium text-gray-700">
        {index + 1}. {metric.title}
      </span>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onMoveUp}
          disabled={isFirst}
          className="h-8 w-8 p-0"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMoveDown}
          disabled={isLast}
          className="h-8 w-8 p-0"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
