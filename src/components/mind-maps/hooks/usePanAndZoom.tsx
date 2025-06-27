
import { useState, useCallback, useEffect } from 'react';

export const usePanAndZoom = () => {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePanStart = useCallback((e: React.MouseEvent) => {
    setIsPanning(true);
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePanMove = useCallback((e: MouseEvent) => {
    if (!isPanning) return;

    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;

    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, [isPanning, lastPanPoint]);

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start panning if clicking on empty canvas (not on nodes)
    if (e.target === e.currentTarget) {
      e.preventDefault();
      handlePanStart(e);
    }
  }, [handlePanStart]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only zoom if Ctrl key is pressed (standard zoom behavior)
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoomLevel(prev => Math.max(0.1, Math.min(3, prev + delta)));
    }
  }, []);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(3, prev + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(0.1, prev - 0.2));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handlePanMove);
      document.addEventListener('mouseup', handlePanEnd);

      return () => {
        document.removeEventListener('mousemove', handlePanMove);
        document.removeEventListener('mouseup', handlePanEnd);
      };
    }
  }, [isPanning, handlePanMove, handlePanEnd]);

  return {
    panOffset,
    isPanning,
    zoomLevel,
    handlePanStart,
    handleCanvasMouseDown,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom
  };
};
