
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchLeadsFromDb } from "@/services/adminService";
import { LeadData } from "@/types/crm";

export const useLeadsList = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<LeadData[]>([]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      console.log("Buscando leads...");
      const { data, error } = await fetchLeadsFromDb();

      if (error) throw error;

      console.log("Leads encontrados:", data);
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

  useEffect(() => {
    console.log("Inicializando leads data...");
    fetchLeads();
  }, []);

  return {
    isLoading,
    leads,
    fetchLeads,
  };
};
