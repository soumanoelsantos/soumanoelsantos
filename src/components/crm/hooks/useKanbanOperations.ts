
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
      console.log("Drop fora de uma área válida");
      return;
    }

    // If dropped back to the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Drop no mesmo lugar, ignorando");
      return;
    }

    // Log more information to debug
    console.log("Drag end event:", {
      draggableId,
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    });

    // Prevent multiple concurrent updates
    if (isUpdatingStatus) {
      console.log("Já está atualizando o status, ignorando esta operação");
      return;
    }

    // Update the lead's status in the database
    try {
      setIsUpdatingStatus(true);
      console.log(`Movendo lead ${draggableId} para ${destination.droppableId}`);
      
      const success = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (success) {
        // Refresh the leads list to get the updated data
        console.log("Status atualizado com sucesso, atualizando lista de leads...");
        await fetchLeads();
        toast({
          title: "Status atualizado",
          description: `Lead movido para ${destination.droppableId}`,
        });
      } else {
        console.error("Falha ao atualizar status do lead");
        toast({
          variant: "destructive",
          title: "Erro ao atualizar status",
          description: "Não foi possível atualizar o status do lead. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro em handleDragEnd:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status. Tente novamente.",
      });
    } finally {
      setIsUpdatingStatus(false);
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
