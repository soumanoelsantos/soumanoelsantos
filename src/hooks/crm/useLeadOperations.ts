
import { useAddLead, useUpdateLead, useDeleteLead, useUpdateLeadStatus } from './operations';

export const useLeadOperations = (fetchLeads: () => Promise<void>) => {
  const { addLead } = useAddLead(fetchLeads);
  const { updateLead } = useUpdateLead(fetchLeads);
  const { deleteLead } = useDeleteLead(fetchLeads);
  const { updateLeadStatus } = useUpdateLeadStatus(fetchLeads);

  return {
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };
};
