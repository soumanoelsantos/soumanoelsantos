
import React, { useState } from 'react';
import { useMindMaps } from '@/hooks/useMindMaps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Brain, Share2, Edit2, Trash2, ExternalLink, LayoutGrid, List, GripVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';

interface SortableMapItemProps {
  map: any;
  onEdit: (id: string) => void;
  onShare: (shareToken: string) => void;
  onViewPublic: (shareToken: string) => void;
  onDelete: (id: string) => void;
}

const SortableMapItem = ({ map, onEdit, onShare, onViewPublic, onDelete }: SortableMapItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: map.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`hover:shadow-md transition-shadow ${isDragging ? 'shadow-lg' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div 
              className="cursor-grab hover:cursor-grabbing p-1"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <Brain className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{map.title}</h3>
              <p className="text-sm text-gray-500">
                Criado em {new Date(map.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onEdit(map.id)}
              className="flex items-center gap-1"
            >
              <Edit2 className="h-3 w-3" />
              Editar
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onShare(map.share_token)}
              className="flex items-center gap-1"
            >
              <Share2 className="h-3 w-3" />
              Compartilhar
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewPublic(map.share_token)}
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Ver Público
            </Button>
            
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(map.id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Deletar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MindMapsManager = () => {
  const { mindMaps, isLoading, createMindMap, deleteMindMap } = useMindMaps();
  const [newMapTitle, setNewMapTitle] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Sempre inicia em lista
  const [sortedMaps, setSortedMaps] = useState(mindMaps);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Atualiza a lista ordenada quando mindMaps muda
  React.useEffect(() => {
    setSortedMaps(mindMaps);
  }, [mindMaps]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSortedMaps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCreateMap = async () => {
    if (!newMapTitle.trim()) return;

    const newMap = await createMindMap({ title: newMapTitle.trim() });
    if (newMap) {
      setNewMapTitle('');
      setIsCreateDialogOpen(false);
      navigate(`/mapa-mental/${newMap.id}`);
    }
  };

  const handleShareMap = async (shareToken: string) => {
    const shareUrl = `${window.location.origin}/mapa-mental/compartilhado/${shareToken}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiado!",
        description: "O link de compartilhamento foi copiado para a área de transferência."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link. Tente novamente."
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando mapas mentais...</div>
      </div>
    );
  }

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedMaps.map((map) => (
        <Card key={map.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              {map.title}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Criado em {new Date(map.created_at).toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => navigate(`/mapa-mental/${map.id}`)}
                className="flex items-center gap-1"
              >
                <Edit2 className="h-3 w-3" />
                Editar
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShareMap(map.share_token)}
                className="flex items-center gap-1"
              >
                <Share2 className="h-3 w-3" />
                Compartilhar
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/mapa-mental/compartilhado/${map.share_token}`)}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Ver Público
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteMindMap(map.id)}
                className="flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Deletar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedMaps.map(map => map.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {sortedMaps.map((map) => (
            <SortableMapItem
              key={map.id}
              map={map}
              onEdit={(id) => navigate(`/mapa-mental/${id}`)}
              onShare={handleShareMap}
              onViewPublic={(shareToken) => navigate(`/mapa-mental/compartilhado/${shareToken}`)}
              onDelete={deleteMindMap}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  return (
    <div className="space-y-6">
      {/* Header com botão de criar e toggle de visualização */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Meus Mapas Mentais
        </h2>
        
        <div className="flex items-center gap-4">
          {/* Toggle de visualização */}
          {sortedMaps.length > 0 && (
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grade
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
            </div>
          )}
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Criar Mapa Mental
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Mapa Mental</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nome do Mapa
                  </label>
                  <Input
                    value={newMapTitle}
                    onChange={(e) => setNewMapTitle(e.target.value)}
                    placeholder="Digite o nome do mapa mental..."
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateMap()}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateMap} disabled={!newMapTitle.trim()}>
                    Criar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lista de mapas */}
      {sortedMaps.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum mapa mental criado
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Crie seu primeiro mapa mental para organizar ideias e compartilhar com sua equipe
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Mapa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Indicador de visualização atual */}
          <div className="text-sm text-gray-500 bg-white p-3 rounded-lg shadow-sm border">
            📋 {sortedMaps.length} mapas mentais • Visualização em {viewMode === 'grid' ? 'Grade' : 'Lista'}
            {viewMode === 'list' && ' • Arraste para reordenar'}
          </div>
          
          {viewMode === 'grid' ? <GridView /> : <ListView />}
        </>
      )}
    </div>
  );
};

export default MindMapsManager;
