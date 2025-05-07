
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import ActionButton from "@/components/ui/action-button";
import { ChecklistItem } from '@/types/checklist';

interface ChecklistFormProps {
  checklistItems: ChecklistItem[];
  onCheckChange: (id: number) => void;
  onCalculate: () => void;
}

const ChecklistForm: React.FC<ChecklistFormProps> = ({
  checklistItems,
  onCheckChange,
  onCalculate
}) => {
  return (
    <>
      <div className="space-y-6">
        {checklistItems.map((item) => (
          <div key={item.id} className="border-b pb-4 border-gray-200">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id={`question-${item.id}`} 
                checked={item.checked}
                onCheckedChange={() => onCheckChange(item.id)}
                className="mt-1"
              />
              <div>
                <label 
                  htmlFor={`question-${item.id}`} 
                  className="text-base font-medium text-gray-800 cursor-pointer"
                >
                  {item.question}
                </label>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <ActionButton 
          onClick={onCalculate} 
          className="px-8 py-6 text-lg"
        >
          Calcular Resultado
        </ActionButton>
      </div>
    </>
  );
};

export default ChecklistForm;
