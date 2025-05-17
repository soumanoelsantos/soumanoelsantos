
import { useState, useCallback } from "react";
import { LeadData } from "@/types/crm";
import { LeadFormValues } from "../schemas/leadFormSchema";

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

  // Enhanced drag end handler with improved error handling and logging
  const handleDragEnd = useCallback(async (result: any) => {
    const { destination, source, draggableId } = result;

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
      return;
    }

    try {
      setDragOperationInProgress(true);
      setIsUpdatingStatus(true);
      
      // Enhanced logging with more details
      console.log("Starting drag operation:", {
        leadId: draggableId,
        fromStatus: source.droppableId,
        toStatus: destination.droppableId,
        fromIndex: source.index,
        toIndex: destination.index,
        timestamp: new Date().toISOString()
      });
      
      // Update the lead status - pass the exact destination droppableId as status
      const success = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (success) {
        console.log(`Status updated successfully from ${source.droppableId} to ${destination.droppableId}`);
        // Always refresh leads to ensure UI is consistent with backend
        await fetchLeads();
      } else {
        console.error(`Status update failed: ${draggableId} to ${destination.droppableId}`);
        // Force refresh to ensure UI is consistent with backend state
        await fetchLeads();
      }
    } catch (error) {
      console.error("Error in drag end handler:", error);
      // Force refresh to ensure UI is consistent with backend state
      await fetchLeads();
    } finally {
      // Reduced timeout to make the UI more responsive
      setTimeout(() => {
        setIsUpdatingStatus(false);
        setDragOperationInProgress(false);
      }, 100); // Slightly longer timeout for better stability
    }
  }, [dragOperationInProgress, isUpdatingStatus, updateLeadStatus, fetchLeads]);

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
