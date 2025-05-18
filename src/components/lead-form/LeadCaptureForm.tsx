
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LeadFormContent from "./LeadFormContent";
import { useLeadForm } from "./useLeadForm";

interface LeadCaptureFormProps {
  source?: string;
  buttonText?: React.ReactNode;
  buttonClassName?: string;
  showChallengeField?: boolean;
  onSuccess?: () => void;
}

const LeadCaptureForm = ({
  source = "website",
  buttonText = "Agendar reunião gratuita",
  buttonClassName = "",
  showChallengeField = false,
  onSuccess,
}: LeadCaptureFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { form, isSubmitting, handleSubmit } = useLeadForm({
    source,
    onSuccess: () => {
      setIsOpen(false);
      if (onSuccess) onSuccess();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-32px)] max-h-[90vh] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Agendar reunião gratuita
          </DialogTitle>
        </DialogHeader>

        <LeadFormContent
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        <p className="text-sm text-center text-gray-500 mt-2">
          Seus dados estão seguros e não serão compartilhados com terceiros.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureForm;
