
import React, { useRef } from 'react';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/utils/pdfGenerator';
import { 
  ArrowLeft, 
  Download
} from 'lucide-react';
import { ActionItem } from './NewDiagnosticTestContent';
import DraggableActionItem from './DraggableActionItem';
import { useActionPlanManager } from './hooks/useActionPlanManager';
import ActionPlanStatistics from './components/ActionPlanStatistics';
import ActionPlanFilters from './components/ActionPlanFilters';
import AddActionDialog from './components/AddActionDialog';
import EditActionDialog from './components/EditActionDialog';
import ActionPlanPdfContent from './components/ActionPlanPdfContent';

interface ActionPlanManagerProps {
  actionPlan: ActionItem[];
  companyName: string;
  diagnosticData: any;
  onBack: () => void;
  onUpdatePlan: (plan: ActionItem[]) => void;
}

const ActionPlanManager = ({ 
  actionPlan, 
  companyName, 
  diagnosticData, 
  onBack, 
  onUpdatePlan 
}: ActionPlanManagerProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const {
    actions,
    filteredActions,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    editingAction,
    setEditingAction,
    handleDragEnd,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleStatusChange,
    handleStepComplete,
    handleAddAction
  } = useActionPlanManager(actionPlan, onUpdatePlan);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      handleDragEnd(active.id as string, over.id as string);
    }
  };

  const downloadPDF = () => {
    if (!pdfRef.current) {
      console.error('PDF ref not found');
      return;
    }
    
    console.log('Generating PDF with', actions.length, 'actions');
    console.log('PDF element:', pdfRef.current);
    
    // Temporarily show the PDF content
    const pdfElement = pdfRef.current;
    pdfElement.style.display = 'block';
    pdfElement.style.position = 'absolute';
    pdfElement.style.left = '-9999px';
    pdfElement.style.top = '0';
    
    // Generate PDF with a delay to ensure content is rendered
    setTimeout(() => {
      generatePDF(pdfElement, `plano_acao_${companyName.replace(/\s+/g, '_')}.pdf`);
      
      // Hide the element again after PDF generation
      setTimeout(() => {
        pdfElement.style.display = 'none';
      }, 2000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Plano de Aceleração Empresarial</h1>
            <p className="text-gray-600">{companyName} • {actions.length} ações estratégicas</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={downloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <ActionPlanStatistics actions={actions} />

      {/* Filters */}
      <ActionPlanFilters
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Add Action Button */}
      <div className="flex justify-end">
        <AddActionDialog onAddAction={handleAddAction} />
      </div>

      {/* Actions List with Drag and Drop */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndEvent}
      >
        <SortableContext items={filteredActions.map(a => a.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {filteredActions.map((action, index) => (
              <DraggableActionItem
                key={action.id}
                action={action}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onStepComplete={handleStepComplete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredActions.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Nenhuma ação encontrada com os filtros aplicados.</p>
        </Card>
      )}

      {/* Edit Dialog */}
      <EditActionDialog
        editingAction={editingAction}
        setEditingAction={setEditingAction}
        onSaveEdit={handleSaveEdit}
      />

      {/* PDF Content (Hidden but rendered) */}
      <div 
        ref={pdfRef} 
        className="pdf-export" 
        style={{ 
          display: 'none',
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: 'white',
          color: 'black',
          padding: '20mm'
        }}
      >
        <ActionPlanPdfContent companyName={companyName} actions={actions} />
      </div>
    </div>
  );
};

export default ActionPlanManager;
