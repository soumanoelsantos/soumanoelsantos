
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { LeadFormValues } from "./schemas/leadFormSchema";
import { useLeadForm } from "./hooks/useLeadForm";
import LeadFormFields from "./LeadFormFields";
import LeadFormSubmitButton from "./LeadFormSubmitButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeadFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LeadFormValues) => Promise<boolean | void>;
  defaultValues?: LeadFormValues;
  title: string;
  submitButtonText: string;
  statuses: string[];
}

const LeadFormDialog: React.FC<LeadFormDialogProps> = ({
  isOpen, 
  onOpenChange, 
  onSubmit, 
  defaultValues,
  title,
  submitButtonText,
  statuses
}) => {
  const { form, isSubmitting, handleSubmit } = useLeadForm({
    onSubmit,
    defaultValues,
    isOpen
  });
  const isMobile = useIsMobile();

  // Prevent form from being closed when clicking inside it
  const handleDialogContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`${isMobile ? 'w-[calc(100%-16px)] mx-2 max-h-[92vh] overflow-y-auto' : 'sm:max-w-[500px]'}`} 
        onClick={handleDialogContentClick}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4 pb-6">
            <LeadFormFields form={form} statuses={statuses} />
            
            <DialogFooter className={`${isMobile ? 'mt-4' : ''}`}>
              <LeadFormSubmitButton 
                isSubmitting={isSubmitting} 
                submitButtonText={submitButtonText} 
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
