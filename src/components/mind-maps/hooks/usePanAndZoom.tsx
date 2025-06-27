
import { useState, useCallback, useEffect } from 'react';

export const usePanAndZoom = () => {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePanStart = useCallback((e: React.MouseEvent) => {
    console.log('Pan start iniciado');
    setIsPanning(true);
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePanMove = useCallback((e: MouseEvent) => {
    if (!isPanning) return;

    console.log('Pan move ativo');
    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;

    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, [isPanning, lastPanPoint]);

  const handlePanEnd = useCallback(() => {
    console.log('Pan end');
    setIsPanning(false);
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Verificar se clicou diretamente no canvas (não em um nó)
    const target = e.target as HTMLElement;
    
    // Se clicou no canvas ou em um elemento filho direto do canvas
    if (target.classList.contains('canvas-background') || 
        target === e.currentTarget || 
        target.tagName === 'DIV' && !target.closest('.mind-map-node')) {
      console.log('Iniciando pan no canvas');
      e.preventDefault();
      e.stopPropagation();
      handlePanStart(e);
    }
  }, [handlePanStart]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Only zoom if Ctrl key is pressed (standard zoom behavior)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      
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
      console.log('Adicionando event listeners para pan');
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        handlePanMove(e);
      };

      const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        handlePanEnd();
      };

      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });

      return () => {
        console.log('Removendo event listeners para pan');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
