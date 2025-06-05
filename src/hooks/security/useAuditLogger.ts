
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuditLogger = () => {
  const { toast } = useToast();

  const logAdminAction = async (actionType: string, details: string = '') => {
    try {
      const { error } = await supabase.rpc('log_admin_action', {
        action_type: actionType,
        details: details
      });

      if (error) {
        console.error('Failed to log admin action:', error);
      }
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const logSecurityEvent = async (eventType: string, details: string) => {
    try {
      await logAdminAction(`SECURITY_${eventType}`, details);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  return {
    logAdminAction,
    logSecurityEvent
  };
};
