
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
  ReactFlowProvider,
  ControlButton,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MindMapNode, MindMapEdge, MindMapContent } from '@/types/mindMap';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from './hooks/useAutoSave';
import { Save, Download, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MindMapNodeComponent from './components/MindMapNode';
import ZoomControls from './components/ZoomControls';

interface MindMapCanvasProps {
  initialContent?: MindMapContent;
  onSave: (content: MindMapContent) => Promise<void>;
  isSaving: boolean;
}

const initialNodes: MindMapNode[] = [
  {
    id: 'node-1',
    type: 'default',
    position: { x: 250, y: 250 },
    data: { label: 'Ideia Central' }
  }
];

const initialEdges: MindMapEdge[] = [];

const MindMapCanvas = ({ initialContent, onSave, isSaving }: MindMapCanvasProps) => {
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<MindMapNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<MindMapEdge>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [changingColorNode, setChangingColorNode] = useState<string | null>(null);
  const [notesNode, setNotesNode] = useState<string | null>(null);
  const [reconnectingNode, setReconnectingNode] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Obter o mindMapId da URL
  const mindMapId = window.location.pathname.split('/').pop() || '';

  useEffect(() => {
    if (initialContent) {
      setNodes(initialContent.nodes || []);
      setEdges(initialContent.edges || []);
    }
  }, [initialContent, setNodes, setEdges]);

  useAutoSave({
    content: { nodes, edges },
    onSave,
    enabled: !isSaving,
    delay: 1500
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsMultiSelect(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsMultiSelect(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const getDirectChildren = (nodeId: string): string[] => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => edge.target);
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onNodeDragStart = useCallback((event, node) => {
    setDraggedNode(node.id);
  }, [setDraggedNode]);

  const onNodeDrag = useCallback((event, node) => {
    // Handle node drag
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    setDraggedNode(null);
  }, [setDraggedNode]);

  const onNodeClick = useCallback((event, node) => {
    if (isMultiSelect) {
      setSelectedNodes(prev => {
        if (prev.includes(node.id)) {
          return prev.filter(id => id !== node.id);
        } else {
          return [...prev, node.id];
        }
      });
      setSelectedNode(null);
    } else {
      setSelectedNodes([]);
      setSelectedNode(node.id);
    }
  }, [isMultiSelect, setSelectedNode, setSelectedNodes]);

  const onNodesDelete = useCallback((deleted) => {
    setEdges(eds => eds.filter(edge => !deleted.find(node => node.id === edge.source || node.id === edge.target)));
  }, [setEdges]);

  const onEdgesDelete = useCallback((deleted) => {
    console.log('Edges deleted', deleted);
  }, []);

  const addNode = useCallback(() => {
    const newNodeId = `node-${nodes.length + 1}`;
    const x = 0;
    const y = 0;

    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position: { x, y },
      data: { label: 'Novo Nó' }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
  }, [nodes, setNodes]);

  const addChildNode = useCallback((parentNodeId: string) => {
    const newNodeId = `node-${nodes.length + 1}`;
    const parentNode = nodes.find(node => node.id === parentNodeId);

    if (!parentNode) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Nó pai não encontrado."
      });
      return;
    }

    const x = parentNode.position.x + 200;
    const y = parentNode.position.y;

    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position: { x, y },
      data: { label: 'Novo Nó' }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, { id: `edge-${parentNodeId}-${newNodeId}`, source: parentNodeId, target: newNodeId }]);
  }, [nodes, edges, setNodes, setEdges, toast]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const toggleNodeVisibility = useCallback((nodeId: string) => {
    setHiddenNodes(prev => {
      const newHiddenNodes = new Set(prev);
      const directChildren = getDirectChildren(nodeId);

      if (newHiddenNodes.has(nodeId)) {
        newHiddenNodes.delete(nodeId);
        directChildren.forEach(childId => newHiddenNodes.delete(childId)); // Mostrar filhos também
      } else {
        newHiddenNodes.add(nodeId);
        directChildren.forEach(childId => newHiddenNodes.add(childId)); // Ocultar filhos também
      }

      return newHiddenNodes;
    });
  }, [setHiddenNodes, edges]);

  const updateNodeData = useCallback((nodeId: string, updates: Partial<MindMapNode['data']>) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  }, [setNodes]);

  const handleUpdateNodeAttachments = useCallback((nodeId: string, attachments: any[]) => {
    updateNodeData(nodeId, { attachments });
  }, [updateNodeData]);

  const onZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 2));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.2));
  }, []);

  const onResetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  const nodeTypes = useMemo(() => ({
    default: (nodeProps: any) => (
      <MindMapNodeComponent
        {...nodeProps}
        data={{
          ...nodeProps.data,
          mindMapId, // Passar o mindMapId para o nó
          onEdit: () => setEditingNode(nodeProps.id),
          onDelete: () => deleteNode(nodeProps.id),
          onAddChild: () => addChildNode(nodeProps.id),
          onToggleVisibility: () => toggleNodeVisibility(nodeProps.id),
          onReconnect: () => setReconnectingNode(nodeProps.id),
          onChangeColor: () => setChangingColorNode(nodeProps.id),
          onOpenNotes: () => setNotesNode(nodeProps.id),
          onUpdateNodeAttachments: (attachments: any[]) => handleUpdateNodeAttachments(nodeProps.id, attachments),
          hasChildren: getDirectChildren(nodeProps.id).length > 0,
          hasHiddenChildren: getDirectChildren(nodeProps.id).some((childId: string) => hiddenNodes.has(childId))
        }}
        isSelected={selectedNodes.includes(nodeProps.id)}
      />
    )
  }), [
    setEditingNode, deleteNode, addChildNode, toggleNodeVisibility, 
    setReconnectingNode, setChangingColorNode, setNotesNode, handleUpdateNodeAttachments,
    getDirectChildren, hiddenNodes, selectedNodes, mindMapId
  ]);

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        minZoom={0.2}
        maxZoom={2}
        className="bg-gray-100"
        onInit={setReactFlowInstance}
        zoomOnPinch={false}
        zoomOnScroll={false}
        panOnScroll={false}
      >
        <Background color="#444" variant="dots" gap={20} size={0.8} />
        <Controls
          showInteractive={false}
          showFitView={false}
          showZoom={false}
        />

        <ZoomControls
          zoomLevel={zoomLevel}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onResetZoom={onResetZoom}
        />
      </ReactFlow>
    </div>
  );
};

export default MindMapCanvas;
