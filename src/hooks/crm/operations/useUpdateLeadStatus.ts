
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export const useUpdateLeadStatus = (fetchLeads: () => Promise<void>) => {
  const { toast } = useToast();
  
  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      // More detailed logging for debugging
      console.log(`Starting lead status update - ID: ${id}, New Status: ${newStatus}`);
      
      if (!id) {
        console.error("Invalid lead ID:", id);
        throw new Error("ID do lead não fornecido");
      }
      
      if (!newStatus) {
        console.error("Invalid status:", newStatus);
        throw new Error("Novo status não fornecido");
      }
      
      // First check if the lead exists
      const { data: existingLead, error: checkError } = await supabase
        .from("leads")
        .select("id, status, name, email, phone, notes, created_at, source")
        .eq("id", id)
        .single();
      
      if (checkError) {
        console.error("Error checking lead:", checkError.message);
        throw new Error(`Erro ao verificar lead: ${checkError.message}`);
      }
      
      if (!existingLead) {
        console.error("Lead not found:", id);
        throw new Error(`Lead com ID ${id} não encontrado`);
      }
      
      console.log("Found lead, current status:", existingLead.status, "New status:", newStatus);
      
      // If status already set to new status, no need to update
      if (existingLead.status === newStatus) {
        console.log("Lead already has the requested status, skipping update");
        return true;
      }
      
      // Perform the update with the status_changed_at field
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: newStatus,
          status_changed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) {
        console.error("Supabase update error:", error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar status",
          description: error.message,
        });
        throw error;
      }

      console.log("Lead status updated successfully to:", newStatus);
      
      toast({
        title: "Status atualizado",
        description: `O lead foi movido para ${newStatus}.`,
      });
      
      await fetchLeads();
      
      // Return success
      return true;
    } catch (error: any) {
      console.error("Error in updateLeadStatus:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Ocorreu um erro ao atualizar o status do lead",
      });
      return false;
    }
  };

  return { updateLeadStatus };
};
