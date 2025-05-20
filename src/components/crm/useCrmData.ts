
import { useLeadsList } from "@/hooks/crm/useLeadsList";
import { useLeadOperations } from "@/hooks/crm/useLeadOperations";
import { useRealtimeLeads } from "@/hooks/crm/useRealtimeLeads";
import { useCrmColumns } from "@/hooks/crm/useCrmColumns";
import { useState, useEffect } from "react";

export const useCrmData = () => {
  const { isLoading, leads, fetchLeads } = useLeadsList();
  const { columns } = useCrmColumns();
  const { addLead, updateLead, deleteLead, updateLeadStatus, webhookUrl, updateWebhookUrl } = useLeadOperations(fetchLeads);
  const [isWebhookConfigured, setIsWebhookConfigured] = useState(false);
  
  useEffect(() => {
    setIsWebhookConfigured(!!webhookUrl && webhookUrl.trim() !== "");
  }, [webhookUrl]);
  
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
    updateLeadStatus,
    webhookUrl,
    updateWebhookUrl,
    isWebhookConfigured
  };
};
