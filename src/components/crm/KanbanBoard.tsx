import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LeadFormDialog from "./LeadFormDialog";
import { useCrmData } from "./useCrmData";
import { defaultLeadFormValues } from "./schemas/leadFormSchema";
import UnauthenticatedView from "./views/UnauthenticatedView";
import LoadingView from "./views/LoadingView";
import KanbanHeader from "./KanbanHeader";
import KanbanColumnsGrid from "./KanbanColumnsGrid";
import { useKanbanOperations } from "./hooks/useKanbanOperations";
import { useCrmColumns } from "@/hooks/crm/useCrmColumns";
import ColumnManagementDialog from "./column-management/ColumnManagementDialog";

const KanbanBoard = () => {
  const { isAuthenticated } = useAuth();
  const { 
    isLoading, 
    leads, 
    addLead, 
    updateLead, 
    deleteLead, 
    updateLeadStatus,
    fetchLeads 
  } = useCrmData();
  
  const {
    columns,
    isLoading: isColumnsLoading,
    addColumn,
    editColumn,
    deleteColumn,
    reorderColumns
  } = useCrmColumns();
  
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  
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

  if (isLoading || isColumnsLoading) {
    return <LoadingView />;
  }

  const columnNames = columns.map(column => column.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <KanbanHeader 
        onAddNew={() => setIsAddDialogOpen(true)} 
        onManageColumns={() => setIsColumnDialogOpen(true)}
      />
      
      <LeadFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSubmit}
        title="Adicionar Novo Lead"
        submitButtonText="Adicionar Lead"
        statuses={columnNames}
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
        statuses={columnNames}
      />
      
      <ColumnManagementDialog
        isOpen={isColumnDialogOpen}
        onOpenChange={setIsColumnDialogOpen}
        columns={columns}
        onAddColumn={addColumn}
        onEditColumn={editColumn}
        onDeleteColumn={deleteColumn}
        onReorderColumns={reorderColumns}
      />
      
      <KanbanColumnsGrid
        columns={columns}
        leads={leads}
        onDragEnd={handleDragEnd}
        onEditLead={handleEditLead}
        onDeleteLead={deleteLead}
      />
    </div>
  );
};

export default KanbanBoard;
