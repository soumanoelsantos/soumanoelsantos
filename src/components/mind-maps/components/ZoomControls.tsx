
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';

export interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitView: () => void;
}

const ZoomControls = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitView
}: ZoomControlsProps) => {
  const formatZoomLevel = (level: number) => {
    return `${Math.round(level * 100)}%`;
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2 border">
      <Button
        size="sm"
        variant="ghost"
        onClick={onZoomOut}
        className="h-8 w-8 p-0"
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <div className="text-xs text-gray-600 min-w-[40px] text-center">
        {formatZoomLevel(zoomLevel)}
      </div>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onZoomIn}
        className="h-8 w-8 p-0"
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <div className="w-px h-4 bg-gray-300 mx-1" />
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onResetZoom}
        className="h-8 w-8 p-0"
        title="Reset Zoom"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onFitView}
        className="h-8 w-8 p-0"
        title="Fit to View"
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZoomControls;
