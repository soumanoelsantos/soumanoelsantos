
import { useState } from "react";
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
    if (!destination) return;

    // If dropped back to the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update the lead's status in the database
    console.log(`Moving lead ${draggableId} to ${destination.droppableId}`);
    const success = await updateLeadStatus(draggableId, destination.droppableId);
    if (success) {
      // Refresh the leads list to get the updated data
      console.log("Status updated successfully, refreshing leads...");
      await fetchLeads();
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
