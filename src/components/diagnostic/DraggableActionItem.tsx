
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GripVertical, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ActionItem } from './NewDiagnosticTestContent';
import ActionItemHeader from './components/ActionItemHeader';
import ActionItemProgress from './components/ActionItemProgress';
import ActionItemExpandedContent from './components/ActionItemExpandedContent';

interface DraggableActionItemProps {
  action: ActionItem;
  index: number;
  onEdit: (action: ActionItem) => void;
  onDelete: (actionId: string) => void;
  onStatusChange: (actionId: string, status: ActionItem['status']) => void;
  onStepComplete: (actionId: string, stepIndex: number, completed: boolean) => void;
}

const DraggableActionItem = ({
  action,
  index,
  onEdit,
  onDelete,
  onStatusChange,
  onStepComplete
}: DraggableActionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCheckboxChange = (checked: boolean) => {
    // Only allow manual completion/incompletion via checkbox if no steps are defined
    // or if all steps are completed
    const hasSteps = action.comoFazer && action.comoFazer.length > 0;
    const allStepsCompleted = action.completedSteps?.every(step => step === true) && 
                             action.completedSteps?.length === action.comoFazer?.length;
    
    if (!hasSteps || allStepsCompleted) {
      if (checked) {
        onStatusChange(action.id, 'realizado');
      } else {
        onStatusChange(action.id, 'pendente');
      }
    }
  };

  const completedSteps = action.completedSteps?.filter(Boolean).length || 0;
  const totalSteps = action.comoFazer?.length || 0;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isCompleted = action.status === 'realizado';
  
  // Determine if checkbox should be disabled
  const hasSteps = totalSteps > 0;
  const allStepsCompleted = action.completedSteps?.every(step => step === true) && 
                           action.completedSteps?.length === totalSteps;
  const checkboxDisabled = hasSteps && !allStepsCompleted && !isCompleted;

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`transition-all ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'} hover:shadow-md`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div 
            className="mt-1 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
            disabled={checkboxDisabled}
            className="mt-1"
            title={checkboxDisabled ? "Complete todos os passos primeiro" : "Marcar como concluída"}
          />
          
          <div className="flex-1 space-y-3">
            <ActionItemHeader 
              action={action}
              isCompleted={isCompleted}
              onEdit={onEdit}
              onDelete={onDelete}
            />

            <ActionItemProgress 
              action={action}
              completedSteps={completedSteps}
              totalSteps={totalSteps}
              progressPercentage={progressPercentage}
            />

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver mais
                </>
              )}
            </Button>

            {/* Expanded Content */}
            {isExpanded && (
              <ActionItemExpandedContent 
                action={action}
                onStepComplete={onStepComplete}
              />
            )}
          </div>
          
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggableActionItem;
