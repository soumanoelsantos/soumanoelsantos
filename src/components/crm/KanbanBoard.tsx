
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import LeadFormDialog from "./LeadFormDialog";
import { useCrmData } from "./useCrmData";
import { defaultLeadFormValues } from "./schemas/leadFormSchema";
import UnauthenticatedView from "./views/UnauthenticatedView";
import LoadingView from "./views/LoadingView";
import KanbanHeader from "./KanbanHeader";
import KanbanColumnsGrid from "./KanbanColumnsGrid";
import { useKanbanOperations } from "./hooks/useKanbanOperations";

const KanbanBoard = () => {
  const { isAuthenticated } = useAuth();
  const { 
    isLoading, 
    leads, 
    statuses, 
    addLead, 
    updateLead, 
    deleteLead, 
    updateLeadStatus,
    fetchLeads 
  } = useCrmData();
  
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editLead,
    handleAddSubmit,
    handleEditSubmit,
    handleEditLead,
    handleDragEnd
  } = useKanbanOperations({
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
    fetchLeads
  });

  if (!isAuthenticated) {
    return <UnauthenticatedView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <KanbanHeader onAddNew={() => setIsAddDialogOpen(true)} />
      
      <LeadFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSubmit}
        title="Adicionar Novo Lead"
        submitButtonText="Adicionar Lead"
        statuses={statuses}
      />
      
      <LeadFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSubmit}
        defaultValues={editLead ? {
          name: editLead.name,
          email: editLead.email,
          phone: editLead.phone,
          notes: editLead.notes || "",
          status: editLead.status
        } : defaultLeadFormValues}
        title="Editar Lead"
        submitButtonText="Salvar Alterações"
        statuses={statuses}
      />
      
      <KanbanColumnsGrid
        statuses={statuses}
        leads={leads}
        onDragEnd={handleDragEnd}
        onEditLead={handleEditLead}
        onDeleteLead={deleteLead}
      />
    </div>
  );
};

export default KanbanBoard;
