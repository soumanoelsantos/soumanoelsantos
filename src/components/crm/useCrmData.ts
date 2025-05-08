
import { useLeadsList } from "@/hooks/crm/useLeadsList";
import { useLeadOperations } from "@/hooks/crm/useLeadOperations";
import { useRealtimeLeads } from "@/hooks/crm/useRealtimeLeads";
import { useCrmColumns } from "@/hooks/crm/useCrmColumns";

export const useCrmData = () => {
  const { isLoading, leads, fetchLeads } = useLeadsList();
  const { columns } = useCrmColumns();
  const { addLead, updateLead, deleteLead, updateLeadStatus } = useLeadOperations(fetchLeads);
  
  // Set up realtime subscription
  useRealtimeLeads(fetchLeads);

  return {
    isLoading,
    leads,
    columns: columns.map(col => col.name),
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };
};
