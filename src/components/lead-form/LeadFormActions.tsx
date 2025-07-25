
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
      className="w-full bg-[#D5AB2A] hover:bg-[#D5AB2A]/90 text-black py-3 px-4 text-base rounded-md font-medium" 
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
