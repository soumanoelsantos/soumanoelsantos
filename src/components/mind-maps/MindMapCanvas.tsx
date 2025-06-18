
import React, { useState, useCallback, useEffect } from 'react';
import { MindMapContent, MindMapNode, MindMapEdge } from '@/types/mindMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Save, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => Promise<void>;
  isSaving?: boolean;
}

const MindMapCanvas = ({ initialContent, onSave, isSaving = false }: MindMapCanvasProps) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');

  // Adicionar nó central se não existir
  useEffect(() => {
    if (nodes.length === 0) {
      const centerNode: MindMapNode = {
        id: 'center',
        type: 'default',
        position: { x: 400, y: 300 },
        data: { label: 'Ideia Central', color: '#3b82f6' }
      };
      setNodes([centerNode]);
    }
  }, []);

  const handleSave = async () => {
    await onSave({ nodes, edges });
  };

  const addNode = (x: number = Math.random() * 600 + 100, y: number = Math.random() * 400 + 100) => {
    if (!newNodeLabel.trim()) return;

    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      type: 'default',
      position: { x, y },
      data: { label: newNodeLabel.trim(), color: '#6b7280' }
    };

    setNodes(prev => [...prev, newNode]);

    // Conectar ao nó central se existir
    const centerNode = nodes.find(node => node.id === 'center');
    if (centerNode) {
      const newEdge: MindMapEdge = {
        id: `edge-${Date.now()}`,
        source: centerNode.id,
        target: newNode.id
      };
      setEdges(prev => [...prev, newEdge]);
    }

    setNewNodeLabel('');
    setIsAddingNode(false);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };

  const startEditNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setEditingNode(nodeId);
      setEditLabel(node.data.label);
    }
  };

  const saveNodeEdit = () => {
    if (!editingNode || !editLabel.trim()) return;

    setNodes(prev => prev.map(node =>
      node.id === editingNode
        ? { ...node, data: { ...node.data, label: editLabel.trim() } }
        : node
    ));

    setEditingNode(null);
    setEditLabel('');
  };

  const connectNodes = (sourceId: string, targetId: string) => {
    const edgeExists = edges.some(edge =>
      (edge.source === sourceId && edge.target === targetId) ||
      (edge.source === targetId && edge.target === sourceId)
    );

    if (!edgeExists) {
      const newEdge: MindMapEdge = {
        id: `edge-${Date.now()}`,
        source: sourceId,
        target: targetId
      };
      setEdges(prev => [...prev, newEdge]);
    }
  };

  return (
    <div className="relative w-full h-full bg-white">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={() => setIsAddingNode(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Nó
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={isSaving}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>

      {/* Canvas */}
      <svg className="w-full h-full" style={{ minHeight: '600px' }}>
        {/* Render edges */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;

          return (
            <line
              key={edge.id}
              x1={sourceNode.position.x + 60}
              y1={sourceNode.position.y + 30}
              x2={targetNode.position.x + 60}
              y2={targetNode.position.y + 30}
              stroke="#6b7280"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Render nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move ${
            selectedNode === node.id ? 'ring-2 ring-blue-500' : ''
          }`}
          style={{
            left: node.position.x,
            top: node.position.y,
          }}
          onClick={() => setSelectedNode(node.id)}
        >
          <Card className="min-w-[120px] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-3">
              <div
                className="w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: node.data.color }}
              />
              <div className="text-sm font-medium text-center">
                {node.data.label}
              </div>
              
              {selectedNode === node.id && (
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditNode(node.id);
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Dialog para adicionar nó */}
      <Dialog open={isAddingNode} onOpenChange={setIsAddingNode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Nó</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              placeholder="Digite o texto do nó..."
              onKeyPress={(e) => e.key === 'Enter' && addNode()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingNode(false)}>
                Cancelar
              </Button>
              <Button onClick={() => addNode()} disabled={!newNodeLabel.trim()}>
                Adicionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar nó */}
      <Dialog open={!!editingNode} onOpenChange={() => setEditingNode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nó</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder="Digite o novo texto..."
              onKeyPress={(e) => e.key === 'Enter' && saveNodeEdit()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingNode(null)}>
                Cancelar
              </Button>
              <Button onClick={saveNodeEdit} disabled={!editLabel.trim()}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MindMapCanvas;
