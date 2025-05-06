
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StatusColumn from "./StatusColumn";
import LeadFormDialog from "./LeadFormDialog";
import { useCrmData } from "./useCrmData";
import { LeadData, LeadFormValues } from "@/types/crm";

const KanbanBoard = () => {
  const { isAuthenticated } = useAuth();
  const { 
    isLoading, 
    leads, 
    statuses, 
    addLead, 
    updateLead, 
    deleteLead, 
    updateLeadStatus 
  } = useCrmData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editLead, setEditLead] = useState<LeadData | null>(null);

  const handleAddSubmit = async (values: LeadFormValues) => {
    const success = await addLead(values);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSubmit = async (values: LeadFormValues) => {
    if (!editLead) return;
    
    const success = await updateLead(editLead.id, values);
    if (success) {
      setIsEditDialogOpen(false);
      setEditLead(null);
    }
  };

  const handleEditLead = (lead: LeadData) => {
    setEditLead(lead);
    setIsEditDialogOpen(true);
  };

  const onDragEnd = async (result: any) => {
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
    await updateLeadStatus(draggableId, destination.droppableId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">Você não tem permissão para acessar esta área.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-800">Carregando CRM...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">CRM - Gestão de Leads</h1>
        
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-dark-primary hover:bg-dark-primary/90 text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>
      
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
        } : undefined}
        title="Editar Lead"
        submitButtonText="Salvar Alterações"
        statuses={statuses}
      />
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statuses.map(status => (
            <StatusColumn
              key={status}
              status={status}
              leads={leads}
              onEditLead={handleEditLead}
              onDeleteLead={deleteLead}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
