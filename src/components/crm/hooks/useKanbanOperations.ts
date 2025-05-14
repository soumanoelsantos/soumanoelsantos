
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

    // Log the complete drag operation for debugging
    console.log("Complete drag operation:", { result, draggableId, source, destination });

    // Se não foi largado em uma área válida
    if (!destination) {
      console.log("Drop outside a valid area", { draggableId, source });
      return;
    }

    // Se foi largado de volta no mesmo lugar
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Drop in the same place, ignoring", { draggableId, source, destination });
      return;
    }

    // Log mais informações para debugging
    const currentTime = Date.now();
    console.log("Processing drag end event:", {
      leadId: draggableId,
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
      currentTime,
      lastOperation: lastDragOperation
    });

    // Verificar se é uma operação duplicada (dentro de 1 segundo)
    if (
      lastDragOperation && 
      lastDragOperation.leadId === draggableId && 
      lastDragOperation.destination === destination.droppableId && 
      currentTime - lastDragOperation.timestamp < 1000
    ) {
      console.log("Detected duplicate drag operation within 1 second, ignoring");
      return;
    }

    // Impedir atualizações concorrentes
    if (isUpdatingStatus) {
      console.log("Already updating status, ignoring this operation");
      toast({
        title: "Operação em andamento",
        description: "Aguarde a conclusão da operação anterior",
        duration: 2000,
      });
      return;
    }

    // Registrar esta operação
    setLastDragOperation({
      leadId: draggableId, 
      destination: destination.droppableId,
      timestamp: currentTime
    });

    // Atualizar o status do lead no banco de dados
    try {
      setIsUpdatingStatus(true);
      console.log(`Moving lead ${draggableId} to ${destination.droppableId}`);
      
      const success = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (success) {
        // Atualizar a lista de leads para obter os dados atualizados
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
      // Pequeno timeout antes de definir isUpdatingStatus como false
      // para evitar atualizações consecutivas rápidas
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
