
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const ZoomControls = ({ zoomLevel, onZoomIn, onZoomOut, onResetZoom }: ZoomControlsProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white rounded-lg shadow-lg border p-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onZoomIn}
        className="h-8 w-8 p-0"
        title="Aumentar zoom"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <div className="text-xs text-center py-1 px-2 bg-gray-50 rounded">
        {Math.round(zoomLevel * 100)}%
      </div>
      
      <Button
        size="sm"
        variant="outline"
        onClick={onZoomOut}
        className="h-8 w-8 p-0"
        title="Diminuir zoom"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={onResetZoom}
        className="h-8 w-8 p-0"
        title="Resetar zoom"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZoomControls;
