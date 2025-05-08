
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeLeads = (fetchLeads: () => Promise<void>) => {
  useEffect(() => {
    console.log("Setting up realtime subscription for lead updates");
    
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

    console.log("Subscription to realtime updates initialized");

    return () => {
      console.log("Removing realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);
};
