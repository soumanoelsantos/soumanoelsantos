
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AlignHorizontalSpaceAround, 
  AlignVerticalSpaceAround,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  Grid3X3,
  X
} from 'lucide-react';

interface AlignmentToolbarProps {
  selectedNodes: string[];
  onAlignHorizontally: (nodeIds: string[]) => void;
  onAlignVertically: (nodeIds: string[]) => void;
  onDistributeHorizontally: (nodeIds: string[]) => void;
  onDistributeVertically: (nodeIds: string[]) => void;
  onArrangeInGrid: (nodeIds: string[], columns?: number) => void;
  onClose: () => void;
}

const AlignmentToolbar = ({
  selectedNodes,
  onAlignHorizontally,
  onAlignVertically,
  onDistributeHorizontally,
  onDistributeVertically,
  onArrangeInGrid,
  onClose
}: AlignmentToolbarProps) => {
  const [gridColumns, setGridColumns] = useState(3);

  if (selectedNodes.length < 2) return null;

  return (
    <Card className="absolute top-4 right-4 z-50 shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">
            Alinhar ({selectedNodes.length} nós)
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAlignHorizontally(selectedNodes)}
              title="Alinhar horizontalmente"
            >
              <AlignHorizontalJustifyCenter className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAlignVertically(selectedNodes)}
              title="Alinhar verticalmente"
            >
              <AlignVerticalJustifyCenter className="h-3 w-3" />
            </Button>
          </div>
          
          {selectedNodes.length >= 3 && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDistributeHorizontally(selectedNodes)}
                title="Distribuir horizontalmente"
              >
                <AlignHorizontalSpaceAround className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDistributeVertically(selectedNodes)}
                title="Distribuir verticalmente"
              >
                <AlignVerticalSpaceAround className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          <div className="flex gap-1 items-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onArrangeInGrid(selectedNodes, gridColumns)}
              title="Organizar em grade"
            >
              <Grid3X3 className="h-3 w-3" />
            </Button>
            <input
              type="number"
              min="2"
              max="5"
              value={gridColumns}
              onChange={(e) => setGridColumns(Number(e.target.value))}
              className="w-12 h-6 text-xs text-center border rounded"
              title="Colunas da grade"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentToolbar;
