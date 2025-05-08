
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LeadFormSubmitButtonProps {
  isSubmitting: boolean;
  submitButtonText: string;
}

const LeadFormSubmitButton: React.FC<LeadFormSubmitButtonProps> = ({ 
  isSubmitting, 
  submitButtonText 
}) => {
  return (
    <Button 
      type="submit" 
      className="bg-dark-primary hover:bg-dark-primary/90 text-black"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        submitButtonText
      )}
    </Button>
  );
};

export default LeadFormSubmitButton;
