
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LeadFormActionsProps {
  isSubmitting: boolean;
}

const LeadFormActions = ({ isSubmitting }: LeadFormActionsProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-dark-primary hover:bg-dark-primary/90 text-black mt-2" 
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        "Enviar"
      )}
    </Button>
  );
};

export default LeadFormActions;
