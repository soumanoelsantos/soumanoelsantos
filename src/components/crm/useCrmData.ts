
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchLeadsFromDb } from "@/services/adminService";
import { LeadData, LeadFormValues } from "@/types/crm";

export const useCrmData = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<LeadData[]>([]);
  
  const statuses = ["Novo", "Contatado", "Qualificado", "Negociação", "Ganho", "Perdido"];

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await fetchLeadsFromDb();

      if (error) throw error;

      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar leads",
        description: "Não foi possível carregar os leads. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addLead = async (values: LeadFormValues) => {
    try {
      // Make sure all required fields are present
      if (!values.name || !values.email || !values.phone || !values.status) {
        throw new Error("Campos obrigatórios faltando");
      }
      
      console.log("Adicionando lead:", values);
      
      const { data, error } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes || null,
        status: values.status,
        source: "manual",
      }).select();

      if (error) throw error;

      console.log("Lead adicionado com sucesso:", data);
      
      // Refresh leads list
      await fetchLeads();
      
      toast({
        title: "Lead criado",
        description: "Lead criado com sucesso",
      });

      return true;
    } catch (error: any) {
      console.error("Error creating lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar lead",
        description: error.message || "Não foi possível criar o lead. Tente novamente.",
      });
      return false;
    }
  };

  const updateLead = async (id: string, values: LeadFormValues) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({
          name: values.name,
          email: values.email,
          phone: values.phone,
          notes: values.notes,
          status: values.status,
        })
        .eq("id", id);

      if (error) throw error;
      
      // Refresh leads list after update
      await fetchLeads();

      toast({
        title: "Lead atualizado",
        description: "Lead atualizado com sucesso",
      });

      return true;
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar lead",
        description: "Não foi possível atualizar o lead. Tente novamente.",
      });
      return false;
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este lead?")) return false;

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) throw error;
      
      // Refresh leads list after deletion
      await fetchLeads();

      toast({
        title: "Lead excluído",
        description: "Lead excluído com sucesso",
      });

      return true;
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir lead",
        description: "Não foi possível excluir o lead. Tente novamente.",
      });
      return false;
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state to reflect the change
      setLeads(prevLeads => 
        prevLeads.map(lead => {
          if (lead.id === id) {
            return { ...lead, status: newStatus };
          }
          return lead;
        })
      );

      return true;
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do lead. Tente novamente.",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchLeads();
    
    // Set up realtime subscription for lead updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    isLoading,
    leads,
    statuses,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };
};
