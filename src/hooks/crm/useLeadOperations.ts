
import { useAddLead, useUpdateLead, useDeleteLead, useUpdateLeadStatus } from './operations';
import { useState, useEffect } from 'react';

export const useLeadOperations = (fetchLeads: () => Promise<void>) => {
  const { addLead, webhookUrl, updateWebhookUrl } = useAddLead(fetchLeads);
  const { updateLead } = useUpdateLead(fetchLeads);
  const { deleteLead } = useDeleteLead(fetchLeads);
  const { updateLeadStatus } = useUpdateLeadStatus(fetchLeads);

  return {
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
    webhookUrl,
    updateWebhookUrl
  };
};
