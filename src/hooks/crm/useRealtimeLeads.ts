
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeLeads = (fetchLeads: () => Promise<void>) => {
  useEffect(() => {
    console.log("Setting up realtime subscription for leads");
    
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
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      console.log("Removing realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);
};
