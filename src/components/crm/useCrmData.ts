
import { LEAD_STATUSES } from "@/constants/crmConstants";
import { useLeadsList } from "@/hooks/crm/useLeadsList";
import { useLeadOperations } from "@/hooks/crm/useLeadOperations";
import { useRealtimeLeads } from "@/hooks/crm/useRealtimeLeads";

export const useCrmData = () => {
  const { isLoading, leads, fetchLeads } = useLeadsList();
  const { addLead, updateLead, deleteLead, updateLeadStatus } = useLeadOperations(fetchLeads);
  
  // Set up realtime subscription
  useRealtimeLeads(fetchLeads);

  return {
    isLoading,
    leads,
    statuses: LEAD_STATUSES,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };
};
