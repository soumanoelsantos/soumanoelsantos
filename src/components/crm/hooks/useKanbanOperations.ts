
import { useState } from "react";
import { LeadData } from "@/types/crm";
import { LeadFormValues } from "../schemas/leadFormSchema";
import { useToast } from "@/hooks/use-toast";

interface UseKanbanOperationsProps {
  addLead: (values: LeadFormValues) => Promise<boolean>;
  updateLead: (id: string, values: LeadFormValues) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  updateLeadStatus: (id: string, newStatus: string) => Promise<boolean>;
  fetchLeads: () => Promise<void>;
}

export const useKanbanOperations = ({
  addLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  fetchLeads
}: UseKanbanOperationsProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editLead, setEditLead] = useState<LeadData | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [lastDragOperation, setLastDragOperation] = useState<{
    leadId: string; 
    destination: string;
    timestamp: number;
  } | null>(null);

  const handleAddSubmit = async (values: LeadFormValues) => {
    console.log("Submitting new lead:", values);
    const success = await addLead(values);
    if (success) {
      setIsAddDialogOpen(false);
      console.log("Lead added successfully, refreshing leads...");
      await fetchLeads();
    }
    return success;
  };

  const handleEditSubmit = async (values: LeadFormValues) => {
    if (!editLead) return false;
    
    console.log("Updating lead:", editLead.id, values);
    const success = await updateLead(editLead.id, values);
    if (success) {
      setIsEditDialogOpen(false);
      setEditLead(null);
      console.log("Lead updated successfully, refreshing leads...");
      await fetchLeads();
    }
    return success;
  };

  const handleEditLead = (lead: LeadData) => {
    setEditLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) {
      console.log("Drop outside a valid area", { draggableId, source });
      return;
    }

    // If dropped back to the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Drop in the same place, ignoring", { draggableId, source, destination });
      return;
    }

    // Log more information for debugging
    const currentTime = Date.now();
    console.log("Drag end event with timestamps:", {
      draggableId,
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
      currentTime,
      lastOperation: lastDragOperation
    });

    // Check if this is a rapid duplicate operation (within 1 second)
    if (
      lastDragOperation && 
      lastDragOperation.leadId === draggableId && 
      lastDragOperation.destination === destination.droppableId && 
      currentTime - lastDragOperation.timestamp < 1000
    ) {
      console.log("Detected duplicate drag operation within 1 second, ignoring");
      return;
    }

    // Prevent multiple concurrent updates
    if (isUpdatingStatus) {
      console.log("Already updating status, ignoring this operation");
      toast({
        title: "Operação em andamento",
        description: "Aguarde a conclusão da operação anterior",
        duration: 2000,
      });
      return;
    }

    // Record this operation
    setLastDragOperation({
      leadId: draggableId, 
      destination: destination.droppableId,
      timestamp: currentTime
    });

    // Update the lead's status in the database
    try {
      setIsUpdatingStatus(true);
      console.log(`Moving lead ${draggableId} to ${destination.droppableId}`);
      
      const success = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (success) {
        // Refresh the leads list to get the updated data
        console.log("Status updated successfully, refreshing leads list...");
        await fetchLeads();
        toast({
          title: "Status atualizado",
          description: `Lead movido para ${destination.droppableId}`,
          duration: 2000,
        });
      } else {
        console.error("Failed to update lead status");
        toast({
          variant: "destructive",
          title: "Erro ao atualizar status",
          description: "Não foi possível atualizar o status do lead. Tente novamente.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error in handleDragEnd:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status. Tente novamente.",
        duration: 3000,
      });
    } finally {
      // Add a small timeout before setting isUpdatingStatus to false
      // to prevent rapid consecutive updates
      setTimeout(() => {
        setIsUpdatingStatus(false);
      }, 800);
    }
  };

  return {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editLead,
    handleAddSubmit,
    handleEditSubmit,
    handleEditLead,
    handleDragEnd
  };
};
