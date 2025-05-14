
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
  const [dragOperationInProgress, setDragOperationInProgress] = useState(false);

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

    // Log the drag operation details
    console.log("Drag operation details:", {
      leadId: draggableId,
      source: source?.droppableId,
      destination: destination?.droppableId,
      timestamp: new Date().toISOString()
    });

    // If dropped outside a droppable area
    if (!destination) {
      console.log("Dropped outside valid area", { draggableId });
      return;
    }

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Dropped in same position, ignoring");
      return;
    }

    // Prevent concurrent drag operations
    if (dragOperationInProgress || isUpdatingStatus) {
      console.log("Operation already in progress, ignoring this drag");
      toast({
        title: "Aguarde",
        description: "Já existe uma operação em andamento",
        duration: 2000,
      });
      return;
    }

    try {
      setDragOperationInProgress(true);
      setIsUpdatingStatus(true);
      
      // Important: Log exactly what we're sending to updateLeadStatus
      console.log("Updating lead status with:", {
        id: draggableId,
        newStatus: destination.droppableId,
        time: new Date().toISOString()
      });
      
      const success = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (success) {
        console.log("Status update successful, refreshing data");
        await fetchLeads();
        toast({
          title: "Status atualizado",
          description: `Lead movido para ${destination.droppableId}`,
          duration: 2000,
        });
      } else {
        console.error("Status update failed");
        toast({
          variant: "destructive",
          title: "Falha na atualização",
          description: "Não foi possível mover o lead. Tente novamente.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error in drag end handler:", error);
      toast({
        variant: "destructive",
        title: "Erro na operação",
        description: "Ocorreu um erro ao mover o lead",
        duration: 3000,
      });
    } finally {
      // Use a timeout to avoid race conditions
      setTimeout(() => {
        setIsUpdatingStatus(false);
        setDragOperationInProgress(false);
      }, 500);
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
